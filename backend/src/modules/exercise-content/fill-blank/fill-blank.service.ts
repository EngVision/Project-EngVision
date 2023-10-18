import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QuestionResult } from 'src/modules/assignments/schemas/assignment.schema';
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

    this.validateQuestionList(validatedContent);
    const transformedContent = this.transformAnswerList(validatedContent);
    this.setDefaultExplain(transformedContent);

    const questionList = await this.fillBlankModel.insertMany(
      transformedContent,
    );

    return questionList.map(q => q.id);
  }

  async updateContent(
    updateQuestionListDto: CreateFillBlankDto[],
    removedQuestions: string[],
  ): Promise<string[]> {
    const validatedContent = await this.validate(
      updateQuestionListDto,
      CreateFillBlankDto,
    );

    this.validateQuestionList(validatedContent);
    const transformedContent = this.transformAnswerList(validatedContent);
    this.setDefaultExplain(transformedContent);

    const bulkOps = this.updateBulkOps(transformedContent, removedQuestions);

    const res = await this.fillBlankModel.bulkWrite(bulkOps);

    return [
      ...validatedContent.map(({ id }) => id).filter(id => !!id),
      ...Object.values(res.insertedIds).map(id => id.toString()),
    ];
  }

  async deleteContent(removedQuestion: string[]): Promise<void> {
    await this.fillBlankModel.bulkWrite([this.deleteBulkOps(removedQuestion)]);
  }

  async checkAnswer(id: string, answer: string[]): Promise<QuestionResult> {
    if (Array.isArray(answer) && typeof answer[0] !== 'string') {
      throw new BadRequestException('Answer must be not empty string array');
    }

    const {
      question,
      correctAnswer: { detail, explanation },
    } = await this.fillBlankModel.findById(id);

    this.validateQuestion(question.text, this.answerToString(answer));

    const isCorrect =
      this.answerToString(detail) === this.answerToString(answer);

    return {
      question: id,
      isCorrect,
      answer,
      correctAnswer: detail,
      explanation,
    };
  }

  validateQuestionList(questionList: CreateFillBlankDto[]): void {
    questionList.forEach(q =>
      this.validateQuestion(q.question.text, q.correctAnswer.detail),
    );
  }

  validateQuestion(question: string, answer: string): void {
    const count = (question.match(/\[]/g) || []).length;

    if (count !== answer.split(',').length) {
      throw new BadRequestException(
        `question.text, correctAnswer.detail: Number of answer must match with number of blank`,
      ); // return true if question text number of '[]' is match with number of correct answer
    }
  }

  transformAnswerList(questionList: CreateFillBlankDto[]): FillBlank[] {
    const res: FillBlank[] = [];

    questionList.forEach(q => {
      res.push({
        ...q,
        correctAnswer: {
          ...q.correctAnswer,
          detail: this.transformAnswer(q.correctAnswer.detail),
        },
        question: {
          ...q.question,
          limits: q.correctAnswer.detail.split(',').map(s => s.trim().length),
        },
      });
    });

    return res;
  }

  transformAnswer(answer: string): string[] {
    return answer.split(',').map(s => s.trim());
  }

  answerToString(answer: string[]): string {
    return answer
      .map(s => s.trim())
      .join()
      .toLowerCase();
  }

  setDefaultExplain(questionList: FillBlank[]): void {
    questionList.forEach(q => {
      q.correctAnswer.explanation = `Correct answer: ${q.correctAnswer.detail.join(
        ', ',
      )}`;
    });
  }
}
