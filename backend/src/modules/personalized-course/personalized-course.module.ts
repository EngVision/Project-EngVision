import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Course,
  CourseSchema,
} from 'src/modules/courses/schemas/course.schema';
import { UsersModule } from 'src/modules/users/users.module';
import { FilesModule } from '../files/files.module';
import { PersonalizedCourseController } from './personalized-course.controller';
import { PersonalizedCourseService } from './personalized-course.service';
import { CoursesModule } from '../courses/courses.module';
import { UserLevelModule } from '../user-level/user-level.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
    UsersModule,
    FilesModule,
    CoursesModule,
    UserLevelModule,
  ],
  controllers: [PersonalizedCourseController],
  providers: [PersonalizedCourseService],
})
export class PersonalizedCourseModule {}
