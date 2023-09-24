import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ExerciseContentService } from '../base-exercise-content.service';
import { CreateFillBlankDto } from './dto/create-fill-blank.dto';
import { FillBlank } from './schemas/fill-blank.schema';

@Injectable()
export class FillBlankService extends ExerciseContentService {
  constructor(
    @InjectModel(FillBlank.name)
    private fillBlankModel: Model<FillBlank>,
  ) {
    super();
  }

  async createContent(
    createQuestionListDto: CreateFillBlankDto[],
  ): Promise<string[]> {
    const validatedContent = await this.validate(
      createQuestionListDto,
      CreateFillBlankDto,
    );

    if (!this.isValidQuestionList(validatedContent)) {
      throw new BadRequestException(`question.text should contain one '[[]]'`);
    }

    const questionList = await this.fillBlankModel.insertMany(validatedContent);

    return questionList.map(q => q.id);
  }

  async checkAnswer(id: string, answer: string): Promise<boolean> {
    const exercise = await this.fillBlankModel.findById(id);

    return exercise.correctAnswer.toLowerCase() === answer.toLowerCase();
  }

  isValidQuestionList(questionList: FillBlank[]): boolean {
    return questionList.every(q => {
      const check = q.question.text
        .split(' ')
        .filter(value => value === '[[]]').length;

      if (check === 1) {
        return true; // return true if question text contain one '[[]]'
      }

      return false; // return false if question text does not contain '[[]]' or more than one
    });
  }
}
