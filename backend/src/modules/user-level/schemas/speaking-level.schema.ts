import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Score, ScoreSchema } from './score.schema';

@Schema({ _id: false, versionKey: false })
export class SpeakingLevel {
  @Prop({ type: ScoreSchema, default: null })
  pronunciation: Score;

  @Prop({ type: ScoreSchema, default: null })
  fluency: Score;

  @Prop({ type: ScoreSchema, default: null })
  overall: Score;
}

export const SpeakingLevelSchema = SchemaFactory.createForClass(SpeakingLevel);

SpeakingLevelSchema.pre('save', function () {
  const num = [this.pronunciation, this.fluency].filter(e => e !== null).length;

  if (this.pronunciation || this.fluency) {
    if (this.overall === null) {
      this.overall = new Score();
    }

    this.overall.LevelA =
      (this.pronunciation?.LevelA + this.fluency?.LevelA) / num;
    this.overall.LevelB =
      (this.pronunciation?.LevelB + this.fluency?.LevelB) / num;
    this.overall.LevelC =
      (this.pronunciation?.LevelC + this.fluency?.LevelC) / num;
  }
});
