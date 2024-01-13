import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { User } from 'src/modules/users/schemas/user.schema';

@Schema({ versionKey: false, timestamps: false, _id: false })
export class AchievementItem {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String, required: true })
  image: string;

  @Prop({ type: Number, default: 0 })
  progress: number;
}
const AchievementItemSchema = SchemaFactory.createForClass(AchievementItem);

export type AchievementDocument = Achievement & Document;

@Schema({ versionKey: false, timestamps: true })
export class Achievement {
  @Prop({ type: SchemaTypes.ObjectId, ref: User.name, required: true })
  user: string;

  @Prop([{ type: AchievementItemSchema, default: [] }])
  items: AchievementItem[];
}

export const AchievementSchema = SchemaFactory.createForClass(Achievement);
