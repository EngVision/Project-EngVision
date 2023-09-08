import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ResetPasswordDto {
  @IsString()
  @ApiProperty({ type: String, description: 'reset password code' })
  resetPasswordCode: string;

  @IsString()
  @ApiProperty({ type: String, description: 'newPassword' })
  newPassword: string;
}
