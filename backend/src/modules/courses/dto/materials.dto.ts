import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { FileDto } from 'src/modules/files/dto/file.dto';

class MaterialFile {
  @Expose({ name: '_id' })
  @Transform(value => value.obj._id.toString())
  @ApiProperty({ type: String, description: 'Material id' })
  id?: string;

  @Expose({ name: 'fileId' })
  @Type(() => FileDto)
  @ApiProperty({ type: FileDto, description: 'File' })
  file: FileDto;

  @ApiProperty({ type: String, description: 'Note' })
  note: string;
}

class MaterialLink {
  @Expose({ name: '_id' })
  @Transform(value => value.obj._id.toString())
  @ApiProperty({ type: String, description: 'Material id' })
  id?: string;

  @ApiProperty({ type: String, description: 'Url' })
  url: string;

  @ApiProperty({ type: String, description: 'Note' })
  note: string;
}

export class MaterialsDto {
  @Type(() => MaterialFile)
  @ApiProperty({ type: [MaterialFile], description: 'Material pdf files' })
  pdfFiles: MaterialFile[];

  @Type(() => MaterialFile)
  @ApiProperty({ type: [MaterialFile], description: 'Material images' })
  images: MaterialFile[];

  @Type(() => MaterialFile)
  @ApiProperty({ type: [MaterialFile], description: 'Material audios' })
  audios: MaterialFile[];

  @Type(() => MaterialLink)
  @ApiProperty({ type: [MaterialLink], description: 'Material videos' })
  videos: MaterialLink[];
}
