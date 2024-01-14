import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PaymentDocument = Payment & Document;

@Schema({ versionKey: false, timestamps: false })
export class Payment {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  courseId: string;

  @Prop({ required: true })
  orderCode: number;

  @Prop({ required: true })
  checkoutUrl: string;

  @Prop({ required: true })
  status: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
