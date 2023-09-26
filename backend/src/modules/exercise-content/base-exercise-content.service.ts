import { ValidationPipe } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Validator } from 'class-validator';
import { QuestionResult } from '../assignment/schemas/assignment.schema';
import { ExerciseQuestionDto } from './dto/exercise-content.dto';

export abstract class ExerciseContentService {
  async validate(
    questionList: ExerciseQuestionDto[],
    dataType: any,
  ): Promise<ExerciseQuestionDto[]> {
    const validator = new Validator();

    const dataList: any = plainToInstance(dataType, questionList);

    const errorlist = (
      await Promise.all(
        dataList.map(data => validator.validate(data, { whitelist: true })),
      )
    ).reduce((prev, errors) => [...prev, ...errors], []);

    if (errorlist.length !== 0) {
      const validatePipe = new ValidationPipe().createExceptionFactory();
      throw validatePipe(errorlist);
    }

    return questionList;
  }

  abstract createContent(
    questionListDto: ExerciseQuestionDto[],
  ): Promise<string[]>;

  abstract checkAnswer(id: string, answer: any): Promise<QuestionResult>;
}
