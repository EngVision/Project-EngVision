import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExercisesModule } from '../exercises/exercises.module';
import { FilesModule } from '../files/files.module';
import { ReviewsModule } from '../reviews/reviews.module';
import { SubmissionsModule } from '../submissions/submissions.module';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { Course, CourseSchema } from './schemas/course.schema';
import { UserLevelService } from '../user-level/user-level.service';
import { UserLevelModule } from '../user-level/user-level.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
    forwardRef(() => ReviewsModule),
    FilesModule,
    ExercisesModule,
    SubmissionsModule,
    UserLevelModule,
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [CoursesService],
})
export class CoursesModule {}
