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
import { Response } from 'express';
import { ApiResponseData, CurrentUser } from 'src/common/decorators';
import { GetResponse } from 'src/common/dto';
import {
  AtGuard,
  FacebookGuard,
  GoogleGuard,
  RtGuard,
} from 'src/common/guards';
import { UserDto } from '../users/dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtPayload, JwtPayloadWithRt } from './types';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  /** Login, register with email and password **/
  @Post('login')
  @ApiResponseData(UserDto)
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const { tokens, user } = await this.authService.login(loginDto);

    const {
      data: { userId: chatUserId, authToken: chatToken },
    } = await this.authService.accessChatService(user);

    this.authService.attachTokensCookie(res, tokens, chatUserId, chatToken);

    return res
      .status(HttpStatus.OK)
      .send(GetResponse({ dataType: UserDto, data: user }));
  }

  @Post('logout')
  @ApiResponseData(Object)
  async logout(@Res() res: Response) {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');

    return res
      .status(HttpStatus.OK)
      .send(GetResponse({ message: 'User logged out' }));
  }

  @Post('register')
  @ApiResponseData(UserDto)
  async registerUser(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ) {
    const { tokens, user } = await this.authService.register(createUserDto);

    this.authService.attachTokensCookie(res, tokens);

    return res
      .status(HttpStatus.CREATED)
      .send(GetResponse({ dataType: UserDto, data: user }));
  }

  @Get('refresh')
  @UseGuards(RtGuard)
  @ApiResponseData(Object)
  async refreshTokens(
    @CurrentUser() user: JwtPayloadWithRt,
    @Res() res: Response,
  ) {
    const tokens = await this.authService.refreshTokens(user.sub);

    this.authService.attachTokensCookie(res, tokens);

    return res.status(HttpStatus.OK).send(GetResponse({ data: tokens }));
  }

  /** Single Sign-On **/
  @Get('google/login')
  @UseGuards(GoogleGuard)
  async googleLogin(@Req() req, @Res() res: Response) {
    const { tokens } = await this.authService.singleSignOn(req);

    this.authService.attachTokensCookie(res, tokens);

    return res.redirect(`${process.env.CLIENT_URL}/sso-success`);
  }

  @Get('facebook/login')
  @UseGuards(FacebookGuard)
  async facebookLogin(@Req() req, @Res() res: Response) {
    const { tokens } = await this.authService.singleSignOn(req);

    this.authService.attachTokensCookie(res, tokens);

    return res.redirect(`${process.env.CLIENT_URL}/sso-success`);
  }

  /* Get me */
  @Get('me')
  @UseGuards(AtGuard)
  @ApiResponseData(UserDto)
  async getMe(@CurrentUser() currentUser: JwtPayload, @Res() res: Response) {
    const user = await this.usersService.getById(currentUser.sub);

    const firstLogin = !user.password;

    return res.status(HttpStatus.OK).send(
      GetResponse({
        dataType: UserDto,
        data: { ...user.toObject(), firstLogin },
      }),
    );
  }
}
