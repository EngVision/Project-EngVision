import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';

export class LocalFileDto {
  @Expose({ name: '_id' })
  @Transform(value => value.obj._id.toString())
  @ApiProperty({ type: String, description: 'File id' })
  id?: string;

  @ApiProperty({ type: String, description: 'File name' })
  filename?: string;

  @ApiProperty({ type: String, description: 'File url' })
  url: string;

  @ApiProperty({ type: String, description: 'File type' })
  mimetype?: string;

  @Exclude()
  user: string;

  @Exclude()
  path?: string;
}
