import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { FileUploadModule } from '../file-upload/file-upload.module';
import { FileUploadService } from '../file-upload/file-upload.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        imports: [FileUploadModule],
        inject: [FileUploadService],
        name: User.name,
        useFactory: async (fileUploadService: FileUploadService) => {
          const schema = UserSchema;

          // Call hook
          schema.pre('save', async function () {
            await this.preSave(fileUploadService);
          });
          schema.pre('findOneAndUpdate', async function () {
            await schema.methods['preUpdate'](this.getUpdate());
          });

          return schema;
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
