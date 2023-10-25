import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QuestionResult } from 'src/modules/submissions/schemas/submission.schema';
import { ExerciseContentService } from '../base-exercise-content.service';
import { ExerciseQuestionDto } from '../dto/exercise-content.dto';
import { CreateConstructedResponseDto } from './dto/create-constructed-response.dto';
import { ConstructedResponse } from './schemas/constructed-response.schema';

@Injectable()
export class ConstructedResponseService extends ExerciseContentService {
  constructor(
    @InjectModel(ConstructedResponse.name)
    private constructedResponseModel: Model<ConstructedResponse>,
  ) {
    super();
  }

  async createContent(
    createQuestionListDto: CreateConstructedResponseDto[],
  ): Promise<string[]> {
    const validatedContent = await this.validate(
      createQuestionListDto,
      CreateConstructedResponseDto,
    );

    const questionList = await this.constructedResponseModel.insertMany(
      validatedContent,
    );

    return questionList.map(q => q.id);
  }

  async updateContent(
    updateQuestionListDto: CreateConstructedResponseDto[],
    removedQuestions: string[],
  ): Promise<string[]> {
    const validatedContent = await this.validate(
      updateQuestionListDto,
      CreateConstructedResponseDto,
    );

    this.setDefaultExplain(validatedContent);

    const bulkOps = this.updateBulkOps(validatedContent, removedQuestions);

    const res = await this.constructedResponseModel.bulkWrite(bulkOps);

    return [
      ...validatedContent.map(({ id }) => id).filter(id => !!id),
      ...Object.values(res.insertedIds).map(id => id.toString()),
    ];
  }

  async deleteContent(removedQuestion: string[]): Promise<void> {
    await this.constructedResponseModel.bulkWrite([
      this.deleteBulkOps(removedQuestion),
    ]);
  }

  async checkAnswer(id: string, answer: string): Promise<QuestionResult> {
    if (typeof answer !== 'string') {
      throw new BadRequestException('answer must be a string');
    }

    const { detail, explanation } = (
      await this.constructedResponseModel.findById(id).select('correctAnswer')
    ).correctAnswer;

    const submission = {
      question: id,
      answer,
      correctAnswer: detail,
      explanation,
    };

    if (!detail) {
      return submission;
    }

    const isCorrect = answer.toLowerCase() === detail.toLowerCase();

    return {
      ...submission,
      isCorrect,
    };
  }
  setDefaultExplain(questionList: ExerciseQuestionDto[]): void {
    // throw new Error('Method not implemented.');
  }
}
