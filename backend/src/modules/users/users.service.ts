import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as nodemailer from 'nodemailer';
import * as randomstring from 'randomstring';
import { CreateUserDto, UpdatePasswordDto, UpdateUserDto } from './dto';
import { CreateAccountDto } from './dto/create-account.dto';
import { User, UserDocument } from './schemas/user.schema';
import { emailContent } from './template/email.content';
import { FilesService } from '../files/files.service';

@Injectable()
export class UsersService {
  private transporter;

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly filesService: FilesService,
  ) {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'engvision.dev@gmail.com',
        pass: 'EngVision2023',
      },
      secure: false,
      requireTLS: true,
    });
  }

  /* Create new user */
  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const newUser = new this.userModel(createUserDto);

    newUser.avatar = (
      await this.filesService.getDefaultAvatar(newUser._id, newUser.email)
    ).id;

    await newUser.save();

    return newUser;
  }

  async createWithSSO(user: User): Promise<UserDocument> {
    const newUser = new this.userModel(user);

    if (user.avatar) {
      newUser.avatar = (
        await this.filesService.createWithUrl(user.avatar, newUser._id)
      ).id;
    } else {
      newUser.avatar = (
        await this.filesService.getDefaultAvatar(newUser._id, newUser.email)
      ).id;
    }

    await newUser.save();

    return newUser;
  }

  async createAccount(id: string, createAccountDto: CreateAccountDto) {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      { ...createAccountDto },
      { returnDocument: 'after' },
    );

    return updatedUser;
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
    const user = await this.getById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!updateUserDto.avatar) {
      updateUserDto.avatar = (
        await this.filesService.getDefaultAvatar(id, user.email)
      ).id;
    }

    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      { ...updateUserDto },
      { new: true },
    );

    return updatedUser;
  }

  async updatePassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<void> {
    const user = await this.getById(id);

    if (
      !user ||
      !(await user.validatePassword(updatePasswordDto.oldPassword))
    ) {
      throw new BadRequestException('Old password is incorrect');
    }

    user.password = updatePasswordDto.password;
    await user.save();
  }

  /* Reset password */
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

  async validateResetPasswordUrl(resetPasswordCode: string): Promise<void> {
    const user = await this.userModel.findOne({
      resetPasswordCode: resetPasswordCode,
    });

    if (!user) {
      throw new BadRequestException('Invalid reset password code');
    }
  }

  async resetForgottenPassword(
    resetPasswordCode: string,
    password: string,
  ): Promise<boolean> {
    try {
      const user = await this.userModel.findOne({
        resetPasswordCode: resetPasswordCode,
      });
      if (!user) return false;

      user.password = password;
      user.resetPasswordCode = null;
      await user.save();

      return true;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
