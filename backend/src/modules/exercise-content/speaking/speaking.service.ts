import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { QuestionResult } from 'src/modules/submissions/schemas/submission.schema';
import { ExerciseContentService } from '../base-exercise-content.service';
import { ExerciseQuestionDto } from '../dto/exercise-content.dto';
import { CreateSpeakingDto } from './dto/create-speaking.dto';
import { Speaking } from './schemas/speaking.schema';

@Injectable()
export class SpeakingService extends ExerciseContentService {
  constructor(
    @InjectModel(Speaking.name)
    private speakingModel: Model<Speaking>,
  ) {
    super();
  }

  async getContent(id: string): Promise<ExerciseQuestionDto> {
    const question = await this.speakingModel.findById(id);

    return question;
  }

  async createContent(
    questionListDto: ExerciseQuestionDto[],
  ): Promise<string[]> {
    const validatedContent = await this.validate(
      questionListDto,
      CreateSpeakingDto,
    );

    const questionList = await this.speakingModel.insertMany(validatedContent);

    return questionList.map(q => q.id);
  }

  async updateContent(
    questionListDto: ExerciseQuestionDto[],
    removedQuestions: string[],
  ): Promise<string[]> {
    const validatedContent = await this.validate(
      questionListDto,
      CreateSpeakingDto,
    );

    this.setDefaultExplain(validatedContent);

    const bulkOps = this.updateBulkOps(validatedContent, removedQuestions);

    const res = await this.speakingModel.bulkWrite(bulkOps);

    return [
      ...validatedContent.map(({ id }) => id).filter(id => !!id),
      ...Object.values(res.insertedIds).map(id => id.toString()),
    ];
  }

  async deleteContent(removedQuestion: string[]): Promise<void> {
    await this.speakingModel.bulkWrite([this.deleteBulkOps(removedQuestion)]);
  }

  async checkAnswer(id: string, answer: string): Promise<QuestionResult> {
    if (!mongoose.isValidObjectId(answer)) {
      throw new BadRequestException('answer must be a uploaded file id');
    }

    //speech to text
    const answerText = '';

    const correctAnswer = (
      await this.speakingModel.findById(id).select('correctAnswer')
    ).correctAnswer;
    const { detail, explanation } = correctAnswer;
    const submission = {
      question: id,
      answer,
      correctAnswer: detail,
      explanation,
    };
    const isCorrect = detail
      ? answerText.toLowerCase() === detail.toLowerCase()
      : null;

    return {
      ...submission,
      isCorrect,
    };
  }

  setDefaultExplain(questionList: ExerciseQuestionDto[]): void {
    questionList.forEach(q => {
      q.correctAnswer.explanation = `Correct answer: ${q.correctAnswer.detail}`;
    });
  }
}
