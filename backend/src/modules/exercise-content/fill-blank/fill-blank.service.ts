import { BadRequestException, Injectable } from '@nestjs/common';
import { Document, Model } from 'mongoose';
import { ExerciseContentService } from '../base-exercise-content.service';
import { CreateFillBlankDto } from './dto/create-fill-blank.dto';
import { InjectModel } from '@nestjs/mongoose';
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
    createContentDto: CreateFillBlankDto,
  ): Promise<Document<any, any, any>> {
    const validatedContent = await this.validate(
      createContentDto,
      CreateFillBlankDto,
    );

    if (!this.isValidQuestion(validatedContent.question.text)) {
      throw new BadRequestException(`question.text should contain one '[[]]'`);
    }

    const content = new this.fillBlankModel(validatedContent);
    await content.save();

    return content;
  }

  async checkAnswer(id: string, answer: string): Promise<boolean> {
    const exercise = await this.fillBlankModel.findById(id);

    if (exercise.question.isStrict) {
      return exercise.correctAnswer === answer;
    }

    return exercise.correctAnswer.toLowerCase() === answer.toLowerCase();
  }

  isValidQuestion(questionText: string): boolean {
    const check = questionText
      .split(' ')
      .filter(value => value === '[[]]').length;

    if (check === 1) {
      return true; // return true if question text contain one '[[]]'
    }

    return false; // return false if question text does not contain '[[]]' or more than one
  }
}
