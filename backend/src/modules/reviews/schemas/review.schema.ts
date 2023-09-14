import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Expose, Transform } from 'class-transformer';

export type ReviewDocument = Review & Document;

@Schema({ versionKey: false, timestamps: true })
export class Review {
  @Expose({ name: '_id' })
  @Transform(value => value.obj._id.toString())
  id?: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  courseId: string;

  @Prop({ required: true })
  star: number;

  @Prop({ default: null })
  comment: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
