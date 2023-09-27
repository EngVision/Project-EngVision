import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { LessonDocument, LessonSchema } from './lesson.schema';

export type SectionDocument = Section & Document;

@Schema()
export class Section {
  id?: string;

  @Prop({ required: true })
  title: string;

  @Prop([{ type: LessonSchema, default: null }])
  lessons: LessonDocument[];
}

export const SectionSchema = SchemaFactory.createForClass(Section);
