import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Lesson } from './lesson.schema';

export type SectionDocument = Section & Document;

@Schema({ _id: true })
export class Section {
  id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ default: null })
  lessons: Lesson[];
}

export const SectionSchema = SchemaFactory.createForClass(Section);
