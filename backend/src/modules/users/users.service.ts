import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as nodemailer from 'nodemailer';
import * as randomstring from 'randomstring';
import { CreateUserDto, UpdatePasswordDto, UpdateUserDto } from './dto';
import { CreateAccountDto } from './dto/create-account.dto';
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
    const newUser = new this.userModel(createUserDto);
    await newUser.save();

    return newUser.populate('avatar', ['id', 'url']);
  }

  async createWithSSO(user: User): Promise<UserDocument> {
    const newUser = new this.userModel(user);
    await newUser.save();

    return newUser.populate('avatar', ['id', 'url']);
  }

  async createAccount(id: string, createAccountDto: CreateAccountDto) {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      { ...createAccountDto },
      { returnDocument: 'after' },
    );

    return updatedUser.populate('avatar', ['id', 'url']);
  }

  /* Get user */
  async getById(id: string): Promise<UserDocument> {
    return await this.userModel
      .findOne({ _id: id })
      .populate('avatar', ['id', 'url']);
  }

  async getByEmail(email: string): Promise<UserDocument> {
    return await this.userModel
      .findOne({ email })
      .populate('avatar', ['id', 'url']);
  }

  /* Update user */
  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    if (updateUserDto.avatar) {
    }
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      { ...updateUserDto },
      { returnDocument: 'after' },
    );

    return updatedUser.populate('avatar', ['id', 'url']);
  }

  async updatePassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<void> {
    const user = await this.getById(id);

    if (user && (await user.validatePassword(updatePasswordDto.oldPassword))) {
      user.password = updatePasswordDto.password;

      await user.save();
    }

    throw new BadRequestException('Old password is incorrect');
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
