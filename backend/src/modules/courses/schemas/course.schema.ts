import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, SchemaTypes } from 'mongoose';
import { Level } from '../enums';
import { User } from 'src/modules/users/schemas/user.schema';
import { LocalFile } from 'src/modules/files/schemas/local-file.schema';
import { Section, SectionDocument, SectionSchema } from './section.schema';

export type CourseDocument = Course & Document;

@Schema({ versionKey: false, timestamps: true })
export class Course {
  id?: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: User.name })
  teacher: string;

  @Prop({ required: true })
  about: string;

  @Prop({ default: null })
  introVideo: string;

  @Prop({ default: null, type: SchemaTypes.ObjectId, ref: LocalFile.name })
  thumbnail: string;

  @Prop({ default: null })
  price: number;

  @Prop({ default: null })
  level: Level;

  @Prop({ default: null })
  tags: string[];

  @Prop({ default: null, type: [mongoose.Types.ObjectId], ref: User.name })
  attendanceList: string[];

  @Prop([{ type: SectionSchema, default: null }])
  sections: SectionDocument[];

  @Prop({ default: null, type: [mongoose.Types.ObjectId], ref: 'Post' })
  posts: mongoose.Types.ObjectId[];

  @Prop({ default: null, type: [mongoose.Types.ObjectId], ref: 'Review' })
  reviews: mongoose.Types.ObjectId[];
}

export const CourseSchema = SchemaFactory.createForClass(Course);
