import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'Old password' })
  oldPassword: string;

  @IsStrongPassword()
  @ApiProperty({ type: String, description: 'New password' })
  password: string;
}
