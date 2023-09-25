import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ _id: false })
export class Lesson {
  id?: string;

  @Prop({ required: true })
  title: string;

  @Prop({ default: null })
  exercises: string[];
}

export const lessonSchema = SchemaFactory.createForClass(Lesson);
