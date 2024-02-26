import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { CEFRLevel } from 'src/common/enums';
import { User } from 'src/modules/users/schemas/user.schema';
import { ListeningLevel, ListeningLevelSchema } from './listening-level.schema';
import { ReadingLevel, ReadingLevelSchema } from './reading-level.schema';
import { Score, ScoreSchema } from './score.schema';
import { SpeakingLevel, SpeakingLevelSchema } from './speaking-level.schema';
import { WritingLevel, WritingLevelSchema } from './writing-level.schema';

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

UserLevelSchema.pre('save', function () {
  if (this.overall === null) {
    this.overall = new Score();
  }

  const num = [
    this.listening.overall,
    this.reading.overall,
    this.writing.overall,
    this.speaking.overall,
  ].filter(e => e !== null).length;

  if (
    this.listening.overall ||
    this.reading.overall ||
    this.writing.overall ||
    this.speaking.overall
  ) {
    this.overall.LevelA =
      ((this.listening?.overall?.LevelA || 0) +
        (this.reading?.overall?.LevelA || 0) +
        (this.writing?.overall?.LevelA || 0) +
        (this.speaking?.overall?.LevelA || 0)) /
      num;
    this.overall.LevelB =
      ((this.listening?.overall?.LevelB || 0) +
        (this.reading?.overall?.LevelB || 0) +
        (this.writing?.overall?.LevelB || 0) +
        (this.speaking?.overall?.LevelB || 0)) /
      num;
    this.overall.LevelC =
      ((this.listening?.overall?.LevelC || 0) +
        (this.reading?.overall?.LevelC || 0) +
        (this.writing?.overall?.LevelC || 0) +
        (this.speaking?.overall?.LevelC || 0)) /
      num;
  }
});
