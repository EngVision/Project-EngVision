import { Module } from '@nestjs/common';
import { ExerciseContentServiceFactory } from './exercise-content-factory.service';
import { MultipleChoiceModule } from './multiple-choice/multiple-choice.module';
import { FillBlankModule } from './fill-blank/fill-blank.module';

@Module({
  imports: [MultipleChoiceModule, FillBlankModule],
  providers: [ExerciseContentServiceFactory],
  exports: [ExerciseContentServiceFactory],
})
export class ExerciseContentModule {}
