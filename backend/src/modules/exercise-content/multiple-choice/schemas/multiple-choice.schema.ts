import { shuffleArray } from './../../../../common/utils/shuffleArray';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { CEFRLevel, ExerciseTag } from 'src/common/enums';
import { LocalFile } from 'src/modules/files/schemas/local-file.schema';

@Schema({ _id: false, versionKey: false })
class Answer {
  @Prop({ required: true })
  id: number;

  @Prop({ required: true })
  text: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: LocalFile.name, default: null })
  image: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: LocalFile.name, default: null })
  audio: string;
}
const AnswerSchema = SchemaFactory.createForClass(Answer);

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

  @Prop({ default: false })
  multipleCorrectAnswers: boolean;

  @Prop([{ type: AnswerSchema }])
  answers: Answer[];
}
const QuestionSchema = SchemaFactory.createForClass(Question);

@Schema({ _id: false, versionKey: false })
class CorrectAnswer {
  @Prop({ type: [Number], required: true })
  detail: number[];

  @Prop({ type: String, default: null })
  explanation: string;
}
const CorrectAnswerSchema = SchemaFactory.createForClass(CorrectAnswer);

export type MultipleChoiceDocument = MultipleChoice & Document;

@Schema({ versionKey: false, timestamps: true })
export class MultipleChoice {
  @Prop({ type: [String], enum: ExerciseTag, required: true })
  tags: string[];

  @Prop({ enum: CEFRLevel, required: true })
  level: string;

  @Prop({ type: QuestionSchema, required: true })
  question: Question;

  @Prop({ type: CorrectAnswerSchema, required: true })
  correctAnswer: CorrectAnswer;
}

export const MultipleChoiceSchema =
  SchemaFactory.createForClass(MultipleChoice);

MultipleChoiceSchema.post('find', function (docs: MultipleChoice[]) {
  docs.forEach(doc => shuffleArray(doc.question.answers));
});
