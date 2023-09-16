import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Expose, Transform } from 'class-transformer';
import { Document } from 'mongoose';

export type LocalFileDocument = LocalFile & Document;

@Schema({ versionKey: false, timestamps: true })
export class LocalFile {
  @Expose({ name: '_id' })
  @Transform(value => value.obj._id.toString())
  id?: string;

  @Prop({ default: null })
  filename?: string;

  @Prop({ required: true })
  url: string;

  @Prop({ default: null })
  mimetype?: string;

  @Exclude()
  @Prop({ required: true })
  user: string;

  @Exclude()
  @Prop({ default: null })
  path?: string;
}

export const LocalFileSchema = SchemaFactory.createForClass(LocalFile);
