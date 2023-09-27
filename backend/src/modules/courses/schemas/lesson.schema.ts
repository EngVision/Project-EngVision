import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LessonDocument = Lesson & Document;

@Schema()
export class Lesson {
  id?: string;

  @Prop({ required: true })
  title: string;

  @Prop({ default: null })
  exercises: string[];
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
