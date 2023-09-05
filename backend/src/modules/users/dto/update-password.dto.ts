import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'Old password' })
  oldPassword: string;

  @MinLength(8)
  @MaxLength(24)
  @IsStrongPassword()
  @ApiProperty({ type: String, description: 'New password' })
  password: string;
}
