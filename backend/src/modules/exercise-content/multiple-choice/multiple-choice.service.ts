import { BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ExerciseContentService } from '../base-exercise-content.service';
import { CreateMultipleChoiceDto } from './dto/create-multiple-choice.dto';
import { MultipleChoice } from './schemas/multiple-choice.schema';
import { QuestionResult } from 'src/modules/submissions/schemas/submission.schema';
import { ExerciseQuestionDto } from '../dto/exercise-content.dto';

export class MultipleChoiceService extends ExerciseContentService {
  constructor(
    @InjectModel(MultipleChoice.name)
    private multipleChoiceModel: Model<MultipleChoice>,
  ) {
    super();
  }

  async getContent(id: string): Promise<ExerciseQuestionDto> {
    const question = await this.multipleChoiceModel.findById(id);

    return question;
  }

  async createContent(
    createQuestionListDto: CreateMultipleChoiceDto[],
  ): Promise<string[]> {
    const validatedContent = await this.validate(
      createQuestionListDto,
      CreateMultipleChoiceDto,
    );

    this.setDefaultExplain(validatedContent);
    this.setIsMultipleCorrectAnswer(validatedContent);

    const questionList =
      await this.multipleChoiceModel.insertMany(validatedContent);

    return questionList.map(q => q.id);
  }

  async updateContent(
    updateQuestionListDto: CreateMultipleChoiceDto[],
    removedQuestions: string[],
  ): Promise<string[]> {
    const validatedContent = await this.validate(
      updateQuestionListDto,
      CreateMultipleChoiceDto,
    );

    this.setDefaultExplain(validatedContent);
    this.setIsMultipleCorrectAnswer(validatedContent);

    const bulkOps = this.updateBulkOps(validatedContent, removedQuestions);

    const res = await this.multipleChoiceModel.bulkWrite(bulkOps);

    return [
      ...validatedContent.map(({ id }) => id).filter(id => !!id),
      ...Object.values(res.insertedIds).map(id => id.toString()),
    ];
  }

  async deleteContent(removedQuestion: string[]): Promise<void> {
    await this.multipleChoiceModel.bulkWrite([
      this.deleteBulkOps(removedQuestion),
    ]);
  }

  async checkAnswer(id: string, answer: number[]): Promise<QuestionResult> {
    if (!Array.isArray(answer) || typeof answer[0] !== 'number') {
      throw new BadRequestException('answer must be a number array');
    }

    const { detail, explanation } = (
      await this.multipleChoiceModel.findById(id).select('correctAnswer')
    ).correctAnswer;

    answer.sort();
    detail.sort();

    const isCorrect = answer.join() === detail.join();

    return {
      question: id,
      isCorrect,
      answer,
      correctAnswer: detail,
      explanation,
    };
  }

  setDefaultExplain(questionList: MultipleChoice[]) {
    questionList.forEach(q => {
      if (!q.correctAnswer.explanation) {
        const correctAnswerString = q.question.answers
          .filter(answer => q.correctAnswer.detail.includes(answer.id))
          .map(correctAnswer => correctAnswer.text)
          .join(', ');

        q.correctAnswer.explanation = `Correct answer: ${correctAnswerString}`;
      }
    });
  }

  setIsMultipleCorrectAnswer(questionList: MultipleChoice[]) {
    questionList.forEach(q => {
      if (q.correctAnswer.detail.length > 1) {
        q.question.multipleCorrectAnswers = true;
      }
    });
  }
}
