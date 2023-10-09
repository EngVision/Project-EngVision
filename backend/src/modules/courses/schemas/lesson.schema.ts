import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { Exercise } from 'src/modules/exercises/schemas/exercise.schema';

export type LessonDocument = Lesson & Document;

@Schema()
export class Lesson {
  id?: string;

  @Prop({ required: true })
  title: string;

  @Prop([{ type: SchemaTypes.ObjectId, ref: Exercise.name, default: [] }])
  exercises: Types.ObjectId[];
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
