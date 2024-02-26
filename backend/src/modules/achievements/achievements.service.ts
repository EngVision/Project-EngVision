import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AchievementList } from 'src/common/constants';
import { Achievement, AchievementDocument } from './schemas/achievement.schema';
import { SubmissionsService } from '../submissions/submissions.service';

@Injectable()
export class AchievementsService {
  constructor(
    @InjectModel(Achievement.name)
    private achievementModel: Model<AchievementDocument>,
    private readonly submissionsService: SubmissionsService,
  ) {}

  async findAll(userId: string): Promise<AchievementDocument> {
    var achievement = await this.achievementModel.findOne({ user: userId });

    if (!achievement) {
      const newAchievement = new this.achievementModel({
        user: userId,
        items: AchievementList,
      });
      await newAchievement.save();

      achievement = newAchievement;
    }

    await this.update(userId);

    return achievement;
  }

  async update(userId: string) {
    const [submissions] = await this.submissionsService.findByUser({}, userId);

    const completedExercises = submissions.filter(
      submission => submission.progress === 1,
    );
    const count = completedExercises.length;

    const achievement = await this.achievementModel.findOne({ user: userId });
    achievement.items[0].progress = count / 5;
    achievement.items[1].progress = count / 20;
    achievement.items[2].progress = count / 100;

    await achievement.save();
  }
}
