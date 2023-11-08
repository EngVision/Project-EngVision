import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Exam } from 'src/modules/exams/schemas/exam.schema';
import { Submission } from 'src/modules/submissions/schemas/submission.schema';
import { User } from 'src/modules/users/schemas/user.schema';

export type ExamSubmissionDocument = ExamSubmission & Document;

@Schema({ versionKey: false, timestamps: true })
export class ExamSubmission {
  @Prop({ type: SchemaTypes.ObjectId, ref: User.name, required: true })
  user: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: Exam.name, required: true })
  exam: string;

  @Prop({ required: true })
  totalQuestion: number;

  @Prop({ default: 0 })
  totalCorrect: number;

  @Prop({ default: 0 })
  totalDone: number;

  @Prop({ default: null })
  grade: number;

  @Prop({ default: false })
  needGrade: boolean;

  @Prop([{ type: SchemaTypes.ObjectId, ref: Submission.name, required: true }])
  submissions: string[];
}

export const ExamSubmissionSchema =
  SchemaFactory.createForClass(ExamSubmission);
