import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { LevelScore } from 'src/common/constants';
import { CEFRLevel } from 'src/common/enums';

@Schema({ _id: false, versionKey: false })
export class Score {
  @Prop({
    type: Number,
    max: LevelScore.A1.max - LevelScore.A1.min,
    min: 0,
    default: 0,
  })
  A1: number;

  @Prop({
    type: Number,
    max: LevelScore.A2.max - LevelScore.A2.min,
    min: 0,
    default: 0,
  })
  A2: number;

  @Prop({
    type: Number,
    max: LevelScore.B1.max - LevelScore.B1.min,
    min: 0,
    default: 0,
  })
  B1: number;

  @Prop({
    type: Number,
    max: LevelScore.B2.max - LevelScore.B2.min,
    min: 0,
    default: 0,
  })
  B2: number;

  @Prop({
    type: Number,
    max: LevelScore.C1.max - LevelScore.C1.min,
    min: 0,
    default: 0,
  })
  C1: number;

  @Prop({
    type: Number,
    max: LevelScore.C2.max - LevelScore.C2.min,
    min: 0,
    default: 0,
  })
  C2: number;

  @Prop({ type: Number, max: 10, min: 0, default: 0 })
  sum: number;

  constructor(level: CEFRLevel) {
    const levelScore = LevelScore[level].min;

    if (levelScore >= LevelScore.A1.min) {
      this.A1 = LevelScore.A1.max - LevelScore.A1.min;
    }
    if (levelScore >= LevelScore.A2.min) {
      this.A2 = LevelScore.A2.max - LevelScore.A2.min;
    }
    if (levelScore >= LevelScore.B1.min) {
      this.B1 = LevelScore.B1.max - LevelScore.B1.min;
    }
    if (levelScore >= LevelScore.B2.min) {
      this.B2 = LevelScore.B2.max - LevelScore.B2.min;
    }
    if (levelScore >= LevelScore.C1.min) {
      this.C1 = LevelScore.C1.max - LevelScore.C1.min;
    }
    if (levelScore >= LevelScore.C2.min) {
      this.C2 = LevelScore.C2.max - LevelScore.C2.min;
    }
  }
}

export const ScoreSchema = SchemaFactory.createForClass(Score);

ScoreSchema.pre('save', function () {
  this.sum = this.A1 + this.A2 + this.B1 + this.B2 + this.C1 + this.C2;
});
