import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import { Types } from 'mongoose';

export class UserBriefDto {
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

  @ApiProperty({ type: Types.ObjectId, description: 'Avatar' })
  @Transform(value => value.obj.avatar.toString())
  avatar?: string;

  @ApiProperty({ type: String, description: 'Gender' })
  gender?: string;

  @Exclude()
  phone?: string;

  @Exclude()
  about?: string;

  @Exclude()
  country?: string;

  @Exclude()
  password?: string;

  @Exclude()
  refreshToken?: string;

  @Exclude()
  isSSO?: boolean;

  @Exclude()
  resetPasswordCode?: string;
}
