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

  updateOverall: (grammar: Score, vocabulary: Score) => void;
}

export const SpeakingLevelSchema = SchemaFactory.createForClass(SpeakingLevel);

SpeakingLevelSchema.methods.updateOverall = function (
  grammar: Score,
  vocabulary: Score,
) {
  if (!this.pronunciation && !this.fluency) {
    return;
  }

  const num = [this.pronunciation, this.fluency, grammar, vocabulary].filter(
    e => e !== null,
  ).length;

  if (this.pronunciation || this.fluency || grammar || vocabulary) {
    if (this.overall === null) {
      this.overall = new Score();
    }

    this.overall.LevelA =
      ((this.pronunciation?.LevelA || 0) +
        (this.fluency?.LevelA || 0) +
        (grammar?.LevelA || 0) +
        (vocabulary?.LevelA || 0)) /
      num;
    this.overall.LevelB =
      ((this.pronunciation?.LevelB || 0) +
        (this.fluency?.LevelB || 0) +
        (grammar?.LevelB || 0) +
        (vocabulary?.LevelB || 0)) /
      num;
    this.overall.LevelC =
      ((this.pronunciation?.LevelC || 0) +
        (this.fluency?.LevelC || 0) +
        (grammar?.LevelC || 0) +
        (vocabulary?.LevelC || 0)) /
      num;
  }

  console.log(
    (this.pronunciation?.LevelA || 0) +
      (this.fluency?.LevelA || 0) +
      (grammar?.LevelA || 0) +
      (vocabulary?.LevelA || 0),
  );
  console.log(this.pronunciation, this.fluency, grammar, vocabulary, num);
  console.log(this.overall);
};
