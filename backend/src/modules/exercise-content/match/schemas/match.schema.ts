import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CEFRLevel, ExerciseTag } from 'src/common/enums';

@Schema({ _id: false, versionKey: false })
class Item {
  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  content: string;
}

@Schema({ _id: false, versionKey: false })
class Question {
  @Prop({ required: true, type: [[Object]] })
  pairs: Item[][];

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
  @Prop({
    type: [[Object]],
    required: true,
  })
  detail: Item[][];

  @Prop({ type: String, default: null })
  explanation: string;
}
const CorrectAnswerSchema = SchemaFactory.createForClass(CorrectAnswer);

export type MatchDocument = Match & Document;

@Schema({ versionKey: false, timestamps: true })
export class Match {
  @Prop({ type: [String], enum: ExerciseTag, required: true })
  tags: ExerciseTag[];

  @Prop({ enum: CEFRLevel, required: true })
  level: CEFRLevel;

  @Prop({ type: QuestionSchema, required: true })
  question: Question;

  @Prop({ type: CorrectAnswerSchema, required: true })
  correctAnswer: CorrectAnswer;
}

export const MatchSchema = SchemaFactory.createForClass(Match);

// UnscrambleSchema.post('find', function (docs: MultipleChoice[]) {
//   docs.forEach(doc => shuffleArray(doc.question.answers));
// });
