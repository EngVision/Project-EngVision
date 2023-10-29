import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class BlockUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'Reason for blocking user' })
  reason: string;
}
