import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsStrongPassword } from 'class-validator';

export class ResetPasswordDto {
  @IsString()
  @ApiProperty({ type: String, description: 'reset password code' })
  resetPasswordCode: string;

  @IsStrongPassword()
  @ApiProperty({ type: String, description: 'newPassword' })
  newPassword: string;
}
