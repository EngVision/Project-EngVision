import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserViewDocument = UserView & Document;

@Schema({ versionKey: false, timestamps: true })
export class UserView {
  @Prop({ required: true, default: null })
  userId: string;

  @Prop({ required: true, default: null })
  targetId: string;
}

export const UserViewSchema = SchemaFactory.createForClass(UserView);
