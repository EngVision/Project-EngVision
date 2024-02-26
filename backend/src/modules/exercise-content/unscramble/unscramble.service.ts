import { BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ExerciseContentService } from '../base-exercise-content.service';
import { QuestionResult } from 'src/modules/submissions/schemas/submission.schema';
import { Unscramble } from './schemas/unscramble.schema';
import { CreateUnscrambleDto } from './dto/create-unscramble.dto';
import { shuffleArray } from 'src/common/utils';
import { ExerciseQuestionDto } from '../dto/exercise-content.dto';

export class UnscrambleService extends ExerciseContentService {
  constructor(
    @InjectModel(Unscramble.name)
    private UnscrambleModel: Model<Unscramble>,
  ) {
    super();
  }

  async getContent(id: string): Promise<ExerciseQuestionDto> {
    const question = await this.UnscrambleModel.findById(id);

    return question;
  }

  async createContent(
    createQuestionListDto: CreateUnscrambleDto[],
  ): Promise<string[]> {
    const validatedContent = await this.validate(
      createQuestionListDto,
      CreateUnscrambleDto,
    );

    const transformedContent = this.transformContent(validatedContent);

    this.setDefaultExplain(transformedContent);

    const questionList = await this.UnscrambleModel.insertMany(
      transformedContent,
    );

    return questionList.map(q => q.id);
  }

  async updateContent(
    updateQuestionListDto: CreateUnscrambleDto[],
    removedQuestions: string[],
  ): Promise<string[]> {
    const validatedContent = await this.validate(
      updateQuestionListDto,
      CreateUnscrambleDto,
    );

    const transformedContent = this.transformContent(validatedContent);

    this.setDefaultExplain(transformedContent);

    const bulkOps = this.updateBulkOps(transformedContent, removedQuestions);

    const res = await this.UnscrambleModel.bulkWrite(bulkOps);

    return [
      ...validatedContent.map(({ id }) => id).filter(id => !!id),
      ...Object.values(res.insertedIds).map(id => id.toString()),
    ];
  }

  async deleteContent(removedQuestion: string[]): Promise<void> {
    await this.UnscrambleModel.bulkWrite([this.deleteBulkOps(removedQuestion)]);
  }

  async checkAnswer(id: string, answer: string[]): Promise<QuestionResult> {
    const {
      correctAnswer: { detail, explanation },
    } = await this.UnscrambleModel.findById(id);

    return {
      question: id,
      isCorrect: detail.join() === answer.join(),
      answer,
      correctAnswer: detail,
      explanation,
    };
  }

  transformContent(questionList: CreateUnscrambleDto[]): Unscramble[] {
    const res: Unscramble[] = [];

    questionList.forEach(q => {
      const detail = [...q.question.items];
      shuffleArray(q.question.items);

      res.push({
        ...q,
        correctAnswer: {
          ...q.correctAnswer,
          detail: detail,
        },
        question: {
          ...q.question,
        },
      });
    });

    return res;
  }

  setDefaultExplain(questionList: Unscramble[]) {
    questionList.forEach(q => {
      if (!q.correctAnswer.explanation) {
        if (q.question.isUnscrambleByText) {
          q.correctAnswer.explanation = `Correct answer: ${q.correctAnswer.detail.join(
            ' ',
          )}`;
        } else {
          const correctOrder = [];
          q.question.items.forEach(item => {
            const index = q.correctAnswer.detail.findIndex(i => i === item);
            correctOrder.push(index + 1);
          });
          q.correctAnswer.explanation = `Correct answer: ${correctOrder.join(
            ', ',
          )}`;
        }
      }
    });
  }
}
