import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import axios from 'axios';
import sha256 from 'crypto-js/sha256';

import {
  accessTokenConfig,
  refreshTokenConfig,
  chatTokenConfig,
} from 'src/common/config/cookie.config';
import { User, UserDocument } from '../users/schemas/user.schema';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { Account, UsersService } from './../users/users.service';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './types';
import { Tokens } from './types/tokens.type';
import { Role, AccountStatus } from 'src/common/enums';

@Injectable()
export class AuthService {
  private adminAccount: Account;

  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {
    this.adminAccount = {
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
    };
  }

  async login(
    loginDto: LoginDto,
  ): Promise<{ tokens: Tokens; user: UserDocument }> {
    const { email, password } = loginDto;

    const user = await this.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException('Email or password is incorrect');
    }
    if (user.status === AccountStatus.Blocked) {
      throw new ForbiddenException('Your account has been blocked');
    }

    const tokens = await this.getTokens(user);

    return {
      tokens,
      user,
    };
  }

  async logout(userId: string, res: Response): Promise<void> {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
  }

  async register(
    createUserDto: CreateUserDto,
  ): Promise<{ tokens: Tokens; user: UserDocument }> {
    const { email } = createUserDto;

    const existedUser = await this.usersService.getByEmail(email);
    if (existedUser) throw new BadRequestException('Email existed');

    const user = await this.usersService.create(createUserDto);

    const tokens = await this.getTokens(user);

    return { tokens, user };
  }

  async refreshTokens(
    id: string,
  ): Promise<{ tokens: Tokens; user: UserDocument }> {
    const user = await this.usersService.getById(id);

    if (!user) throw new ForbiddenException('Access denied');

    const tokens = await this.getTokens(user);

    return { tokens, user };
  }

  async validateUser(email: string, password: string): Promise<UserDocument> {
    const user = await this.usersService.getByEmail(email);

    if (user && (await user.validatePassword(password))) {
      return user;
    }

    return null;
  }

  async validateRefreshToken(
    id: string,
    refreshToken: string,
  ): Promise<UserDocument> {
    const user = await this.usersService.getById(id);

    if (user && (await user.validateRefreshToken(refreshToken))) {
      return user;
    }

    return null;
  }

  async getTokens(user: User): Promise<Tokens> {
    const { id, email, role } = user;

    const roles = {
      [Role.Admin]: [Role.Admin, Role.Student, Role.Teacher],
      [Role.Teacher]: [Role.Teacher],
      [Role.Student]: [Role.Student],
    };

    const payload: JwtPayload = {
      sub: id,
      email,
      roles: roles[role],
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.AT_SECRET,
        expiresIn: process.env.AT_EXPIRATION_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.RT_SECRET,
        expiresIn: process.env.RT_EXPIRATION_TIME,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async singleSignOn(
    req: Request & { user: User },
  ): Promise<{ tokens: Tokens; user: UserDocument }> {
    if (!req.user) {
      throw new UnauthorizedException('No user from this service provider');
    }

    const user = await this.usersService.getByEmail(req.user.email);

    if (!user) {
      const newUser = await this.usersService.createWithSSO({
        ...req.user,
        role: req.user.role || Role.Student,
      });

      const tokens = await this.getTokens(newUser);
      return { tokens, user: newUser };
    }

    if (user.status === AccountStatus.Blocked) {
      throw new ForbiddenException('Your account has been blocked');
    }

    const tokens = await this.getTokens(user);

    return { tokens, user };
  }

  attachTokensCookie(
    res: Response,
    tokens: Tokens,
    chatUserId?: string,
    chatToken?: string,
  ): void {
    res.cookie('access_token', tokens.accessToken, accessTokenConfig);
    res.cookie('refresh_token', tokens.refreshToken, refreshTokenConfig);
    res.cookie('chat_user_id', chatUserId || '', chatTokenConfig);
    res.cookie('chat_token', chatToken || '', chatTokenConfig);
  }

  async accessChatService(user: UserDocument): Promise<{
    data?: {
      userId?: string;
      authToken?: string;
    };
  }> {
    if (!user.chatRegistered) {
      try {
        const registrationResponse = await this.registerUserOnChatService(user);
        if (registrationResponse.success) {
          await this.usersService.updateChatRegisteredStatus(user.id, true);
        }
      } catch (error) {
        console.error('Registration with chat service failed:', error);
      }
    }

    try {
      const loginResponse = await this.loginUserOnChatService(user);
      if (!loginResponse.success) {
        console.error('Login with chat service failed:', loginResponse.error);
      }

      return loginResponse.data;
    } catch (error) {
      console.error('Login with chat service failed:', error);
    }
  }

  async registerUserOnChatService(
    user: UserDocument,
  ): Promise<{ success: boolean; data?: any; error?: any }> {
    const url = process.env.CHAT_SERVICE_URL + '/api/v1/users.register';
    const userData = {
      name: user.firstName + ' ' + user.lastName,
      pass: user.email,
      email: user.email,
      username: sha256(user.email).toString(),
    };

    try {
      const response = await axios.post(url, userData);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error('Error during user registration on chat service:', error);
      return {
        success: false,
        error: error.response?.data || error.message,
      };
    }
  }

  async loginUserOnChatService(
    user: UserDocument,
  ): Promise<{ success: boolean; data?: any; error?: any }> {
    const url = process.env.CHAT_SERVICE_URL + '/api/v1/login';

    const credentials = {
      user:
        user.email === this.adminAccount.email
          ? user.email
          : sha256(user.email).toString(),
      password:
        user.email === this.adminAccount.email
          ? this.adminAccount.password
          : {
              digest: sha256(user.email).toString(),
              algorithm: 'sha-256',
            },
    };

    try {
      const response = await axios.post(url, credentials);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error('Error during user login on chat service:', error);
      return {
        success: false,
        error: error.response?.data || error.message,
      };
    }
  }
}
