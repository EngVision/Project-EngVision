import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ValidateResetPasswordPageDto {
  @IsString()
  @ApiProperty({ type: String, description: 'randomString' })
  randomString: string;

  @IsString()
  @ApiProperty({ type: String, description: 'email' })
  email: string;
}
