import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserView, UserViewDocument } from './schemas/user-view.schema';

@Injectable()
export class UserViewsService {
  constructor(
    @InjectModel(UserView.name)
    private readonly userViewModel: Model<UserViewDocument>,
  ) {}

  async get(targetId: string, userId: string) {
    const userView = this.userViewModel.findOne({ userId, targetId });
    return userView;
  }

  async create(targetId: string, userId: string) {
    if (await this.get(targetId, userId))
      throw new BadRequestException('User have already viewed');

    const newUserView = new this.userViewModel({
      targetId,
      userId,
    });
    await newUserView.save();

    return newUserView;
  }

  async getAll(userId: string) {
    const userViews = await this.userViewModel.find({ userId });

    return userViews;
  }
}
