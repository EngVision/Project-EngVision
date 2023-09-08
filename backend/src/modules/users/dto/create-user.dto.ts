import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Role } from '../enums';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'First name' })
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'Last name' })
  lastName?: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ type: String, description: 'Email' })
  email: string;

  @MinLength(8)
  @MaxLength(24)
  @IsStrongPassword()
  @ApiProperty({ type: String, description: 'Password' })
  password: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: String, format: 'binary', description: 'Avatar' })
  avatar?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: String, description: 'Gender' })
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

  @IsOptional()
  @IsBoolean()
  isRegisteredWithGoogle?: boolean;
}
