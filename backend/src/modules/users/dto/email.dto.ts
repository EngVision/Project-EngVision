import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class EmailDto {
  @IsEmail()
  @ApiProperty({ type: String, description: 'email' })
  email: string;
}
