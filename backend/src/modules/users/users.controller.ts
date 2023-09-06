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
  Req,
  Get,
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
import { ApiBody } from '@nestjs/swagger';
import { ValidateResetPasswordPageDto } from './dto/validate-reset-password-page.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@ApiTags('User profile')
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

  @Get('sendmail')
  async sendMail(@Req() req, @Res() res: Response) {
    const rawHeaders = req.rawHeaders;
    const clientSide = rawHeaders[rawHeaders.indexOf('Referer') + 1];
    const filter = req.query;
    if (!filter) return res.status(200).send(false);
    const result = await this.usersService.sendMail(filter, clientSide);
    return res.status(200).send(result);
  }

  @Post('validateEmailAndRandomString')
  @ApiBody({ type: ValidateResetPasswordPageDto })
  async validateResetPasswordUrl(
    @Body() linkInfo: ValidateResetPasswordPageDto,
  ) {
    return await this.usersService.validateResetPasswordLink(
      linkInfo.email,
      linkInfo.randomString,
    );
  }

  @Post('resetForgottenPassword')
  @ApiBody({ type: ResetPasswordDto })
  resetForgottenPassword(@Body() resetPassword: ResetPasswordDto) {
    return this.usersService.resetForgottenPassword(
      resetPassword.email,
      resetPassword.randomString,
      resetPassword.newPassword,
    );
  }
}
