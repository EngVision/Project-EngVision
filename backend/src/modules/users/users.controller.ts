import { plainToClass } from 'class-transformer';
import {
  Body,
  Controller,
  Patch,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Res,
  HttpStatus,
  Post,
  Headers,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { multerOptions } from 'src/common/config';
import { CurrentUser } from 'src/common/decorators';
import { JwtPayload } from '../auth/types';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { Response } from 'express';
import { User } from './schemas/user.schema';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ValidateResetPasswordPageDto } from './dto/validate-reset-password-page.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { EmailDto } from './dto/email.dto';

@ApiTags('Account')
@Controller('account')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch('update-profile')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('avatar', multerOptions('avatar', 'image')))
  @ApiConsumes('multipart/form-data')
  async updateProfile(
    @CurrentUser() user: JwtPayload,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile()
    file: Express.Multer.File,
    @Res() res: Response,
  ) {
    updateUserDto = file
      ? { ...updateUserDto, avatar: file.filename }
      : updateUserDto;

    const updatedUser = await this.usersService.update(user.sub, updateUserDto);

    return res
      .status(HttpStatus.OK)
      .send(plainToClass(User, updatedUser.toObject()));
  }

  @Post('change-password')
  @UseGuards(AuthGuard('jwt'))
  async updatePassword(
    @CurrentUser() user: JwtPayload,
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Res() res: Response,
  ) {
    await this.usersService.updatePassword(user.sub, updatePasswordDto);

    return res.status(HttpStatus.OK).send('The user password was changed');
  }

  @Post('forgot-password')
  async forgotPassword(
    @Headers('referer') referer: string,
    @Body() body: EmailDto,
    @Res() res: Response,
  ) {
    const result = await this.usersService.sendMailResetPassword(
      body.email,
      referer,
    );
    if (!result)
      res.status(HttpStatus.NOT_FOUND).send({ message: 'Email not found' });
    return res
      .status(HttpStatus.OK)
      .send({ message: 'We have just sent you an email' });
  }

  @Post('validate-reset-password-url')
  async validateResetPasswordUrl(@Body() body: ValidateResetPasswordPageDto) {
    return await this.usersService.validateResetPasswordUrl(
      body.resetPasswordCode,
    );
  }

  @Post('reset-forgotten-password')
  async resetForgottenPassword(
    @Body() resetPassword: ResetPasswordDto,
    @Res() res: Response,
  ) {
    const result = await this.usersService.resetForgottenPassword(
      resetPassword,
    );
    if (!result)
      res
        .status(HttpStatus.NOT_FOUND)
        .send({ message: 'Reset password code not found' });
    return res
      .status(HttpStatus.OK)
      .send({ message: 'New password have been updated' });
  }
}
