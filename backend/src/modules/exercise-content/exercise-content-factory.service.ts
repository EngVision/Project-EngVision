import { FillBlankService } from './fill-blank/fill-blank.service';
import { Injectable, BadRequestException } from '@nestjs/common';
import { MultipleChoiceService } from './multiple-choice/multiple-choice.service';
import { ExerciseContentService } from './base-exercise-content.service';
import { ExerciseType } from 'src/common/enums';

@Injectable()
export class ExerciseContentServiceFactory {
  constructor(
    private readonly multipleChoiceService: MultipleChoiceService,
    private readonly fillBlankService: FillBlankService,
  ) {}

  createService(type: ExerciseType): ExerciseContentService {
    switch (type) {
      case ExerciseType.MultipleChoice:
        return this.multipleChoiceService;
      case ExerciseType.FillBlank:
        return this.fillBlankService;
      default:
        throw new BadRequestException('Exercise type not found');
    }
  }
}
