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
