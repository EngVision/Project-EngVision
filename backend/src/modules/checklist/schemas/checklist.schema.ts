import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { User } from 'src/modules/users/schemas/user.schema';

@Schema({ _id: false, versionKey: false })
export class ChecklistItem {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  link: string;

  @Prop({ default: false })
  isDone: boolean;

  @Prop({ default: false })
  disabled: boolean;
}
const ChecklistItemSchema = SchemaFactory.createForClass(ChecklistItem);

export type ChecklistDocument = Checklist & Document;

@Schema({ versionKey: false, timestamps: true })
export class Checklist {
  @Prop({ type: SchemaTypes.ObjectId, ref: User.name, required: true })
  user: string;

  @Prop([{ type: ChecklistItemSchema, default: [] }])
  items: ChecklistItem[];

  @Prop({ default: false })
  isDone: boolean;
}

export const ChecklistSchema = SchemaFactory.createForClass(Checklist);
