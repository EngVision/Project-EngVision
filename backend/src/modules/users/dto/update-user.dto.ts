import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['password']),
) {
  @IsOptional()
  @IsString()
  @ApiProperty({ type: String, description: 'Bank name' })
  bankName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: String, description: 'Bank account number' })
  bankNumber?: string;
}
