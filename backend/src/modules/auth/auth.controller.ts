import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
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
import { LoginDto } from './dto/login.dto';
import { JwtPayload, JwtPayloadWithRt } from './types';
import { Role } from '../users/enums';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');

    await this.authService.logout(req.user.sub);

    return res.status(HttpStatus.OK).send('User logged out');
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

    return res.status(HttpStatus.CREATED).send(user);
  }

  @Get('facebook/login')
  @UseGuards(FacebookGuard)
  async facebookLogin(@Req() req, @Res() res: Response) {
    const { tokens, user } = await this.authService.singleSignOn(req);

    this.authService.attachTokensCookie(res, tokens);

    return res.status(HttpStatus.CREATED).send(user);
  }

  /*RoleGuard Testing*/
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
