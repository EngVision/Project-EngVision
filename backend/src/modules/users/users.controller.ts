import {
  Body,
  Controller,
  HttpStatus,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { Response } from 'express';
import { CurrentUser } from 'src/common/decorators';
import { AtGuard } from 'src/common/guards';
import { JwtPayload } from '../auth/types';
import { CreateAccountDto, UpdatePasswordDto, UpdateUserDto } from './dto';
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

  @Post('password')
  @UseGuards(AtGuard)
  async updatePassword(
    @CurrentUser() user: JwtPayload,
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Res() res: Response,
  ) {
    await this.usersService.updatePassword(user.sub, updatePasswordDto);

    return res
      .status(HttpStatus.OK)
      .send({ message: 'Password change successful' });
  }
}
