import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Score, ScoreSchema } from './score.schema';

@Schema({ _id: false, versionKey: false })
export class ListeningLevel {
  @Prop({ type: ScoreSchema, default: null })
  comprehension: Score;

  @Prop({ type: ScoreSchema, default: null })
  overall: Score;

  updateOverall: (grammar: Score, vocabulary: Score) => void;
}

export const ListeningLevelSchema =
  SchemaFactory.createForClass(ListeningLevel);

ListeningLevelSchema.methods.updateOverall = function (
  grammar: Score,
  vocabulary: Score,
) {
  if (!this.comprehension) {
    return;
  }

  const num = [this.comprehension, grammar, vocabulary].filter(
    e => e !== null,
  ).length;

  if (this.comprehension || grammar || vocabulary) {
    if (this.overall === null) {
      this.overall = new Score();
    }

    this.overall.LevelA =
      ((this.comprehension?.LevelA || 0) +
        (grammar?.LevelA || 0) +
        (vocabulary?.LevelA || 0)) /
      num;
    this.overall.LevelB =
      ((this.comprehension?.LevelB || 0) +
        (grammar?.LevelB || 0) +
        (vocabulary?.LevelB || 0)) /
      num;
    this.overall.LevelC =
      ((this.comprehension?.LevelC || 0) +
        (grammar?.LevelC || 0) +
        (vocabulary?.LevelC || 0)) /
      num;
  }
};
