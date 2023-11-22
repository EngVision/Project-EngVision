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
