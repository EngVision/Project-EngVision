import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { User } from 'src/modules/users/schemas/user.schema';

export type ReviewDocument = Review & Document;

@Schema({ versionKey: false, timestamps: true })
export class Review {
  id?: string;

  @Prop({ type: SchemaTypes.ObjectId, required: true, ref: User.name })
  user: string;

  @Prop({ type: SchemaTypes.ObjectId, required: true })
  courseId: string;

  @Prop({ required: true })
  star: number;

  @Prop({ default: null })
  comment: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
