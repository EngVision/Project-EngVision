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
