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

    this.authService.attachTokensCookie(res, tokens);

    return res
      .status(HttpStatus.OK)
      .send(GetResponse({ dataType: UserDto, data: user }));
  }

  @Post('logout')
  @UseGuards(AtGuard)
  @ApiResponseData(Object)
  async logout(
    @Req() req: Request & { user: JwtPayload },
    @Res() res: Response,
  ) {
    await this.authService.logout(req.user.sub, res);

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
    const tokens = await this.authService.refreshTokens(
      user.sub,
      user.refreshToken,
    );

    this.authService.attachTokensCookie(res, tokens);

    return res.status(HttpStatus.OK).send(GetResponse({ data: tokens }));
  }

  /** Single Sign-On **/
  @Get('google/login')
  @UseGuards(GoogleGuard)
  async googleLogin(@Req() req, @Res() res: Response) {
    const { tokens, user } = await this.authService.singleSignOn(req);

    this.authService.attachTokensCookie(res, tokens);

    // if (!user.password) {
    //   return res.redirect(`${process.env.CLIENT_URL}/create-profile`);
    // }

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
