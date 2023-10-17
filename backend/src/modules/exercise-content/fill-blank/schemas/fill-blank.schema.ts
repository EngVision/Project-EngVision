import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CEFRLevel, ExerciseTag } from 'src/common/enums';

@Schema({ _id: false, versionKey: false })
class Question {
  @Prop({ required: true })
  text: string;

  @Prop({ default: null })
  image?: string;

  @Prop({ required: true, default: [] })
  limits: number[];
}
const QuestionSchema = SchemaFactory.createForClass(Question);

export type FillBlankDocument = FillBlank & Document;

@Schema({ _id: false, versionKey: false })
class CorrectAnswer {
  @Prop({ type: String, required: true })
  detail: string;

  @Prop({ type: String, default: null })
  explanation: string;
}
const CorrectAnswerSchema = SchemaFactory.createForClass(CorrectAnswer);

@Schema({ versionKey: false, timestamps: true })
export class FillBlank {
  @Prop({ type: [String], enum: ExerciseTag, required: true })
  tags: string[];

  @Prop({ enum: CEFRLevel, required: true })
  level: string;

  @Prop({ type: QuestionSchema, required: true })
  question: Question;

  @Prop({ type: CorrectAnswerSchema, required: true })
  correctAnswer: CorrectAnswer;
}

export const FillBlankSchema = SchemaFactory.createForClass(FillBlank);
