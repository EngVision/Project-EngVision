import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { Response } from 'express';
import { ApiResponseData, CurrentUser } from 'src/common/decorators';
import { GetResponse } from 'src/common/dto';
import { GetResponseList } from 'src/common/dto/paginated-response.dto';
import { Role } from 'src/common/enums';
import { AtGuard, RoleGuard } from 'src/common/guards';
import { EmailDto } from '../auth/dto/login.dto';
import { JwtPayload } from '../auth/types';
import {
  CreateAccountDto,
  ResetPasswordCodeDto,
  ResetPasswordDto,
  UpdatePasswordDto,
  UpdateUserDto,
  UserDto,
} from './dto';
import { UserQueryDto } from './dto/user-query.dto';
import { UsersService } from './users.service';
import { BlockUserDto } from './dto/block-user.dto';
import { GetStartedDto } from './dto/show-get-started';
import { ChecksumAlgorithm } from '@aws-sdk/client-s3';

@ApiTags('Account')
@Controller('account')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(AtGuard)
  @ApiResponseData(UserDto)
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
      .send(GetResponse({ dataType: UserDto, data: updatedUser }));
  }

  @Patch('profile')
  @UseGuards(AtGuard)
  @ApiResponseData(UserDto)
  async updateProfile(
    @CurrentUser() user: JwtPayload,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ) {
    const updatedUser = await this.usersService.update(user.sub, updateUserDto);

    return res
      .status(HttpStatus.OK)
      .send(GetResponse({ dataType: UserDto, data: updatedUser }));
  }

  @Put('password')
  @UseGuards(AtGuard)
  @ApiResponseData(Object)
  async updatePassword(
    @CurrentUser() user: JwtPayload,
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Res() res: Response,
  ) {
    await this.usersService.updatePassword(user.sub, updatePasswordDto);

    return res
      .status(HttpStatus.OK)
      .send(GetResponse({ message: 'Password change successful' }));
  }

  /* Forgot password */
  @Post('forgot-password')
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @ApiResponseData(Object)
  async forgotPassword(@Body() body: EmailDto, @Res() res: Response) {
    const result = await this.usersService.sendMailResetPassword(body.email);

    if (!result) {
      throw new BadRequestException('Email not found');
    }

    return res
      .status(HttpStatus.OK)
      .send(GetResponse({ message: 'We have just sent you an email' }));
  }

  @Post('validate-reset-password-code')
  @ApiResponseData(Object)
  async validateResetPasswordCode(
    @Body() body: ResetPasswordCodeDto,
    @Res() res: Response,
  ) {
    await this.usersService.validateResetPasswordUrl(body.resetPasswordCode);

    return res
      .status(HttpStatus.OK)
      .send(GetResponse({ message: 'Validation successful' }));
  }

  @Post('reset-password')
  @ApiResponseData(Object)
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
      .send(GetResponse({ message: 'New password have been updated' }));
  }

  @Get()
  @UseGuards(AtGuard, RoleGuard(Role.Admin))
  async getUsers(@Query() userQuery: UserQueryDto, @Res() res: Response) {
    const [users, total] = await this.usersService.getAll(userQuery);

    return res.status(HttpStatus.OK).send(
      GetResponseList({
        dataType: UserDto,
        data: users,
        offset: userQuery.page,
        limit: userQuery.limit,
        total,
      }),
    );
  }

  @Post(':id/approve')
  @UseGuards(AtGuard, RoleGuard(Role.Admin))
  async approveUser(@Param('id') id: string, @Res() res: Response) {
    await this.usersService.approveUser(id);

    return res
      .status(HttpStatus.OK)
      .send(GetResponse({ message: 'User approved' }));
  }

  @Post(':id/block')
  @UseGuards(AtGuard, RoleGuard(Role.Admin))
  async blockUser(
    @Param('id') id: string,
    @Body() blockUserDto: BlockUserDto,
    @Res() res: Response,
  ) {
    await this.usersService.blockUser(id, blockUserDto.reason);

    return res
      .status(HttpStatus.OK)
      .send(GetResponse({ message: 'User blocked' }));
  }

  @Post(':id/unblock')
  @UseGuards(AtGuard, RoleGuard(Role.Admin))
  async unblockUser(@Param('id') id: string, @Res() res: Response) {
    await this.usersService.unblockUser(id);

    return res
      .status(HttpStatus.OK)
      .send(GetResponse({ message: 'User unblocked' }));
  }

  @Post('/get-started')
  @UseGuards(AtGuard)
  async setGetStarted(
    @Body() getStartedDto: GetStartedDto,
    @CurrentUser() user: JwtPayload,
    @Res() res: Response,
  ) {
    const updatedUser = await this.usersService.setShowGetStarted(
      user.sub,
      getStartedDto.isShow,
    );

    return res.status(HttpStatus.OK).send(
      GetResponse({
        dataType: UserDto,
        data: updatedUser,
        message: 'Change show get started successfully',
      }),
    );
  }
}
