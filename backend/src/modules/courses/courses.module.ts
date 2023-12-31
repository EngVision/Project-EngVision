import { Module, forwardRef } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from './schemas/course.schema';
import { ReviewsModule } from '../reviews/reviews.module';
import { FilesModule } from '../files/files.module';
import { ExercisesModule } from '../exercises/exercises.module';
import { SubmissionsModule } from '../submissions/submissions.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
    forwardRef(() => ReviewsModule),
    FilesModule,
    ExercisesModule,
    SubmissionsModule,
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [CoursesService],
})
export class CoursesModule {}
