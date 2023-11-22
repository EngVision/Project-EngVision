import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Score, ScoreSchema } from './score.schema';

@Schema({ _id: false, versionKey: false })
export class ListeningLevel {
  @Prop({ type: ScoreSchema, default: null })
  comprehension: Score;

  @Prop({ type: ScoreSchema, default: null })
  overall: Score;
}

export const ListeningLevelSchema =
  SchemaFactory.createForClass(ListeningLevel);
