import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CEFRLevel } from 'src/common/enums';

@Schema({ _id: false, versionKey: false })
export class SpeakingLevel {
  @Prop({ default: CEFRLevel.A1, enum: CEFRLevel })
  pronunciation: CEFRLevel;

  @Prop({ default: CEFRLevel.A1, enum: CEFRLevel })
  fluency: CEFRLevel;

  @Prop({ default: CEFRLevel.A1, enum: CEFRLevel })
  overall: CEFRLevel;
}

export const SpeakingLevelSchema = SchemaFactory.createForClass(SpeakingLevel);
