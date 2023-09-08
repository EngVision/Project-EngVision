import {
  Body,
  Controller,
  HttpStatus,
  Patch,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { Response } from 'express';
import { multerOptions } from 'src/common/config';
import { CurrentUser } from 'src/common/decorators';
import { AtGuard } from 'src/common/guards';
import { JwtPayload } from '../auth/types';
import { EmailDto } from './dto/email.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ValidateResetPasswordPageDto } from './dto/validate-reset-password-page.dto';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

@ApiTags('Account')
@Controller('account')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch('profile')
  @UseGuards(AtGuard)
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

  @Post('password')
  @UseGuards(AtGuard)
  async updatePassword(
    @CurrentUser() user: JwtPayload,
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Res() res: Response,
  ) {
    await this.usersService.updatePassword(user.sub, updatePasswordDto);

    return res.status(HttpStatus.OK).send('The user password was changed');
  }

  @Post('forgot-password')
  async forgotPassword(@Body() body: EmailDto, @Res() res: Response) {
    const result = await this.usersService.sendMailResetPassword(body.email);
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
