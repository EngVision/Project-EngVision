import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Course,
  CourseSchema,
} from 'src/modules/courses/schemas/course.schema';
import { UsersModule } from 'src/modules/users/users.module';
import { CoursesModule } from '../courses/courses.module';
import { UserLevelModule } from '../user-level/user-level.module';
import { PersonalizedCourseController } from './personalized-course.controller';
import { PersonalizedCourseService } from './personalized-course.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
    CoursesModule,
    UserLevelModule,
  ],
  controllers: [PersonalizedCourseController],
  providers: [PersonalizedCourseService],
  exports: [PersonalizedCourseService],
})
export class PersonalizedCourseModule {}
