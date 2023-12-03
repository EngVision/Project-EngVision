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

  updateOverall: (grammar: Score, vocabulary: Score) => void;
}

export const ReadingLevelSchema = SchemaFactory.createForClass(ReadingLevel);

ReadingLevelSchema.methods.updateOverall = function (
  grammar: Score,
  vocabulary: Score,
) {
  if (!this.skimming && !this.scanning && !this.comprehension) {
    return;
  }

  const num = [
    this.skimming,
    this.scanning,
    this.comprehension,
    grammar,
    vocabulary,
  ].filter(e => e !== null).length;

  if (
    this.skimming ||
    this.scanning ||
    this.comprehension ||
    grammar ||
    vocabulary
  ) {
    if (this.overall === null) {
      this.overall = new Score();
    }

    this.overall.LevelA =
      ((this.skimming?.LevelA || 0) +
        (this.scanning?.LevelA || 0) +
        (this.comprehension?.LevelA || 0) +
        (grammar?.LevelA || 0) +
        (vocabulary?.LevelA || 0)) /
      num;
    this.overall.LevelB =
      ((this.skimming?.LevelB || 0) +
        (this.scanning?.LevelB || 0) +
        (this.comprehension?.LevelB || 0) +
        (grammar?.LevelB || 0) +
        (vocabulary?.LevelB || 0)) /
      num;
    this.overall.LevelC =
      ((this.skimming?.LevelC || 0) +
        (this.scanning?.LevelC || 0) +
        (this.comprehension?.LevelC || 0) +
        (grammar?.LevelC || 0) +
        (vocabulary?.LevelC || 0)) /
      num;
  }
};
