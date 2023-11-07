import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LocalFileDocument = LocalFile & Document;

@Schema({ versionKey: false, timestamps: true })
export class LocalFile {
  @Prop({ default: null })
  filename?: string;

  @Prop({ default: null })
  url?: string;

  @Prop({ default: null })
  mimetype?: string;

  @Prop({ required: false, default: null })
  userId?: string;

  @Prop({ default: null })
  path?: string;
}

export const LocalFileSchema = SchemaFactory.createForClass(LocalFile);
