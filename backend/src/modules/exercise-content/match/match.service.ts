import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ExerciseContentService } from '../base-exercise-content.service';
import { QuestionResult } from 'src/modules/submissions/schemas/submission.schema';
import { Match } from './schemas/match.schema';
import { CreateMatchDto, Item } from './dto/create-match.dto';
import { ExerciseQuestionDto } from '../dto/exercise-content.dto';
import { shuffleArray } from 'src/common/utils';
import { BadRequestException } from '@nestjs/common';

export class MatchService extends ExerciseContentService {
  constructor(
    @InjectModel(Match.name)
    private MatchModel: Model<Match>,
  ) {
    super();
  }

  async getContent(id: string): Promise<ExerciseQuestionDto> {
    const question = await this.MatchModel.findById(id);

    return question;
  }

  async createContent(
    createQuestionListDto: CreateMatchDto[],
  ): Promise<string[]> {
    const validatedContent = await this.validate(
      createQuestionListDto,
      CreateMatchDto,
    );

    const transformedContent = this.transformContent(validatedContent);

    this.setDefaultExplain(transformedContent);

    const questionList = await this.MatchModel.insertMany(transformedContent);

    return questionList.map(q => q.id);
  }

  async updateContent(
    updateQuestionListDto: CreateMatchDto[],
    removedQuestions: string[],
  ): Promise<string[]> {
    const validatedContent = await this.validate(
      updateQuestionListDto,
      CreateMatchDto,
    );

    const transformedContent = this.transformContent(validatedContent);

    this.setDefaultExplain(transformedContent);

    const bulkOps = this.updateBulkOps(transformedContent, removedQuestions);

    const res = await this.MatchModel.bulkWrite(bulkOps);

    return [
      ...validatedContent.map(({ id }) => id).filter(id => !!id),
      ...Object.values(res.insertedIds).map(id => id.toString()),
    ];
  }

  async deleteContent(removedQuestion: string[]): Promise<void> {
    await this.MatchModel.bulkWrite([this.deleteBulkOps(removedQuestion)]);
  }

  async checkAnswer(id: string, answer: string[][]): Promise<QuestionResult> {
    if (
      !Array.isArray(answer) ||
      !answer.every(
        innerArray =>
          Array.isArray(innerArray) &&
          innerArray.every(item => typeof item === 'string'),
      )
    ) {
      throw new BadRequestException('Answer must be a string array in array');
    }

    const {
      correctAnswer: { detail, explanation },
    } = await this.MatchModel.findById(id);

    return {
      question: id,
      isCorrect: detail.every(
        pair =>
          answer.findIndex(
            pairAnswer =>
              pairAnswer[0] + pairAnswer[1] ===
              pair[0].content + pair[1].content,
          ) !== -1,
      ),
      answer,
      correctAnswer: detail,
      explanation,
    };
  }

  shuffleQuestion = (pairs: Item[][]) => {
    const leftSide = pairs.map(pair => pair[0]);
    const rightSide = pairs.map(pair => pair[1]);
    shuffleArray(leftSide);
    shuffleArray(rightSide);
    return leftSide.map((_, index) => [leftSide[index], rightSide[index]]);
  };

  transformContent(questionList: CreateMatchDto[]): Match[] {
    const res: Match[] = [];

    questionList.forEach(q => {
      const detail = q.question.pairs;
      const pairsShuffled = this.shuffleQuestion(q.question.pairs);

      res.push({
        ...q,
        correctAnswer: {
          ...q.correctAnswer,
          detail: detail,
        },
        question: {
          ...q.question,
          pairs: pairsShuffled,
        },
      });
    });

    return res;
  }

  setDefaultExplain(questionList: Match[]) {
    questionList.forEach(q => {
      if (!q.correctAnswer.explanation) {
        const correctMatch = [];

        q.question.pairs.map((pair, indexLeft) => {
          const correctPair = q.correctAnswer.detail.find(
            pairCorrect =>
              JSON.stringify(pair[0]) === JSON.stringify(pairCorrect[0]),
          )[1];
          const indexRight = q.question.pairs.findIndex(
            p => JSON.stringify(p[1]) === JSON.stringify(correctPair),
          );
          correctMatch.push([indexLeft + 1, indexRight + 1]);
        });

        q.correctAnswer.explanation = correctMatch
          .map(c => c.join('->'))
          .join(', ');
      }
    });
  }
}
