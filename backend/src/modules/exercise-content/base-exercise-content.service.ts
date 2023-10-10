import { ValidationPipe } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Validator } from 'class-validator';
import { QuestionResult } from '../assignments/schemas/assignment.schema';
import { ExerciseQuestionDto } from './dto/exercise-content.dto';
import { Types } from 'mongoose';

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

  getUpdateBulkOps(updateValue: any[], removedQuestions: string[]): any {
    const bulkOps: any[] = updateValue.map(({ id, ...value }) => {
      if (id) {
        return {
          updateOne: {
            filter: {
              _id: new Types.ObjectId(id),
            },
            update: { $set: value },
          },
        };
      } else {
        return { insertOne: { document: value } };
      }
    });

    bulkOps.push({
      deleteMany: {
        filter: {
          _id: { $in: removedQuestions.map(id => new Types.ObjectId(id)) },
        },
      },
    });

    return bulkOps;
  }

  abstract createContent(
    questionListDto: ExerciseQuestionDto[],
  ): Promise<string[]>;

  abstract updateContent(
    questionListDto: ExerciseQuestionDto[],
    removedQuestion: string[],
  ): Promise<string[]>;

  abstract checkAnswer(id: string, answer: any): Promise<QuestionResult>;

  abstract setDefaultExplain(questionList: ExerciseQuestionDto[]): void;
}
