import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ValidateResetPasswordPageDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'reset password code' })
  resetPasswordCode: string;
}
