import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { CurrentUser } from 'src/common/decorators';
import {
  AtGuard,
  FacebookGuard,
  GoogleGuard,
  RoleGuard,
  RtGuard,
} from 'src/common/guards';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { JwtPayload, JwtPayloadWithRt } from './types';
import { Role } from '../users/enums';
import { plainToClass } from 'class-transformer';
import { User } from '../users/schemas/user.schema';
import { UsersService } from '../users/users.service';
import {
  EmailDto,
  LoginDto,
  ResetPasswordCodeDto,
  ResetPasswordDto,
} from './dto';
import { Throttle } from '@nestjs/throttler';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  /** Login, register with email and password **/
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const { tokens, user } = await this.authService.login(loginDto);

    this.authService.attachTokensCookie(res, tokens);

    return res.status(HttpStatus.OK).send(user);
  }

  @Post('logout')
  @UseGuards(AtGuard)
  async logout(
    @Req() req: Request & { user: JwtPayload },
    @Res() res: Response,
  ) {
    await this.authService.logout(req.user.sub, res);

    return res.status(HttpStatus.OK).send({ messgae: 'User logged out' });
  }

  @Post('register')
  async registerUser(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ) {
    const { tokens, user } = await this.authService.register(createUserDto);

    this.authService.attachTokensCookie(res, tokens);

    return res.status(HttpStatus.CREATED).send(user);
  }

  @Get('refresh')
  @UseGuards(RtGuard)
  async refreshTokens(
    @CurrentUser() user: JwtPayloadWithRt,
    @Res() res: Response,
  ) {
    const tokens = await this.authService.refreshTokens(
      user.sub,
      user.refreshToken,
    );

    this.authService.attachTokensCookie(res, tokens);

    return res.status(HttpStatus.OK).send(tokens);
  }

  /** Single Sign-On **/
  @Get('google/login')
  @UseGuards(GoogleGuard)
  async googleLogin(@Req() req, @Res() res: Response) {
    const { tokens, user } = await this.authService.singleSignOn(req);

    this.authService.attachTokensCookie(res, tokens);

    if (!user.password) {
      return res.redirect(`${process.env.CLIENT_URL}/create-profile`);
    }

    return res.redirect(`${process.env.CLIENT_URL}/sso-success`);
  }

  @Get('facebook/login')
  @UseGuards(FacebookGuard)
  async facebookLogin(@Req() req, @Res() res: Response) {
    const { tokens, user } = await this.authService.singleSignOn(req);

    this.authService.attachTokensCookie(res, tokens);

    if (!user.password) {
      return res.redirect(`${process.env.CLIENT_URL}/create-profile`);
    }

    return res.redirect(`${process.env.CLIENT_URL}/sso-success`);
  }

  /* Get me */
  @Get('me')
  @UseGuards(AtGuard)
  async getMe(@CurrentUser() currentUser: JwtPayload, @Res() res: Response) {
    const user = await this.usersService.getById(currentUser.sub);

    return res.status(HttpStatus.OK).send(plainToClass(User, user.toObject()));
  }

  /* Forgot password */
  @Post('forgot-password')
  @Throttle({ default: { limit: 1, ttl: 60000 } })
  async forgotPassword(@Body() body: EmailDto, @Res() res: Response) {
    const result = await this.usersService.sendMailResetPassword(body.email);

    if (!result) {
      throw new BadRequestException('Email not found');
    }

    return res
      .status(HttpStatus.OK)
      .send({ message: 'We have just sent you an email' });
  }

  @Post('validate-reset-password-code')
  async validateResetPasswordCode(
    @Body() body: ResetPasswordCodeDto,
    @Res() res: Response,
  ) {
    await this.usersService.validateResetPasswordUrl(body.resetPasswordCode);

    return res.status(HttpStatus.OK).send({ message: 'Validation successful' });
  }

  @Post('reset-password')
  async resetForgottenPassword(
    @Body() resetPassword: ResetPasswordDto,
    @Res() res: Response,
  ) {
    const result = await this.usersService.resetForgottenPassword(
      resetPassword.resetPasswordCode,
      resetPassword.newPassword,
    );

    if (!result) {
      throw new BadRequestException('invalid reset password code');
    }

    return res
      .status(HttpStatus.OK)
      .send({ message: 'New password have been updated' });
  }

  /* RoleGuard Testing */
  @Get('admin')
  @UseGuards(AtGuard, RoleGuard(Role.Admin))
  getAdmin() {
    return 'Admin';
  }

  @Get('teacher')
  @UseGuards(AtGuard, RoleGuard(Role.Teacher))
  getTeacher() {
    return 'Admin, Teacher';
  }

  @Get('student')
  @UseGuards(AtGuard, RoleGuard(Role.Student))
  getStudent() {
    return 'Admin, Student';
  }
}
