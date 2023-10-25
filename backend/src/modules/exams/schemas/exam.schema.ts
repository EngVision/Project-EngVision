import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { CEFRLevel, ExerciseTag } from 'src/common/enums';
import { Course } from 'src/modules/courses/schemas/course.schema';
import { Exercise } from 'src/modules/exercises/schemas/exercise.schema';
import { User } from 'src/modules/users/schemas/user.schema';

export type ExamDocument = Exam & Document;

@Schema({ versionKey: false, timestamps: true })
export class Exam {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: Course.name })
  course: string;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: User.name })
  creator: string;

  @Prop({ required: true })
  level: CEFRLevel;

  @Prop({ type: [String], enum: ExerciseTag, required: true })
  tags: ExerciseTag[];

  @Prop([{ required: true, type: SchemaTypes.ObjectId, ref: Exercise.name }])
  parts: string[];
}

export const ExamSchema = SchemaFactory.createForClass(Exam);
