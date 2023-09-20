import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class courseIdDto {
  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty({ type: String, description: 'id' })
  id: string;
}
