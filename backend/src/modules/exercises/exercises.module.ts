import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExerciseContentModule } from '../exercise-content/exercise-content.module';
import { SubmissionsModule } from '../submissions/submissions.module';
import { ExercisesController } from './exercises.controller';
import { ExercisesService } from './exercises.service';
import { Exercise, ExerciseSchema } from './schemas/exercise.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Exercise.name, schema: ExerciseSchema },
    ]),
    ExerciseContentModule,
    SubmissionsModule,
  ],
  controllers: [ExercisesController],
  providers: [ExercisesService],
  exports: [ExercisesService],
})
export class ExercisesModule {}
