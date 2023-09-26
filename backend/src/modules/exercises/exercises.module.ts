import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExercisesController } from './exercises.controller';
import { ExercisesService } from './exercises.service';
import { Exercise, ExerciseSchema } from './schemas/exercise.schema';
import { ExerciseContentModule } from '../exercise-content/exercise-content.module';
import { AssignmentModule } from '../assignment/assignment.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Exercise.name, schema: ExerciseSchema },
    ]),
    ExerciseContentModule,
    AssignmentModule,
  ],
  controllers: [ExercisesController],
  providers: [ExercisesService],
})
export class ExercisesModule {}
