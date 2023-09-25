import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';
import { Gender, Role } from 'src/common/enums';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'First name' })
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'Last name' })
  lastName?: string;

  @IsEmail()
  @ApiProperty({ type: String, description: 'Email' })
  email: string;

  @IsStrongPassword()
  @ApiProperty({ type: String, description: 'Password' })
  password: string;

  @IsOptional()
  @IsMongoId()
  @ApiProperty({ type: String, description: 'image file id' })
  avatar?: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  @ApiProperty({ type: String, description: 'certificates file id' })
  certificates?: string;

  @IsEnum(Gender)
  @IsString()
  @ApiProperty({ enum: Gender, description: 'Gender' })
  gender: string;

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
