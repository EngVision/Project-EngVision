import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Document, SchemaTypes } from 'mongoose';
import { Gender, Role, AccountStatus } from 'src/common/enums';
import { hashString } from 'src/common/utils';
import { LocalFile } from 'src/modules/files/schemas/local-file.schema';

export type UserDocument = User & Document;

@Schema({ versionKey: false, timestamps: true })
export class User {
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
  password?: string;

  @Prop({ enum: Role, required: true, default: Role.Student })
  role?: Role;

  @Prop({ type: SchemaTypes.ObjectId, ref: LocalFile.name })
  avatar?: string;

  @Prop({ type: [SchemaTypes.ObjectId], ref: LocalFile.name, default: [] })
  certificates?: string[];

  @Prop({ enum: Gender, default: null })
  gender?: string;

  @Prop({ default: null })
  phone?: string;

  @Prop({ default: null })
  resetPasswordCode?: string;

  @Prop({ default: AccountStatus.Active, enum: AccountStatus })
  status?: AccountStatus;

  @Prop({ default: true })
  showGetStarted?: boolean;

  @Prop({ default: true })
  showGuideTour?: boolean;

  @Prop({ default: false })
  chatRegistered?: boolean;

  validatePassword?: (password: string) => Promise<boolean>;
  validateRefreshToken?: (refreshToken: string) => Promise<boolean>;
  preSave?: () => Promise<void>;
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
UserSchema.methods.preSave = async function () {
  if (this.password) {
    this.password = await hashString(this.password);
  }
};

UserSchema.methods.preUpdate = async function (updatedUser: User) {
  if (updatedUser?.password) {
    updatedUser.password = await hashString(updatedUser.password);
  }
};
