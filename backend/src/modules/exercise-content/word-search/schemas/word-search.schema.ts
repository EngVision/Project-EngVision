import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CEFRLevel, ExerciseTag } from 'src/common/enums';

@Schema({ _id: false, versionKey: false })
class Question {
  @Prop({ required: true, type: [String] })
  words: string[];

  @Prop({ required: true, type: [[String]] })
  rows: string[][];

  @Prop({ default: null })
  text?: string;

  @Prop({ default: null })
  image?: string;

  @Prop({ default: null })
  audio?: string;
}
const QuestionSchema = SchemaFactory.createForClass(Question);

@Schema({ versionKey: false, timestamps: true })
export class WordSearch {
  @Prop({ type: [String], enum: ExerciseTag, required: true })
  tags: ExerciseTag[];

  @Prop({ enum: CEFRLevel, required: true })
  level: CEFRLevel;

  @Prop({ type: QuestionSchema, required: true })
  question: Question;

  @Prop({ type: Object })
  correctAnswer: any;
}

export type WordSearchDocument = WordSearch & Document;
export const WordSearchSchema = SchemaFactory.createForClass(WordSearch);

// UnscrambleSchema.post('find', function (docs: MultipleChoice[]) {
//   docs.forEach(doc => shuffleArray(doc.question.answers));
// });
