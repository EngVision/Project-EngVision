import { MakeSentenceService } from './make-sentence/make-sentence.service';
import { UnscrambleService } from './unscramble/unscramble.service';
import { FillBlankService } from './fill-blank/fill-blank.service';
import { Injectable, BadRequestException } from '@nestjs/common';
import { MultipleChoiceService } from './multiple-choice/multiple-choice.service';
import { ExerciseContentService } from './base-exercise-content.service';
import { ExerciseType } from 'src/common/enums';
import { ConstructedResponseService } from './constructed-response/constructed-response.service';

@Injectable()
export class ExerciseContentServiceFactory {
  constructor(
    private readonly multipleChoiceService: MultipleChoiceService,
    private readonly fillBlankService: FillBlankService,
    private readonly constructedResponseService: ConstructedResponseService,
    private readonly MakeSentenceService: MakeSentenceService,
    private readonly UnscrambleService: UnscrambleService,
  ) {}

  createService(type: ExerciseType): ExerciseContentService {
    switch (type) {
      case ExerciseType.MultipleChoice:
        return this.multipleChoiceService;
      case ExerciseType.FillBlank:
        return this.fillBlankService;
      case ExerciseType.ConstructedResponse:
        return this.constructedResponseService;
      case ExerciseType.MakeSentence:
        return this.MakeSentenceService;
      case ExerciseType.Unscramble:
        return this.UnscrambleService;
      default:
        throw new BadRequestException('Exercise type not found');
    }
  }
}
