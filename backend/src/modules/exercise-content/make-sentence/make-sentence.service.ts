import { BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ExerciseContentService } from '../base-exercise-content.service';
import { CreateMakeSentenceDto } from './dto/create-make-sentence.dto';
import { MakeSentence } from './schemas/make-sentence.schema';
import { ExerciseQuestionDto } from '../dto/exercise-content.dto';
import { QuestionResult } from 'src/modules/submissions/schemas/submission.schema';

export class MakeSentenceService extends ExerciseContentService {
  constructor(
    @InjectModel(MakeSentence.name)
    private MakeSentenceModel: Model<MakeSentence>,
  ) {
    super();
  }

  async createContent(
    createQuestionListDto: CreateMakeSentenceDto[],
  ): Promise<string[]> {
    const validatedContent = await this.validate(
      createQuestionListDto,
      CreateMakeSentenceDto,
    );

    this.checkLogicContent(validatedContent);

    this.setDefaultExplain(validatedContent);

    const questionList = await this.MakeSentenceModel.insertMany(
      validatedContent,
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

    this.setDefaultExplain(validatedContent);

    this.setDefaultExplain(validatedContent);

    const bulkOps = this.updateBulkOps(validatedContent, removedQuestions);

    const res = await this.MakeSentenceModel.bulkWrite(bulkOps);

    return [
      ...validatedContent.map(({ id }) => id).filter(id => !!id),
      ...Object.values(res.insertedIds).map(id => id.toString()),
    ];
  }

  async deleteContent(removedQuestion: string[]): Promise<void> {
    await this.MakeSentenceModel.bulkWrite([
      this.deleteBulkOps(removedQuestion),
    ]);
  }

  async checkAnswer(id: string, answer: number[]): Promise<QuestionResult> {
    console.log('checkAnswer');
    if (Array.isArray(answer) && !this.validateAnswerArray(answer)) {
      throw new BadRequestException('answer must be a number array');
    }

    const { detail, explanation } = (
      await this.MakeSentenceModel.findById(id).select('correctAnswer')
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

  validateAnswerArray(answer: number[]) {
    for (const element of answer) {
      if (typeof element !== 'number') {
        return false;
      }
    }
    return true;
  }

  checkLogicContent(content: ExerciseQuestionDto[]) {
    const regex = new RegExp('{}', 'g');

    content.forEach(exercise => {
      const numberAnswer = (exercise.question.text.match(regex) || []).length;

      if (
        numberAnswer !== exercise.question.answers.length &&
        numberAnswer !== exercise.correctAnswer.detail.length
      ) {
        throw new BadRequestException(
          'Content has been conflict (Length answer and correctAnswer is not equal)',
        );
      }
    });
  }

  setDefaultExplain(questionList: MakeSentence[]) {
    questionList.forEach(q => {
      console.log(q);
      if (!q.correctAnswer.explanation) {
        const arrayAnswer: string[] = [];

        q.question.answers.forEach((answer, index) => {
          const answerText = answer
            .filter(a => q.correctAnswer.detail[index] === a.id)
            .map(correctAnswer => correctAnswer.text)
            .join('');
          arrayAnswer.push(answerText);
        });

        q.correctAnswer.explanation = `Correct answer: ${arrayAnswer.join(
          ', ',
        )}`;
      }
    });
    return null;
  }
}
