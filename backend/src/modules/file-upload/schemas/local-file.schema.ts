import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LocalFileDocument = LocalFile & Document;

@Schema({ versionKey: false, timestamps: true })
export class LocalFile {
  id?: string;

  @Prop({ default: null })
  filename?: string;

  @Prop({ required: true })
  url: string;

  @Prop({ default: null })
  mimetype?: string;

  @Prop({ required: true })
  user: string;

  @Prop({ default: null })
  path?: string;
}

export const LocalFileSchema = SchemaFactory.createForClass(LocalFile);
