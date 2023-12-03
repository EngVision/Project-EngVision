import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Score, ScoreSchema } from './score.schema';

@Schema({ _id: false, versionKey: false })
export class ReadingLevel {
  @Prop({ type: ScoreSchema, default: null })
  skimming: Score;

  @Prop({ type: ScoreSchema, default: null })
  scanning: Score;

  @Prop({ type: ScoreSchema, default: null })
  comprehension: Score;

  @Prop({ type: ScoreSchema, default: null })
  overall: Score;
}

export const ReadingLevelSchema = SchemaFactory.createForClass(ReadingLevel);

ReadingLevelSchema.pre('save', function () {
  const num = [this.skimming, this.scanning, this.comprehension].filter(
    e => e !== null,
  ).length;

  if (this.skimming || this.scanning || this.comprehension) {
    if (this.overall === null) {
      this.overall = new Score();
    }

    this.overall.LevelA =
      (this.skimming?.LevelA +
        this.scanning?.LevelA +
        this.comprehension?.LevelA) /
      num;
    this.overall.LevelB =
      (this.skimming?.LevelB +
        this.scanning?.LevelB +
        this.comprehension?.LevelB) /
      num;
    this.overall.LevelC =
      (this.skimming?.LevelC +
        this.scanning?.LevelC +
        this.comprehension?.LevelC) /
      num;
  }
});
