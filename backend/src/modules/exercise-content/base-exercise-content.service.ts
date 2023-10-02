import { ValidationPipe } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Validator } from 'class-validator';
import { QuestionResult } from '../assignments/schemas/assignment.schema';
import { ExerciseQuestionDto } from './dto/exercise-content.dto';

export abstract class ExerciseContentService {
  async validate(
    questionList: ExerciseQuestionDto[],
    dataType: any,
  ): Promise<ExerciseQuestionDto[]> {
    const validator = new Validator();

    const dataList: any = plainToInstance(dataType, questionList);

    const errors = (
      await Promise.all(
        dataList.map(data => validator.validate(data, { whitelist: true })),
      )
    ).reduce((prev, errors) => [...prev, ...errors], []);

    if (errors.length !== 0) {
      const validatePipe = new ValidationPipe().createExceptionFactory();
      throw validatePipe(errors);
    }

    return questionList;
  }

  abstract createContent(
    questionListDto: ExerciseQuestionDto[],
  ): Promise<string[]>;

  abstract checkAnswer(id: string, answer: any): Promise<QuestionResult>;

  abstract setDefaultExplain(questionList: ExerciseQuestionDto[]): void;
}
