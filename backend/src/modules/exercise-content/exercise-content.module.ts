import { Module } from '@nestjs/common';
import { ConstructedResponseModule } from './constructed-response/constructed-response.module';
import { ExerciseContentServiceFactory } from './exercise-content-factory.service';
import { FillBlankModule } from './fill-blank/fill-blank.module';
import { MultipleChoiceModule } from './multiple-choice/multiple-choice.module';

@Module({
  imports: [MultipleChoiceModule, FillBlankModule, ConstructedResponseModule],
  providers: [ExerciseContentServiceFactory],
  exports: [ExerciseContentServiceFactory],
})
export class ExerciseContentModule {}
