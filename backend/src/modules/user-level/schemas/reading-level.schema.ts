import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CEFRLevel } from 'src/common/enums';

@Schema({ _id: false, versionKey: false })
export class ReadingLevel {
  @Prop({ default: CEFRLevel.A1, enum: CEFRLevel })
  skimming: CEFRLevel;

  @Prop({ default: CEFRLevel.A1, enum: CEFRLevel })
  scanning: CEFRLevel;

  @Prop({ default: CEFRLevel.A1, enum: CEFRLevel })
  comprehension: CEFRLevel;

  @Prop({ default: CEFRLevel.A1, enum: CEFRLevel })
  overall: CEFRLevel;
}

export const ReadingLevelSchema = SchemaFactory.createForClass(ReadingLevel);
