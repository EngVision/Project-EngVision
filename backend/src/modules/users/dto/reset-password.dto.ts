import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ResetPasswordDto {
  @IsString()
  @ApiProperty({ type: String, description: 'randomString' })
  randomString: string;

  @IsString()
  @ApiProperty({ type: String, description: 'email' })
  email: string;

  @IsString()
  @ApiProperty({ type: String, description: 'newPassword' })
  newPassword: string;
}
