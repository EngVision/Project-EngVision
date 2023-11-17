import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { CEFRLevel } from 'src/common/enums';
import { User } from 'src/modules/users/schemas/user.schema';
import { ListeningLevel, ListeningLevelSchema } from './listening-level.schema';
import { ReadingLevel, ReadingLevelSchema } from './reading-level.schema';
import { SpeakingLevel, SpeakingLevelSchema } from './speaking-level.schema';
import { WritingLevel, WritingLevelSchema } from './writing-level.schema';

export type UserLevelDocument = UserLevel & Document;

@Schema({ versionKey: false, timestamps: true })
export class UserLevel {
  @Prop({ type: SchemaTypes.ObjectId, ref: User.name, required: true })
  user: string;

  @Prop({ enum: CEFRLevel, default: CEFRLevel.A1 })
  overall: CEFRLevel;

  @Prop({ enum: CEFRLevel, default: CEFRLevel.A1 })
  grammar: CEFRLevel;

  @Prop({ enum: CEFRLevel, default: CEFRLevel.A1 })
  vocabulary: CEFRLevel;

  @Prop({ type: ListeningLevelSchema, default: {} })
  listening: ListeningLevel;

  @Prop({ type: ReadingLevelSchema, default: {} })
  reading: ReadingLevel;

  @Prop({ type: WritingLevelSchema, default: {} })
  writing: WritingLevel;

  @Prop({ type: SpeakingLevelSchema, default: {} })
  speaking: SpeakingLevel;
}

export const UserLevelSchema = SchemaFactory.createForClass(UserLevel);
