import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { User } from 'src/modules/users/schemas/user.schema';

@Schema({ versionKey: false, timestamps: true })
export class Checklist {
  @Prop({ type: SchemaTypes.ObjectId, ref: User.name, required: true })
  user: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  link: string;

  @Prop({ default: false })
  isDone: boolean;
}

export const ChecklistSchema = SchemaFactory.createForClass(Checklist);
