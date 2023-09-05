import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as gravatar from 'gravatar';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  /* Create new user */
  async create(createUserDto: CreateUserDto) {
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
  async getById(id: string) {
    return await this.userModel.findOne({ _id: id });
  }

  async getByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  /* Update user */
  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userModel.findByIdAndUpdate(id, { ...updateUserDto });
  }
}
