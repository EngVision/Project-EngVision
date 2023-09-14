import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class ResetPasswordCodeDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'reset password code' })
  resetPasswordCode: string;
}

export class ResetPasswordDto extends ResetPasswordCodeDto {
  @IsStrongPassword()
  @ApiProperty({ type: String, description: 'newPassword' })
  newPassword: string;
}
