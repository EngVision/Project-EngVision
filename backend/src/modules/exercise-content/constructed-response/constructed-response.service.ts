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
  checkAnswer(id: string, answer: any): Promise<QuestionResult> {
    throw new Error('Method not implemented.');
  }
  setDefaultExplain(questionList: ExerciseQuestionDto[]): void {
    throw new Error('Method not implemented.');
  }
}
