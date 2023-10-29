import { OmitType, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['password']),
) {
  @IsOptional()
  @IsString()
  refreshToken?: string;
}
