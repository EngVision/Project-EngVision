import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import { Types } from 'mongoose';
import { Role } from 'src/common/enums';

export class UserDto {
  @Expose({ name: '_id' })
  @Transform(value => value.obj._id.toString())
  @ApiProperty({ type: String, description: 'User id' })
  id?: string;

  @ApiProperty({ type: String, description: 'First name' })
  firstName: string;

  @ApiProperty({ type: String, description: 'Last name' })
  lastName?: string;

  @ApiProperty({ type: String, description: 'Email' })
  email: string;

  @ApiProperty({ type: String, description: 'Role' })
  role: Role;

  @ApiProperty({ type: () => Types.ObjectId, description: 'Avatar' })
  @Transform(value => value.obj.avatar.toString())
  avatar?: string;

  @ApiProperty({ type: String, description: 'Gender' })
  gender?: string;

  @ApiProperty({ type: String, description: 'Phone number' })
  phone?: string;

  @ApiProperty({ type: String, description: 'About' })
  about?: string;

  @ApiProperty({ type: String, description: 'Country' })
  country?: string;

  @ApiProperty({ type: String, description: 'Is first login' })
  firstLogin?: boolean;

  @Exclude()
  password?: string;

  @Exclude()
  refreshToken?: string;

  @Exclude()
  resetPasswordCode?: string;
}
