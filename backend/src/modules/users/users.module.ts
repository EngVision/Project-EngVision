import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FilesModule } from '../files/files.module';
import { User, UserSchema } from './schemas/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ChecklistModule } from '../checklist/checklist.module';
import { PersonalizedCourseModule } from '../personalized-course/personalized-course.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: async () => {
          const schema = UserSchema;

          // Call hook
          schema.pre('save', async function () {
            await this.preSave();
          });
          schema.pre('findOneAndUpdate', async function () {
            await schema.methods['preUpdate'](this.getUpdate());
          });

          return schema;
        },
      },
    ]),
    FilesModule,
    ChecklistModule,
    forwardRef(() => PersonalizedCourseModule),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
