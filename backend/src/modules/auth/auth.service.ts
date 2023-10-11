import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import {
  accessTokenConfig,
  refreshTokenConfig,
} from 'src/common/config/cookie.config';
import { User, UserDocument } from '../users/schemas/user.schema';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { UsersService } from './../users/users.service';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './types';
import { Tokens } from './types/tokens.type';
import { Role } from 'src/common/enums';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(
    loginDto: LoginDto,
  ): Promise<{ tokens: Tokens; user: UserDocument }> {
    const { email, password } = loginDto;

    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Email or password is incorrect');
    }

    const tokens = await this.getTokens(user);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return {
      tokens,
      user,
    };
  }

  async logout(userId: string, res: Response): Promise<void> {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');

    await this.updateRefreshToken(userId, null);
  }

  async register(
    createUserDto: CreateUserDto,
  ): Promise<{ tokens: Tokens; user: UserDocument }> {
    const { email } = createUserDto;

    const existedUser = await this.usersService.getByEmail(email);
    if (existedUser) throw new BadRequestException('Email existed');

    const user = await this.usersService.create(createUserDto);

    const tokens = await this.getTokens(user);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return { tokens, user };
  }

  async refreshTokens(id: string, refreshToken: string): Promise<Tokens> {
    const user = await this.validateRefreshToken(id, refreshToken);

    if (!user) throw new ForbiddenException('Access denied');

    const tokens = await this.getTokens(user);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
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
      await this.updateRefreshToken(newUser.id, tokens.refreshToken);
      return { tokens, user: newUser };
    }

    const tokens = await this.getTokens(user);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return { tokens, user };
  }

  async updateRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<void> {
    await this.usersService.update(userId, { refreshToken });
  }

  attachTokensCookie(res: Response, tokens: Tokens): void {
    res.cookie('access_token', tokens.accessToken, accessTokenConfig);
    res.cookie('refresh_token', tokens.refreshToken, refreshTokenConfig);
  }
}
