import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CEFRLevel, ExerciseTag } from 'src/common/enums';

@Schema({ _id: false, versionKey: false })
class Question {
  @Prop({ required: true })
  items: string[];

  @Prop({ required: true })
  isUnscrambleByText: boolean;

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
  @Prop({ type: [String], required: true })
  detail: string[];

  @Prop({ type: String, default: null })
  explanation: string;
}
const CorrectAnswerSchema = SchemaFactory.createForClass(CorrectAnswer);

export type UnscrambleDocument = Unscramble & Document;

@Schema({ versionKey: false, timestamps: true })
export class Unscramble {
  @Prop({ type: [String], enum: ExerciseTag, required: true })
  tags: ExerciseTag[];

  @Prop({ enum: CEFRLevel, required: true })
  level: CEFRLevel;

  @Prop({ type: QuestionSchema, required: true })
  question: Question;

  @Prop({ type: CorrectAnswerSchema, required: true })
  correctAnswer: CorrectAnswer;
}

export const UnscrambleSchema = SchemaFactory.createForClass(Unscramble);

// UnscrambleSchema.post('find', function (docs: MultipleChoice[]) {
//   docs.forEach(doc => shuffleArray(doc.question.answers));
// });
