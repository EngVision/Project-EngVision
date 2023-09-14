import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  Patch,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { plainToClass } from 'class-transformer';
import { Response } from 'express';
import { CurrentUser } from 'src/common/decorators';
import { AtGuard } from 'src/common/guards';
import { EmailDto } from '../auth/dto/login.dto';
import { JwtPayload } from '../auth/types';
import {
  CreateAccountDto,
  ResetPasswordCodeDto,
  ResetPasswordDto,
  UpdatePasswordDto,
  UpdateUserDto,
} from './dto';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

@ApiTags('Account')
@Controller('account')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(AtGuard)
  async createAccount(
    @CurrentUser() user: JwtPayload,
    @Body() createAccountDto: CreateAccountDto,
    @Res() res: Response,
  ) {
    const updatedUser = await this.usersService.createAccount(
      user.sub,
      createAccountDto,
    );

    return res
      .status(HttpStatus.OK)
      .send(plainToClass(User, updatedUser.toObject()));
  }

  @Patch('profile')
  @UseGuards(AtGuard)
  async updateProfile(
    @CurrentUser() user: JwtPayload,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ) {
    const updatedUser = await this.usersService.update(user.sub, updateUserDto);

    return res
      .status(HttpStatus.OK)
      .send(plainToClass(User, updatedUser.toObject()));
  }

  @Put('password')
  @UseGuards(AtGuard)
  async updatePassword(
    @CurrentUser() user: JwtPayload,
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Res() res: Response,
  ) {
    await this.usersService.updatePassword(user.sub, updatePasswordDto);

    return res.status(HttpStatus.OK).send('The user password was changed');
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
}
