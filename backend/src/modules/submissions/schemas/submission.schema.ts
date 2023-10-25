import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { ExerciseType } from 'src/common/enums';
import { Exercise } from 'src/modules/exercises/schemas/exercise.schema';
import { User } from 'src/modules/users/schemas/user.schema';

@Schema({ _id: false, versionKey: false })
export class QuestionResult {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'exerciseType', required: true })
  question: string;

  @Prop({ default: null })
  isCorrect?: boolean;

  @Prop({ type: Object, required: true })
  answer: any;

  @Prop({ type: Object, required: true })
  correctAnswer: any;

  @Prop({ default: null })
  explanation: string;

  @Prop({ default: null })
  grade?: number;
}
const QuestionResultSchema = SchemaFactory.createForClass(QuestionResult);

export type SubmissionDocument = Submission & Document;

@Schema({ versionKey: false, timestamps: true })
export class Submission {
  @Prop({ type: SchemaTypes.ObjectId, ref: User.name, required: true })
  user: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: User.name, required: true })
  teacher: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: Exercise.name, required: true })
  exercise: string;

  @Prop({ enum: ExerciseType, required: true })
  exerciseType: ExerciseType;

  @Prop({ required: true })
  totalQuestion: number;

  @Prop({ required: true })
  totalCorrect: number;

  @Prop({ required: true })
  totalDone: number;

  @Prop()
  grade: number;

  @Prop([{ type: QuestionResultSchema, required: true }])
  detail: QuestionResult[];
}

export const SubmissionSchema = SchemaFactory.createForClass(Submission);
