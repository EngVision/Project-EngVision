import { Injectable } from '@nestjs/common';
import { ExerciseContentService } from '../base-exercise-content.service';
import { QuestionResult } from 'src/modules/assignments/schemas/assignment.schema';
import { ExerciseQuestionDto } from '../dto/exercise-content.dto';
import { CreateConstructedResponseDto } from './dto/create-constructed-response.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ConstructedResponse } from './schemas/constructed-response.schema';
import { Model } from 'mongoose';

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

  deleteContent(removedQuestion: string[]): Promise<void> {
    throw new Error('Method not implemented.');
  }

  checkAnswer(id: string, answer: any): Promise<QuestionResult> {
    throw new Error('Method not implemented.');
  }
  setDefaultExplain(questionList: ExerciseQuestionDto[]): void {
    throw new Error('Method not implemented.');
  }
}
