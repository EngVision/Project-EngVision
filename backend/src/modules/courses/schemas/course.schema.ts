import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Expose, Transform } from 'class-transformer';
import mongoose, { Document } from 'mongoose';
import { Level } from '../enums';

export type CourseDocument = Course & Document;

@Schema({ versionKey: false, timestamps: true })
export class Course {
  @Expose({ name: '_id' })
  @Transform(value => value.obj._id.toString())
  id?: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: 'User' })
  teacher: mongoose.Types.ObjectId;

  @Prop({ required: true })
  about: string;

  @Prop({ default: null })
  introVideo: string;

  @Prop({ default: null })
  thumbnail: string;

  @Prop({ default: null })
  price: number;

  @Prop({ default: null })
  level: Level;

  @Prop({ default: null })
  tags: string[];

  @Prop({ default: null, type: [mongoose.Types.ObjectId], ref: 'Section' })
  sections: mongoose.Types.ObjectId[];

  @Prop({ default: null, type: [mongoose.Types.ObjectId], ref: 'Post' })
  posts: mongoose.Types.ObjectId[];

  @Prop({ default: null, type: [mongoose.Types.ObjectId], ref: 'Review' })
  reviews: mongoose.Types.ObjectId[];
}

export const CourseSchema = SchemaFactory.createForClass(Course);
