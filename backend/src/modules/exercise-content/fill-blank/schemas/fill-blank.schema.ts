import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { LocalFile } from 'src/modules/files/schemas/local-file.schema';

@Schema({ _id: false, versionKey: false })
class Question {
  @Prop({ required: true })
  text: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: LocalFile.name, default: null })
  image?: string;

  @Prop({ required: true })
  isStrict: boolean;
}
const QuestionSchema = SchemaFactory.createForClass(Question);

export type FillBlankDocument = FillBlank & Document;

@Schema({ versionKey: false, timestamps: true })
export class FillBlank {
  @Prop({ type: QuestionSchema, required: true })
  question: Question;

  @Prop({ type: String, required: true })
  correctAnswer: string;
}

export const FillBlankSchema = SchemaFactory.createForClass(FillBlank);
