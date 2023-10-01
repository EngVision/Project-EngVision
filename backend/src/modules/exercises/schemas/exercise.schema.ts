import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { CEFRLevel, ExerciseTag, ExerciseType } from 'src/common/enums';
import { User } from 'src/modules/users/schemas/user.schema';

export type ExerciseDocument = Exercise & Document;

@Schema({ versionKey: false, timestamps: true })
export class Exercise {
  @Prop({ type: String, default: null })
  title?: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: User.name, required: true })
  creator: string;

  @Prop({ type: String, default: null })
  description?: string;

  @Prop({ type: [String], enum: ExerciseTag, required: true })
  tags: string[];

  @Prop({ enum: CEFRLevel, required: true })
  level: string;

  @Prop({ enum: ExerciseType, required: true })
  type: ExerciseType;

  @Prop([{ type: SchemaTypes.ObjectId, refPath: 'type', required: true }])
  content: string[];
}

export const ExerciseSchema = SchemaFactory.createForClass(Exercise);
