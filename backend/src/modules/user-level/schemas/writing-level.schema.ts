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
}

export const WritingLevelSchema = SchemaFactory.createForClass(WritingLevel);

WritingLevelSchema.pre('save', function () {
  const num = [this.organization, this.coherence, this.conciseness].filter(
    e => e !== null,
  ).length;

  if (this.organization || this.coherence || this.conciseness) {
    if (this.overall === null) {
      this.overall = new Score();
    }

    this.overall.LevelA =
      (this.organization?.LevelA +
        this.coherence?.LevelA +
        this.conciseness?.LevelA) /
      num;
    this.overall.LevelB =
      (this.organization?.LevelB +
        this.coherence?.LevelB +
        this.conciseness?.LevelB) /
      num;
    this.overall.LevelC =
      (this.organization?.LevelC +
        this.coherence?.LevelC +
        this.conciseness?.LevelC) /
      num;
  }
});
