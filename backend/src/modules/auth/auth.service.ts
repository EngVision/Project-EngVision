import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { plainToClass } from 'class-transformer';
import { Response } from 'express';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { UsersService } from './../users/users.service';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './types';
import { Tokens } from './types/tokens.type';
import {
  accessTokenConfig,
  refreshTokenConfig,
} from 'src/common/config/cookie.config';
import { User, UserDocument } from '../users/schemas/user.schema';
import { Role } from '../users/enums';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<{ tokens: Tokens; user: User }> {
    const { email, password } = loginDto;

    const userDocument = await this.validateUser(email, password);
    if (!userDocument)
      throw new UnauthorizedException('Email or password is incorrect');

    const user = plainToClass(User, userDocument.toObject());

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return { tokens, user };
  }

  async logout(userId: string): Promise<void> {
    await this.updateRefreshToken(userId, null);
  }

  async register(
    createUserDto: CreateUserDto,
  ): Promise<{ tokens: Tokens; user: User }> {
    const { email, password, firstName, lastName, role } = createUserDto;

    const existedUser = await this.usersService.getByEmail(email);
    if (existedUser) throw new BadRequestException('Email existed');

    const userDocument = await this.usersService.create({
      email,
      password,
      firstName,
      lastName,
      role,
    });

    const user = plainToClass(User, userDocument.toObject());

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return { tokens, user };
  }

  async refreshTokens(id: string, refreshToken: string): Promise<Tokens> {
    const user = await this.validateRefreshToken(id, refreshToken);

    if (!user) throw new ForbiddenException('Access denied');

    const tokens = await this.getTokens(id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async validateUser(email: string, password: string): Promise<UserDocument> {
    const user = await this.usersService.getByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
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

  async getTokens(userId: string, email: string): Promise<Tokens> {
    const payload: JwtPayload = {
      sub: userId,
      email: email,
    };

    const [access_token, refresh_token] = await Promise.all([
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
      accessToken: access_token,
      refreshToken: refresh_token,
    };
  }

  async singleSignOn(
    req: Request & { user: User },
  ): Promise<{ tokens: Tokens; user: User }> {
    if (!req.user) {
      throw new UnauthorizedException('No user from this service provider');
    }

    const userDocument = await this.usersService.getByEmail(req.user.email);

    if (!userDocument) {
      const newUserDocument = await this.usersService.createWithSSO({
        email: req.user.email,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        avatar: req.user.avatar,
        role: req.user.role || Role.STUDENT,
        isSSO: true,
        randomString: '',
      });
      const newUser = plainToClass(User, newUserDocument.toObject());

      const tokens = await this.getTokens(newUser.id, newUser.email);
      await this.updateRefreshToken(newUser.id, tokens.refreshToken);
      return { tokens, user: newUser };
    }

    const user = plainToClass(User, userDocument.toObject());

    const tokens = await this.getTokens(user.id, user.email);
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
