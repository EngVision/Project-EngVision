import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AddPartDto {
  @IsString()
  @ApiProperty({ description: 'Part id' })
  partId: string;
}
