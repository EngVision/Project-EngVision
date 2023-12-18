import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { LocalFile } from 'src/modules/files/schemas/local-file.schema';

export type MaterialsDocument = Materials & Document;

@Schema({ _id: true, timestamps: true })
class MaterialFile {
  @Prop({ required: true, ref: LocalFile.name })
  fileId: string;

  @Prop({ required: true })
  note: string;
}

@Schema({ _id: true, timestamps: true })
class MaterialLink {
  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  note: string;
}
const MaterialFileSchema = SchemaFactory.createForClass(MaterialFile);
const MaterialLinkSchema = SchemaFactory.createForClass(MaterialLink);

@Schema({ _id: false, versionKey: false })
export class Materials {
  @Prop({ default: [], type: [MaterialFileSchema] })
  pdfFiles: MaterialFile[];

  @Prop({ default: [], type: [MaterialFileSchema] })
  images: MaterialFile[];

  @Prop({ default: [], type: [MaterialFileSchema] })
  audios: MaterialFile[];

  @Prop({ default: [], type: [MaterialLinkSchema] })
  videos: MaterialLink[];
}

export const MaterialsSchema = SchemaFactory.createForClass(Materials);
