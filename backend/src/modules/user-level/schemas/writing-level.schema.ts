import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Score, ScoreSchema } from './score.schema';

@Schema({ _id: false, versionKey: false })
export class WritingLevel {
  @Prop({ type: ScoreSchema, default: null })
  organization: Score;

  @Prop({ type: ScoreSchema, default: null })
  coherence: Score;

  @Prop({ type: ScoreSchema, default: null })
  conciseness: Score;

  @Prop({ type: ScoreSchema, default: null })
  overall: Score;

  updateOverall: (grammar: Score, vocabulary: Score) => void;
}

export const WritingLevelSchema = SchemaFactory.createForClass(WritingLevel);

WritingLevelSchema.methods.updateOverall = function (
  grammar: Score,
  vocabulary: Score,
) {
  if (!this.organization && !this.coherence && !this.conciseness) {
    return;
  }

  const num = [
    this.organization,
    this.coherence,
    this.conciseness,
    grammar,
    vocabulary,
  ].filter(e => e !== null).length;

  if (
    this.organization ||
    this.coherence ||
    this.conciseness ||
    grammar ||
    vocabulary
  ) {
    if (this.overall === null) {
      this.overall = new Score();
    }

    this.overall.LevelA =
      ((this.organization?.LevelA || 0) +
        (this.coherence?.LevelA || 0) +
        (this.conciseness?.LevelA || 0) +
        (grammar?.LevelA || 0) +
        (vocabulary?.LevelA || 0)) /
      num;
    this.overall.LevelB =
      ((this.organization?.LevelB || 0) +
        (this.coherence?.LevelB || 0) +
        (this.conciseness?.LevelB || 0) +
        (grammar?.LevelB || 0) +
        (vocabulary?.LevelB || 0)) /
      num;
    this.overall.LevelC =
      ((this.organization?.LevelC || 0) +
        (this.coherence?.LevelC || 0) +
        (this.conciseness?.LevelC || 0) +
        (grammar?.LevelC || 0) +
        (vocabulary?.LevelC || 0)) /
      num;
  }
};
