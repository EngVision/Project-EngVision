import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, SchemaTypes } from 'mongoose';
import { User } from 'src/modules/users/schemas/user.schema';
import { LocalFile } from 'src/modules/files/schemas/local-file.schema';
import { SectionDocument, SectionSchema } from './section.schema';
import { CEFRLevel } from 'src/common/enums';
import { Review } from 'src/modules/reviews/schemas/review.schema';

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

  @Prop({ default: null, type: SchemaTypes.Mixed, ref: LocalFile.name })
  thumbnail: string;

  @Prop({ default: null })
  price: number;

  @Prop({ default: null })
  level: CEFRLevel;

  @Prop({ default: false })
  isPublished: boolean;

  @Prop({ default: null })
  tags: string[];

  @Prop({ default: null, type: [mongoose.Types.ObjectId], ref: User.name })
  attendanceList: string[];

  @Prop([{ type: SectionSchema, default: null }])
  sections: SectionDocument[];

  @Prop({ default: null, type: [mongoose.Types.ObjectId], ref: 'Post' })
  posts: mongoose.Types.ObjectId[];

  @Prop({ default: null, type: [mongoose.Types.ObjectId], ref: Review.name })
  reviews: mongoose.Types.ObjectId[];

  @Prop({ default: false })
  isCurriculum: boolean;

  @Prop({ default: false })
  isAdminCurriculum: boolean;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
