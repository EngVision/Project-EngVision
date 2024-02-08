import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from '../courses/schemas/course.schema';
import { ExerciseContentModule } from '../exercise-content/exercise-content.module';
import { ExercisesModule } from '../exercises/exercises.module';
import { LessonsController } from './lessons.controller';
import { LessonsService } from './lessons.service';
import { CoursesModule } from '../courses/courses.module';
import { Exercise, ExerciseSchema } from '../exercises/schemas/exercise.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
    MongooseModule.forFeature([
      { name: Exercise.name, schema: ExerciseSchema },
    ]),
    CoursesModule,
    ExercisesModule,
    ExerciseContentModule,
  ],
  controllers: [LessonsController],
  providers: [LessonsService],
})
export class LessonsModule {}
