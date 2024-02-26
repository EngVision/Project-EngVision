import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { LevelScore } from 'src/common/constants';
import { CEFRLevel } from 'src/common/enums';

const MaxLevelRangeScore = 50;

@Schema({ _id: false, versionKey: false })
export class Score {
  @Prop({
    type: Number,
    default: 0,
  })
  LevelA: number;

  @Prop({
    type: Number,
    default: 0,
  })
  LevelB: number;

  @Prop({
    type: Number,
    default: 0,
  })
  LevelC: number;

  @Prop({ type: Number, min: 0, default: 0 })
  sum: number;

  constructor(level: CEFRLevel = CEFRLevel.A1) {
    this.LevelA = 0;
    this.LevelB = 0;
    this.LevelC = 0;

    const levelScore = LevelScore[level].min;

    if (levelScore > LevelScore.A1.min) {
      this.LevelA += MaxLevelRangeScore;
    }
    if (levelScore > LevelScore.A2.min) {
      this.LevelA += MaxLevelRangeScore;
    }
    if (levelScore > LevelScore.B1.min) {
      this.LevelB += MaxLevelRangeScore;
    }
    if (levelScore > LevelScore.B2.min) {
      this.LevelB += MaxLevelRangeScore / 2;
    }
    if (levelScore > LevelScore.C1.min) {
      this.LevelC += MaxLevelRangeScore / 2;
    }
  }

  static getCEFRLevel(score: number): CEFRLevel {
    if (score >= LevelScore.C2.min) {
      return CEFRLevel.C2;
    }
    if (score >= LevelScore.C1.min) {
      return CEFRLevel.C1;
    }
    if (score >= LevelScore.B2.min) {
      return CEFRLevel.B2;
    }
    if (score >= LevelScore.B1.min) {
      return CEFRLevel.B1;
    }
    if (score >= LevelScore.A2.min) {
      return CEFRLevel.A2;
    }
    if (score >= LevelScore.A1.min) {
      return CEFRLevel.A1;
    }

    return CEFRLevel.A1;
  }
}

export const ScoreSchema = SchemaFactory.createForClass(Score);

ScoreSchema.pre('save', function () {
  if (this.LevelA < 0) {
    this.LevelA = 0;
  }
  if (this.LevelA > MaxLevelRangeScore * 2) {
    this.LevelA = MaxLevelRangeScore * 2;
  }
  if (this.LevelB < 0) {
    this.LevelB = 0;
  }
  if (this.LevelB > MaxLevelRangeScore * 2) {
    this.LevelB = MaxLevelRangeScore * 2;
  }
  if (this.LevelC < 0) {
    this.LevelC = 0;
  }
  if (this.LevelC > MaxLevelRangeScore) {
    this.LevelC = MaxLevelRangeScore;
  }

  this.sum = this.LevelA + this.LevelB + this.LevelC;
});
