import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
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
  @Prop({ required: true })
  text: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: LocalFile.name, default: null })
  image?: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: LocalFile.name, default: null })
  audio?: string;

  @Prop([{ type: AnswerSchema }])
  answers: Answer[];
}
const QuestionSchema = SchemaFactory.createForClass(Question);

export type MultipleChoiceDocument = MultipleChoice & Document;

@Schema({ versionKey: false })
export class MultipleChoice {
  @Prop({ type: QuestionSchema, required: true })
  question: Question;

  @Prop({ type: [Number], required: true })
  correctAnswer: number[];
}

export const MultipleChoiceSchema =
  SchemaFactory.createForClass(MultipleChoice);
