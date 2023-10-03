import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { CEFRLevel, ExerciseTag } from 'src/common/enums';
import { LocalFile } from 'src/modules/files/schemas/local-file.schema';

@Schema({ _id: false, versionKey: false })
class Question {
  @Prop({ default: null })
  title: string;

  @Prop({ required: true })
  text: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: LocalFile.name, default: null })
  image?: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: LocalFile.name, default: null })
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

  @Prop({ type: CorrectAnswerSchema, required: true })
  correctAnswer: CorrectAnswer;
}

export const ConstructedResponseSchema =
  SchemaFactory.createForClass(ConstructedResponse);
