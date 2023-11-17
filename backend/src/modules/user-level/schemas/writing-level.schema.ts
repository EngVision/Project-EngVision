import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CEFRLevel } from 'src/common/enums';

@Schema({ _id: false, versionKey: false })
export class WritingLevel {
  @Prop({ default: CEFRLevel.A1, enum: CEFRLevel })
  organization: CEFRLevel;

  @Prop({ default: CEFRLevel.A1, enum: CEFRLevel })
  coherence: CEFRLevel;

  @Prop({ default: CEFRLevel.A1, enum: CEFRLevel })
  conciseness: CEFRLevel;

  @Prop({ default: CEFRLevel.A1, enum: CEFRLevel })
  overall: CEFRLevel;
}

export const WritingLevelSchema = SchemaFactory.createForClass(WritingLevel);
