import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class FileDto {
  @Expose({ name: '_id' })
  @Transform(value => value.obj._id.toString())
  @ApiProperty({ type: String, description: 'File id' })
  id?: string;

  @ApiPropertyOptional({ type: String, description: 'File name' })
  filename?: string;

  @ApiPropertyOptional({ type: String, description: 'File original name' })
  originalName?: string;

  @ApiPropertyOptional({ type: String, description: 'Mimetype' })
  mimetype?: string;

  @ApiPropertyOptional({ type: String, description: 'Url' })
  url?: string;

  @ApiPropertyOptional({ type: Number, description: 'Size' })
  size?: number;

  @Transform(value => value.obj?._id?.toString())
  @ApiProperty({ type: String, description: 'userId' })
  @ApiPropertyOptional({ type: String })
  userId?: string;
}
