import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as gravatar from 'gravatar';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { unlink } from 'fs';
import { UpdatePasswordDto } from './dto/update-password.dto';
import randomStringGenerator = require('randomstring');
import * as nodemailer from 'nodemailer';
import { emailContent } from './template/email.content';

@Injectable()
export class UsersService {
  private transporter;

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
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

  async createWithSSO(user: User) {
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

  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = await this.getById(id);

    if (user && (await user.validatePassword(updatePasswordDto.oldPassword))) {
      return await this.userModel.findByIdAndUpdate(id, {
        password: updatePasswordDto.password,
      });
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

  async updateRandomString(user: UpdateUserDto, randomString: string) {
    try {
      return await this.userModel.findByIdAndUpdate(user._id, {
        randomString: randomString,
      });
    } catch (error) {
      console.log('update user service error', error);
    }
  }

  async sendMail(filter: any, clientSide: any) {
    const email = filter.email;
    const userFindedByEmail = await this.userModel.findOne({ email });
    const resetPasswordCode = randomStringGenerator.generate();
    if (!userFindedByEmail) return false;
    await this.updateRandomString(userFindedByEmail, resetPasswordCode);
    const mailOptions = {
      from: 'engvision.dev@gmail.com',
      to: email,
      subject: 'The reset password link for Engvision',
      text: 'This is text property',
      html: emailContent(
        userFindedByEmail,
        filter,
        clientSide,
        resetPasswordCode,
      ),
    };
    await this.transporter.sendMail(mailOptions);
    return true;
  }

  async validateResetPasswordLink(email: string, randomString: string) {
    if (email === null) return false;
    try {
      const userFindedByEmailAndRandomString = await this.userModel.findOne({
        email: email,
        randomString: randomString,
      });
      if (userFindedByEmailAndRandomString === null) {
        return false;
      }
      return true;
    } catch (error) {
      console.log(error);
    }
  }

  async resetForgottenPassword(
    email: string,
    randomString: string,
    newPassword: string,
  ) {
    if (email === null) return false;
    try {
      const userFindedByEmailAndRandomString = await this.userModel.findOne({
        email: email,
        randomString: randomString,
      });
      if (userFindedByEmailAndRandomString === null) {
        return false;
      }
      userFindedByEmailAndRandomString.password = newPassword;
      userFindedByEmailAndRandomString.randomString =
        randomStringGenerator.generate();
      await userFindedByEmailAndRandomString.save();
      return true;
    } catch (error) {
      console.log('reset forgotten password fail with error: ', error);
    }
  }
}
