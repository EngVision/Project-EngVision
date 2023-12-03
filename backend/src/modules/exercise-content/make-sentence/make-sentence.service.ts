import { BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ExerciseContentService } from '../base-exercise-content.service';
import { CreateMakeSentenceDto } from './dto/create-make-sentence.dto';
import { MakeSentence } from './schemas/make-sentence.schema';
import { QuestionResult } from 'src/modules/submissions/schemas/submission.schema';
import { ExerciseQuestionDto } from '../dto/exercise-content.dto';

export class MakeSentenceService extends ExerciseContentService {
  constructor(
    @InjectModel(MakeSentence.name)
    private makeSentenceModel: Model<MakeSentence>,
  ) {
    super();
  }

  async getContent(id: string): Promise<ExerciseQuestionDto> {
    const question = await this.makeSentenceModel.findById(id);

    return question;
  }

  async createContent(
    createQuestionListDto: CreateMakeSentenceDto[],
  ): Promise<string[]> {
    const validatedContent = await this.validate(
      createQuestionListDto,
      CreateMakeSentenceDto,
    );
    const transformedContent = this.transformContent(validatedContent);

    this.setDefaultExplain(transformedContent);

    const questionList = await this.makeSentenceModel.insertMany(
      transformedContent,
    );

    return questionList.map(q => q.id);
  }

  async updateContent(
    updateQuestionListDto: CreateMakeSentenceDto[],
    removedQuestions: string[],
  ): Promise<string[]> {
    const validatedContent = await this.validate(
      updateQuestionListDto,
      CreateMakeSentenceDto,
    );

    const transformedContent = this.transformContent(validatedContent);

    this.setDefaultExplain(transformedContent);

    const bulkOps = this.updateBulkOps(transformedContent, removedQuestions);

    const res = await this.makeSentenceModel.bulkWrite(bulkOps);

    return [
      ...validatedContent.map(({ id }) => id).filter(id => !!id),
      ...Object.values(res.insertedIds).map(id => id.toString()),
    ];
  }

  async deleteContent(removedQuestion: string[]): Promise<void> {
    await this.makeSentenceModel.bulkWrite([
      this.deleteBulkOps(removedQuestion),
    ]);
  }

  async checkAnswer(id: string, answer: string[]): Promise<QuestionResult> {
    if (Array.isArray(answer) && typeof answer[0] !== 'string') {
      throw new BadRequestException('Answer must be not empty string array');
    }

    const {
      question,
      correctAnswer: { detail, explanation },
    } = await this.makeSentenceModel.findById(id);

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

  validateAnswerArray(answer: string[]) {
    for (const element of answer) {
      if (typeof element !== 'string') {
        return false;
      }
    }
    return true;
  }

  validateQuestion(question: string, answer: string): void {
    const count = (question.match(/\[]/g) || []).length;

    if (count !== answer.split(',').length) {
      throw new BadRequestException(
        `question.text, correctAnswer.detail: Number of answer must match with number of blank`,
      );
    }
  }

  answerToString(answer: string[]): string {
    return answer
      .map(s => s.trim())
      .join()
      .toLowerCase();
  }

  transformContent(questionList: CreateMakeSentenceDto[]): MakeSentence[] {
    const res: MakeSentence[] = [];
    const regexBrackets = /\[(.*?)\]/g;

    questionList.forEach(q => {
      const detail: string[] = [];
      const questionText = q.question.text;
      const answerMatches = questionText.match(regexBrackets);

      const answersGroupArray = answerMatches.map(answer =>
        answer.substring(1, answer.length - 1).split('|'),
      );

      answersGroupArray.forEach(answers => {
        answers.forEach((_, index) => {
          answers[index] = answers[index].trim();

          if (answers[index].length === 0) {
            throw new BadRequestException('Answers cannot be empty');
          }
          if (answers[index][0] === '*') {
            answers[index] = answers[index].substring(1);
            detail.push(answers[index]);
          }
        });
      });

      if (detail.length !== answersGroupArray.length) {
        throw new BadRequestException(
          'Number correct answer and question is not equal',
        );
      }

      res.push({
        ...q,
        correctAnswer: {
          ...q.correctAnswer,
          detail,
        },
        question: {
          ...q.question,
          text: questionText.replaceAll(regexBrackets, '[]'),
          answers: answersGroupArray,
        },
      });
    });

    return res;
  }

  setDefaultExplain(questionList: MakeSentence[]) {
    questionList.forEach(q => {
      if (!q.correctAnswer.explanation) {
        q.correctAnswer.explanation = `Correct answer: ${q.correctAnswer.detail.join(
          ', ',
        )}`;
      }
    });
  }
}
