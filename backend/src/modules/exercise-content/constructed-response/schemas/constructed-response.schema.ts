import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CEFRLevel, ExerciseTag } from 'src/common/enums';

@Schema({ _id: false, versionKey: false })
class Question {
  @Prop({ required: true })
  text: string;

  @Prop({ default: null })
  image?: string;

  @Prop({ default: null })
  audio?: string;
}
const QuestionSchema = SchemaFactory.createForClass(Question);

@Schema({ _id: false, versionKey: false })
class CorrectAnswer {
  @Prop({ type: String, default: null })
  detail?: string;

  @Prop({ type: String, default: null })
  explanation: string;
}
const CorrectAnswerSchema = SchemaFactory.createForClass(CorrectAnswer);

export type ConstructedResponseDocument = ConstructedResponse & Document;

@Schema({ versionKey: false, timestamps: true })
export class ConstructedResponse {
  @Prop({ type: [String], enum: ExerciseTag, required: true })
  tags: string[];

  @Prop({ enum: CEFRLevel, required: true })
  level: string;

  @Prop({ type: QuestionSchema, required: true })
  question: Question;

  @Prop({ type: CorrectAnswerSchema })
  correctAnswer: CorrectAnswer;
}

export const ConstructedResponseSchema =
  SchemaFactory.createForClass(ConstructedResponse);
