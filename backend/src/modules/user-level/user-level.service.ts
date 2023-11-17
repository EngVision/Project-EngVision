import { Injectable } from '@nestjs/common';
import { CreateUserLevelDto } from './dto/create-user-level.dto';
import { UpdateUserLevelDto } from './dto/update-user-level.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserLevel, UserLevelDocument } from './schemas/user-level.scheme';
import { Model } from 'mongoose';

@Injectable()
export class UserLevelService {
  constructor(
    @InjectModel(UserLevel.name) private userLevelModel: Model<UserLevel>,
  ) {}

  async create(createUserLevelDto: CreateUserLevelDto, userId: string) {
    const userLevel = await this.userLevelModel.findOne({ user: userId });
    if (userLevel) {
      return this.transform(userLevel);
    }

    const level = createUserLevelDto.level;

    const newUserLevel = new this.userLevelModel<UserLevel>({
      overall: level,
      listening: {
        overall: level,
        comprehension: level,
      },
      reading: {
        overall: level,
        skimming: level,
        scanning: level,
        comprehension: level,
      },
      writing: {
        overall: level,
        coherence: level,
        organization: level,
        conciseness: level,
      },
      speaking: {
        pronunciation: level,
        fluency: level,
        overall: level,
      },
      grammar: level,
      vocabulary: level,
      user: userId,
    });
    await newUserLevel.save();

    return this.transform(newUserLevel);
  }

  async findOneByUser(id: string) {
    const userLevel = await this.userLevelModel.findOne({ user: id });

    return this.transform(userLevel);
  }

  transform(userLevel: UserLevelDocument) {
    const data = userLevel.toJSON();

    return {
      ...data,
      listening: {
        ...data.listening,
        grammar: data.grammar,
        vocabulary: data.vocabulary,
      },
      reading: {
        ...data.reading,
        grammar: data.grammar,
        vocabulary: data.vocabulary,
      },
      speaking: {
        ...data.speaking,
        grammar: data.grammar,
        vocabulary: data.vocabulary,
      },
      writing: {
        ...data.writing,
        grammar: data.grammar,
        vocabulary: data.vocabulary,
      },
    };
  }
}
