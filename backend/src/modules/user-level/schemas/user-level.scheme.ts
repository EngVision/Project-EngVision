import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { CEFRLevel } from 'src/common/enums';
import { User } from 'src/modules/users/schemas/user.schema';
import { ListeningLevel, ListeningLevelSchema } from './listening-level.schema';
import { ReadingLevel, ReadingLevelSchema } from './reading-level.schema';
import { SpeakingLevel, SpeakingLevelSchema } from './speaking-level.schema';
import { WritingLevel, WritingLevelSchema } from './writing-level.schema';
import { LevelScore } from 'src/common/constants';
import { Score, ScoreSchema } from './score.schema';

export type UserLevelDocument = UserLevel & Document;

@Schema({ versionKey: false, timestamps: true })
export class UserLevel {
  @Prop({ type: SchemaTypes.ObjectId, ref: User.name, required: true })
  user: string;

  @Prop({ required: true, type: ScoreSchema })
  overall: Score;

  @Prop({ type: ScoreSchema, default: null })
  grammar: Score;

  @Prop({ type: ScoreSchema, default: null })
  vocabulary: Score;

  @Prop({ type: ListeningLevelSchema, default: {} })
  listening: ListeningLevel;

  @Prop({ type: ReadingLevelSchema, default: {} })
  reading: ReadingLevel;

  @Prop({ type: WritingLevelSchema, default: {} })
  writing: WritingLevel;

  @Prop({ type: SpeakingLevelSchema, default: {} })
  speaking: SpeakingLevel;

  constructor(user: string, level: CEFRLevel) {
    this.user = user;
    this.overall = new Score(level);
  }
}

export const UserLevelSchema = SchemaFactory.createForClass(UserLevel);
