import { Injectable, BadRequestException } from '@nestjs/common';
import { MultipleChoiceService } from './multiple-choice/multiple-choice.service';
import { ExerciseContentService } from './base-exercise-content.service';
import { ExerciseType } from 'src/common/enums';

@Injectable()
export class ExerciseContentServiceFactory {
  constructor(private readonly multipleChoiceService: MultipleChoiceService) {}

  createService(type: ExerciseType): ExerciseContentService {
    switch (type) {
      case ExerciseType.MultipleChoice:
        return this.multipleChoiceService;
      default:
        throw new BadRequestException('Exercise type not found');
    }
  }
}
