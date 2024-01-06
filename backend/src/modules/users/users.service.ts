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
import { UserQueryDto } from './dto/user-query.dto';
import { Order, AccountStatus, Role, Gender } from 'src/common/enums';
import { ChecklistService } from '../checklist/checklist.service';

interface Account {
  email: string;
  password: string;
}

@Injectable()
export class UsersService {
  private adminAccount: Account;
  private transporter;

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly filesService: FilesService,
    private readonly checklistService: ChecklistService,
  ) {
    this.adminAccount = {
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
    };
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: this.adminAccount.email,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    this.createAdmin();
  }

  /* Create new user */
  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const newUser = new this.userModel(createUserDto);

    newUser.avatar = (
      await this.filesService.getDefaultAvatar(newUser._id, newUser.email)
    ).id;

    if (newUser.role === 'Teacher' || newUser.role === 'Admin') {
      newUser.status = AccountStatus.Pending;
    }

    await newUser.save();

    this.checklistService.create(newUser._id);

    return newUser;
  }

  async createAdmin() {
    const admin = await this.userModel.findOne({
      email: this.adminAccount.email,
    });

    if (admin) return;

    const newUser = new this.userModel({
      email: this.adminAccount.email,
      password: this.adminAccount.password,
      firstName: 'Admin',
      role: Role.Admin,
      gender: Gender.Other,
    });

    newUser.avatar = (
      await this.filesService.getDefaultAvatar(newUser._id, newUser.email)
    ).id;

    await newUser.save();
  }

  async createWithSSO(user: User): Promise<UserDocument> {
    if (!user.gender) {
      user.gender = Gender.Other;
    }

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

    if (newUser.role === 'Teacher' || newUser.role === 'Admin') {
      newUser.status = AccountStatus.Pending;
    }

    await newUser.save();

    this.checklistService.create(newUser._id);

    return newUser;
  }

  async createAccount(id: string, createAccountDto: CreateAccountDto) {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      { ...createAccountDto },
      { returnDocument: 'after' },
    );

    if (updatedUser.role === 'Teacher' || updatedUser.role === 'Admin') {
      updatedUser.status = AccountStatus.Pending;
    }

    await updatedUser.save();

    return updatedUser;
  }

  /* Get user */
  async getAll(userQuery: UserQueryDto): Promise<[UserDocument[], number]> {
    const { limit, page, sortBy, order, ...query } = userQuery;

    const documentQuery = {
      $and: [
        {
          $or: [
            { role: { $ne: Role.Admin } },
            { status: AccountStatus.Pending },
          ],
        },
        { ...query },
      ],
    };

    const users = await this.userModel.find(documentQuery, null, {
      skip: limit === -1 ? 0 : page * limit,
      limit: limit === -1 ? null : limit,
      sort: { [sortBy]: order === Order.desc ? -1 : 1 },
    });

    const total = await this.userModel.countDocuments(documentQuery);

    return [users, total];
  }

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
      from: this.adminAccount.email,
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

  async approveUser(id: string): Promise<void> {
    const user = await this.userModel.findByIdAndUpdate(id, {
      status: AccountStatus.Active,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const mailOptions = {
      from: this.adminAccount.email,
      to: user.email,
      subject: 'Your account has been approved',
      html: 'Welcome to EngVision, your account has been approved',
    };
    await this.transporter.sendMail(mailOptions);
  }

  async blockUser(id: string, reason: string): Promise<void> {
    const user = await this.userModel.findByIdAndUpdate(id, {
      status: AccountStatus.Blocked,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const mailOptions = {
      from: this.adminAccount.email,
      to: user.email,
      subject: 'Your account has been blocked',
      html: 'Your account has been blocked. Reason: ' + reason,
    };
    await this.transporter.sendMail(mailOptions);
  }

  async unblockUser(id: string): Promise<void> {
    const user = await this.userModel.findByIdAndUpdate(id, {
      status: AccountStatus.Active,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const mailOptions = {
      from: this.adminAccount.email,
      to: user.email,
      subject: 'Your account has been unblocked',
      html: 'Your account has been unblocked. Welcome back!',
    };
    await this.transporter.sendMail(mailOptions);
  }

  async setShowGetStarted(id: string, isShow: boolean): Promise<UserDocument> {
    const user = await this.userModel.findByIdAndUpdate(
      id,
      { showGetStarted: isShow },
      { returnDocument: 'after' },
    );

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async setHideGuideTour(id: string): Promise<UserDocument> {
    const user = await this.userModel.findByIdAndUpdate(
      id,
      { showGuideTour: false },
      { returnDocument: 'after' },
    );

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
