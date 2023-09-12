import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { unlink } from 'fs';
import * as gravatar from 'gravatar';
import { Model } from 'mongoose';
import * as nodemailer from 'nodemailer';
import * as randomstring from 'randomstring';
import { CreateUserDto } from './dto/create-user.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { emailContent } from './template/email.content';

@Injectable()
export class UsersService {
  private transporter;

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'engvision.dev@gmail.com',
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  /* Create new user */
  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    createUserDto.avatar = gravatar.url(createUserDto.email, {
      protocol: 'https',
      s: '200',
      r: 'pg',
      d: 'identicon',
    });

    const newUser = new this.userModel(createUserDto);
    await newUser.save();

    return newUser;
  }

  async createWithSSO(user: User): Promise<UserDocument> {
    const newUser = new this.userModel(user);
    await newUser.save();

    return newUser;
  }

  /* Get user */
  async getById(id: string): Promise<UserDocument> {
    return await this.userModel.findOne({ _id: id });
  }

  async getByEmail(email: string): Promise<UserDocument> {
    return await this.userModel.findOne({ email });
  }

  /* Update user */
  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    if (updateUserDto.avatar) {
      const beforeDocument = await this.getById(id);
      await this.deleteOldAvatar(beforeDocument.avatar);
    }

    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      { ...updateUserDto },
      { returnDocument: 'after' },
    );

    return updatedUser;
  }

  async updatePassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<UserDocument> {
    const user = await this.getById(id);

    if (user && (await user.validatePassword(updatePasswordDto.oldPassword))) {
      user.password = updatePasswordDto.password;

      await user.save();

      return user;
    }

    throw new BadRequestException('Old password is incorrect');
  }

  async deleteOldAvatar(avatarPath: string): Promise<void> {
    const isDefaultAvatar = avatarPath.includes('gravatar');

    if (!isDefaultAvatar) {
      const fileName = avatarPath.split('/').pop();

      unlink(`upload/avatar/${fileName}`, err => {
        if (err) throw new InternalServerErrorException(err);
      });
    }
  }

  async updateResetPasswordCode(
    id: string,
    resetPasswordCode: string,
  ): Promise<UserDocument> {
    try {
      return await this.userModel.findByIdAndUpdate(id, {
        resetPasswordCode: resetPasswordCode,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async sendMailResetPassword(email: string): Promise<boolean> {
    const user = await this.userModel.findOne({ email });
    if (!user) return false;
    const resetPasswordCode = randomstring.generate(10);
    await this.updateResetPasswordCode(user.id, resetPasswordCode);
    const mailOptions = {
      from: 'engvision.dev@gmail.com',
      to: email,
      subject: 'The reset password link for Engvision',
      text: 'This is text property',
      html: emailContent(user, resetPasswordCode),
    };
    await this.transporter.sendMail(mailOptions);
    return true;
  }

  async validateResetPasswordUrl(resetPasswordCode: string): Promise<boolean> {
    try {
      const user = await this.userModel.findOne({
        resetPasswordCode: resetPasswordCode,
      });
      return !!user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async resetForgottenPassword(
    resetPassword: ResetPasswordDto,
  ): Promise<boolean> {
    try {
      const user = await this.userModel.findOne({
        resetPasswordCode: resetPassword.resetPasswordCode,
      });
      if (!user) return false;

      user.password = resetPassword.newPassword;
      user.resetPasswordCode = null;
      await user.save();

      return true;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
