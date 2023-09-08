import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ResetPasswordDto {
  @IsString()
  @ApiProperty({ type: String, description: 'reset password code' })
  resetPasswordCode: string;

  @IsString()
  @MinLength(8)
  @MaxLength(24)
  @IsStrongPassword()
  @ApiProperty({ type: String, description: 'newPassword' })
  newPassword: string;
}
