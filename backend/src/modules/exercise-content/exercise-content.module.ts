import { Module } from '@nestjs/common';
import { ConstructedResponseModule } from './constructed-response/constructed-response.module';
import { ExerciseContentServiceFactory } from './exercise-content-factory.service';
import { FillBlankModule } from './fill-blank/fill-blank.module';
import { MultipleChoiceModule } from './multiple-choice/multiple-choice.module';
import { MakeSentenceModule } from './make-sentence/make-sentence.module';
import { UnscrambleModule } from './unscramble/unscramble.module';

@Module({
  imports: [
    MultipleChoiceModule,
    FillBlankModule,
    ConstructedResponseModule,
    MakeSentenceModule,
    UnscrambleModule,
  ],
  providers: [ExerciseContentServiceFactory],
  exports: [ExerciseContentServiceFactory],
})
export class ExerciseContentModule {}
