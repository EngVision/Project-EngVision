import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SpeechToTextDocument = SpeechToText & Document;

@Schema({ versionKey: false, timestamps: true })
export class SpeechToText {
  @Prop({ default: null })
  file_id?: string;

  @Prop({ default: null })
  text?: string;

  @Prop({ default: null })
  evaluation?: string;

  @Prop({ default: null })
  status?: string;
}

export const SpeechToTextSchema = SchemaFactory.createForClass(SpeechToText);
