import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QuestionResult } from 'src/modules/assignment/schemas/assignment.schema';
import { ExerciseContentService } from '../base-exercise-content.service';
import { CreateMultipleChoiceDto } from './dto/create-multiple-choice.dto';
import { MultipleChoice } from './schemas/multiple-choice.schema';
import { BadRequestException } from '@nestjs/common';

export class MultipleChoiceService extends ExerciseContentService {
  constructor(
    @InjectModel(MultipleChoice.name)
    private multipleChoiceModel: Model<MultipleChoice>,
  ) {
    super();
  }

  async createContent(
    createQuestionListDto: CreateMultipleChoiceDto[],
  ): Promise<string[]> {
    const validatedContent = await this.validate(
      createQuestionListDto,
      CreateMultipleChoiceDto,
    );

    const questionList = await this.multipleChoiceModel.insertMany(
      validatedContent,
    );

    return questionList.map(q => q.id);
  }

  async checkAnswer(id: string, answer: number[]): Promise<QuestionResult> {
    if (Array.isArray(answer) && typeof answer[0] !== 'number') {
      throw new BadRequestException('answer must be a number array');
    }

    const { detail, explain } = (
      await this.multipleChoiceModel.findById(id).select('correctAnswer')
    ).correctAnswer;

    answer.sort();
    detail.sort();

    const isCorrect = answer.join() === detail.join();

    return { question: id, isCorrect, correctAnswer: detail, explain };
  }
}
