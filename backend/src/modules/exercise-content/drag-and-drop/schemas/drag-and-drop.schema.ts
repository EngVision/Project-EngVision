import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CEFRLevel, ExerciseTag } from 'src/common/enums';

@Schema({ _id: false, versionKey: false })
class Item {
  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  text: string;
}
const ItemSchema = SchemaFactory.createForClass(Item);

@Schema({ _id: false, versionKey: false })
class Question {
  @Prop({ required: true, type: [ItemSchema] })
  answers: Item[];

  @Prop({ default: null })
  text?: string;

  @Prop({ default: null })
  image?: string;

  @Prop({ default: null })
  audio?: string;
}
const QuestionSchema = SchemaFactory.createForClass(Question);

@Schema({ _id: false, versionKey: false })
class CorrectAnswer {
  @Prop({ required: true })
  detail: Item[];

  @Prop({ type: String, default: null })
  explanation: string;
}
const CorrectAnswerSchema = SchemaFactory.createForClass(CorrectAnswer);

export type DragAndDropDocument = DragAndDrop & Document;

@Schema({ versionKey: false, timestamps: true })
export class DragAndDrop {
  @Prop({ type: [String], enum: ExerciseTag, required: true })
  tags: ExerciseTag[];

  @Prop({ enum: CEFRLevel, required: true })
  level: CEFRLevel;

  @Prop({ type: QuestionSchema, required: true })
  question: Question;

  @Prop({ type: CorrectAnswerSchema, required: true })
  correctAnswer: CorrectAnswer;
}

export const DragAndDropSchema = SchemaFactory.createForClass(DragAndDrop);
