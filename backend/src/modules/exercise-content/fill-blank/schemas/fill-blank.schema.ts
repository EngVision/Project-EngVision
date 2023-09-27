import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { CEFRLevel, ExerciseTag } from 'src/common/enums';
import { LocalFile } from 'src/modules/files/schemas/local-file.schema';

@Schema({ _id: false, versionKey: false })
class Question {
  @Prop({ required: true })
  text: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: LocalFile.name, default: null })
  image?: string;
}
const QuestionSchema = SchemaFactory.createForClass(Question);

export type FillBlankDocument = FillBlank & Document;

@Schema({ _id: false, versionKey: false })
class CorrectAnswer {
  @Prop({ type: String, required: true })
  detail: string;

  @Prop({ type: String, default: null })
  explain: string;
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
