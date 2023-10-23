import { ValidationPipe } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Validator } from 'class-validator';
import { ExerciseQuestionDto } from './dto/exercise-content.dto';
import { Types } from 'mongoose';
import { QuestionResult } from '../submissions/schemas/submission.schema';

export abstract class ExerciseContentService {
  protected async validate(
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

  protected updateBulkOps(updateValue: any[], removedQuestions: string[]): any {
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

    bulkOps.push(this.deleteBulkOps(removedQuestions));

    return bulkOps;
  }

  protected deleteBulkOps(removedQuestions: string[]): any {
    return {
      deleteMany: {
        filter: {
          _id: { $in: removedQuestions.map(id => new Types.ObjectId(id)) },
        },
      },
    };
  }

  abstract createContent(
    questionListDto: ExerciseQuestionDto[],
  ): Promise<string[]>;

  abstract updateContent(
    questionListDto: ExerciseQuestionDto[],
    removedQuestion: string[],
  ): Promise<string[]>;

  abstract deleteContent(removedQuestion: string[]): Promise<void>;

  abstract checkAnswer(id: string, answer: any): Promise<QuestionResult>;

  abstract setDefaultExplain(questionList: ExerciseQuestionDto[]): void;
}
