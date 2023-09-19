import { Module } from '@nestjs/common';
import { ExerciseContentServiceFactory } from './exercise-content-factory.service';
import { MultipleChoiceModule } from './multiple-choice/multiple-choice.module';

@Module({
  imports: [MultipleChoiceModule],
  providers: [ExerciseContentServiceFactory],
  exports: [ExerciseContentServiceFactory],
})
export class ExerciseContentModule {}
