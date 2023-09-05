import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Role } from '../enums';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'first_name' })
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'last_name' })
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ type: String, description: 'email' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(16)
  @ApiProperty({ type: String, description: 'password' })
  password: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: String, description: 'avatar' })
  avatar?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: String, description: 'gender' })
  gender?: string;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  @ApiProperty({ type: String, description: 'phone' })
  phone?: string;

  @IsOptional()
  @IsDate()
  @ApiProperty({ type: Date, description: 'DOB' })
  DOB?: Date;

  @IsEnum(Role)
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'role' })
  role: string;

  @IsOptional()
  @IsBoolean()
  isRegisteredWithGoogle?: boolean;
}
