import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QuestionResult } from 'src/modules/assignments/schemas/assignment.schema';
import { ExerciseContentService } from '../base-exercise-content.service';
import { CreateFillBlankDto } from './dto/create-fill-blank.dto';
import { FillBlank } from './schemas/fill-blank.schema';
import { ExerciseQuestionDto } from '../dto/exercise-content.dto';

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
      throw new BadRequestException(
        `question.text, correctAnswer.detail: Number of answer must match with number of blank`,
      );
    }

    this.transformAnswerList(validatedContent);
    this.setDefaultExplain(validatedContent);

    const questionList = await this.fillBlankModel.insertMany(validatedContent);

    return questionList.map(q => q.id);
  }

  updateContent(
    questionListDto: ExerciseQuestionDto[],
    removedQuestions: string[],
  ): Promise<string[]> {
    throw new Error('Method not implemented.');
  }

  async deleteContent(removedQuestion: string[]): Promise<void> {
    await this.fillBlankModel.bulkWrite([this.deleteBulkOps(removedQuestion)]);
  }

  async checkAnswer(id: string, answer: string): Promise<QuestionResult> {
    if (typeof answer !== 'string') {
      throw new BadRequestException('Answer must be a string');
    }

    const {
      question,
      correctAnswer: { detail, explanation },
    } = await this.fillBlankModel.findById(id);

    if (!this.isValidQuestion(question.text, answer)) {
      throw new BadRequestException(
        'Number of answer must match with number of blank',
      );
    }

    const transformAnswer = this.transformAnswer(question.text, answer);

    const isCorrect = detail.toLowerCase() === transformAnswer.toLowerCase();

    return {
      question: id,
      isCorrect,
      answer: transformAnswer,
      correctAnswer: detail,
      explanation,
    };
  }

  isValidQuestionList(questionList: FillBlank[]): boolean {
    return questionList.every(q =>
      this.isValidQuestion(q.question.text, q.correctAnswer.detail),
    );
  }

  isValidQuestion(question: string, answer: string): boolean {
    const count = (question.match(/\[]/g) || []).length;

    if (count === answer.split('/').length) {
      return true; // return true if question text number of '[]' is match with number of correct answer
    }

    return false; // return false if question text does not contain '[]' or not valid
  }

  transformAnswerList(questionList: FillBlank[]): void {
    questionList.forEach(q => {
      q.correctAnswer.detail = this.transformAnswer(
        q.question.text,
        q.correctAnswer.detail,
      );
    });
  }

  transformAnswer(question: string, answer: string): string {
    const answerSplitted = answer.split('/').map(s => s.trim());

    return question
      .split('[]')
      .reduce(
        (prev, s, i) =>
          `${prev}${s}${
            answerSplitted[i] ? '<b>' + answerSplitted[i] + '</b>' : ''
          }`,
        '',
      );
  }

  setDefaultExplain(questionList: FillBlank[]): void {
    questionList.forEach(q => {
      q.correctAnswer.explanation = `Correct answer: ${q.correctAnswer.detail}`;
    });
  }
}
