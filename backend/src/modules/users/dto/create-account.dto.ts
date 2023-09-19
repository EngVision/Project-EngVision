import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';
import { Gender, Role } from 'src/common/enums';

export class CreateAccountDto {
  @IsStrongPassword()
  @ApiProperty({ type: String, description: 'Password' })
  password: string;

  @IsOptional()
  @IsMongoId()
  @ApiProperty({ type: String, description: 'Avatar file id' })
  avatar?: string;

  @IsEnum(Gender)
  @IsOptional()
  @IsString()
  @ApiProperty({ enum: Gender, description: 'Gender' })
  gender?: string;

  @IsOptional()
  @IsString()
  @Length(10)
  @ApiProperty({ type: String, description: 'Phone' })
  phone?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: String, description: 'About' })
  about?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: String, description: 'Country' })
  country?: string;

  @IsEnum(Role)
  @IsNotEmpty()
  @ApiProperty({ enum: Role, description: 'Role' })
  role: string;
}
