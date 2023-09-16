import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { Document, SchemaTypes } from 'mongoose';
import { hashString } from 'src/common/utils';
import { FileUploadService } from 'src/modules/file-upload/file-upload.service';
import { LocalFile } from 'src/modules/file-upload/schemas/local-file.schema';
import { Role } from '../enums';
import { Gender } from './../enums/index';

export type UserDocument = User & Document;

@Schema({ versionKey: false, timestamps: true })
export class User {
  @Expose({ name: '_id' })
  @Transform(value => value.obj._id.toString())
  id?: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ default: null })
  lastName?: string;

  @Prop({
    unique: true,
    required: true,
  })
  email: string;

  @Prop({ default: null })
  @Exclude()
  password?: string;

  @Prop({ enum: Role, required: true, default: Role.Student })
  role: Role;

  @Prop({ type: SchemaTypes.ObjectId, ref: LocalFile.name })
  @Type(() => LocalFile)
  avatar?: string;

  @Prop({ enum: Gender, default: Gender.Male })
  gender?: string;

  @Prop({ default: null })
  phone?: string;

  @Prop({ default: null })
  about?: string;

  @Prop({ default: 'Vietnam' })
  country?: string;

  @Prop({ default: null })
  @Exclude()
  refreshToken?: string;

  @Prop({ default: null })
  @Exclude()
  resetPasswordCode?: string;

  validatePassword?: (password: string) => Promise<boolean>;
  validateRefreshToken?: (refreshToken: string) => Promise<boolean>;
  preSave?: (fileUploadService: FileUploadService) => Promise<void>;
  preUpdate?: () => Promise<void>;
}
export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.validatePassword = async function (
  password: string,
): Promise<boolean> {
  return this.password && (await bcrypt.compare(password, this.password));
};

UserSchema.methods.validateRefreshToken = async function (
  refreshToken: string,
): Promise<boolean> {
  return (
    this.refreshToken &&
    (await bcrypt.compare(refreshToken.slice(-25), this.refreshToken))
  );
};

/* Hooks */
UserSchema.methods.preSave = async function (
  fileUploadService: FileUploadService,
) {
  if (this.password) {
    this.password = await hashString(this.password);
  }

  if (!this.avatar) {
    this.avatar = (
      await fileUploadService.getDefaultAvatar(this.id, this.email)
    ).id;
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
