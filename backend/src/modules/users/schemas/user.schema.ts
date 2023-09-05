import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Exclude, Expose, Transform } from 'class-transformer';
import { Document } from 'mongoose';
import { hashString } from 'src/common/utils';
import { Role } from '../enums';

export type UserDocument = User & Document;

@Schema({ versionKey: false })
export class User {
  @Expose({ name: '_id' })
  @Transform(value => value.obj._id.toString())
  id?: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({
    unique: true,
    required: true,
  })
  email: string;

  @Prop({ default: null })
  @Exclude()
  password?: string;

  @Prop({
    enum: Role,
    required: true,
  })
  role: string;

  @Prop({ required: true })
  avatar: string;

  @Prop({ default: null })
  gender?: string;

  @Prop({ default: null })
  phone?: string;

  @Prop({ default: null })
  DOB?: Date;

  @Prop({ default: null })
  @Exclude()
  refreshToken?: string;

  @Prop({ default: false })
  isSSO?: boolean;

  validatePassword?: (password: string) => Promise<boolean>;
  validateRefreshToken?: (refreshToken: string) => Promise<boolean>;
  preSave?: () => Promise<void>;
  preUpdate?: () => Promise<void>;
}
export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.validatePassword = async function (
  password: string,
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.validateRefreshToken = async function (
  refreshToken: string,
): Promise<boolean> {
  return await bcrypt.compare(refreshToken.slice(-25), this.refreshToken);
};

/* Hooks */
UserSchema.methods.preSave = async function () {
  if (this.password) {
    this.password = await hashString(this.password);
  }
};

UserSchema.methods.preUpdate = async function (updatedUser: User) {
  if (updatedUser?.password) {
    updatedUser.password = await hashString(updatedUser.password);
  }

  if (updatedUser?.refreshToken) {
    updatedUser.refreshToken = await hashString(
      updatedUser.refreshToken.slice(-25),
    );
  }
};
