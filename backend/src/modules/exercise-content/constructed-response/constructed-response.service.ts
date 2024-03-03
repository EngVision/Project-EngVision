import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QuestionResult } from 'src/modules/submissions/schemas/submission.schema';
import { ExerciseContentService } from '../base-exercise-content.service';
import { ExerciseQuestionDto } from '../dto/exercise-content.dto';
import { CreateConstructedResponseDto } from './dto/create-constructed-response.dto';
import { ConstructedResponse } from './schemas/constructed-response.schema';
import { OpenAiService } from 'src/modules/open-ai/open-ai.service';
import { SubmissionsService } from 'src/modules/submissions/submissions.service';

@Injectable()
export class ConstructedResponseService extends ExerciseContentService {
  constructor(
    @InjectModel(ConstructedResponse.name)
    private constructedResponseModel: Model<ConstructedResponse>,
    private readonly openAiService: OpenAiService,
  ) {
    super();
  }

  async getContent(id: string): Promise<ExerciseQuestionDto> {
    const question = await this.constructedResponseModel.findById(id);

    return question;
  }

  async createContent(
    createQuestionListDto: CreateConstructedResponseDto[],
  ): Promise<string[]> {
    const validatedContent = await this.validate(
      createQuestionListDto,
      CreateConstructedResponseDto,
    );

    const questionList =
      await this.constructedResponseModel.insertMany(validatedContent);

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

    const exercise = await this.constructedResponseModel.findById(id);
    const correctAnswer = exercise.correctAnswer;
    let { detail, explanation } = correctAnswer;

    // if (!detail) {
    //   explanation = await this.openAiService.chat(
    //     `Evaluate skill Grammar, Vocabulary, Organization, Coherence, Conciseness the writing with topic '${exercise.question.text}': '${answer}'`,
    //   );
    // }

    const submission = {
      question: id,
      answer,
      teacherCorrection: answer,
      correctAnswer: detail,
      explanation,
    };
    const isCorrect = detail
      ? answer.toLowerCase() === detail.toLowerCase()
      : null;

    return {
      ...submission,
      isCorrect,
    };
  }

  setDefaultExplain(questionList: ExerciseQuestionDto[]): void {
    questionList.forEach(q => {
      q.correctAnswer.explanation = q.correctAnswer.detail
        ? `Correct answer: ${q.correctAnswer.detail}`
        : null;
    });
  }
}
