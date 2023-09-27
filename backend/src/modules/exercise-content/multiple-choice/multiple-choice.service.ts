import { BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QuestionResult } from 'src/modules/assignments/schemas/assignment.schema';
import { ExerciseContentService } from '../base-exercise-content.service';
import { CreateMultipleChoiceDto } from './dto/create-multiple-choice.dto';
import { MultipleChoice } from './schemas/multiple-choice.schema';

export class MultipleChoiceService extends ExerciseContentService {
  constructor(
    @InjectModel(MultipleChoice.name)
    private multipleChoiceModel: Model<MultipleChoice>,
  ) {
    super();
  }

  async createContent(
    createQuestionListDto: CreateMultipleChoiceDto[],
  ): Promise<string[]> {
    const validatedContent = await this.validate(
      createQuestionListDto,
      CreateMultipleChoiceDto,
    );

    this.setDefaultExplain(validatedContent);
    this.setMultipleAnswerValue(validatedContent);

    const questionList = await this.multipleChoiceModel.insertMany(
      validatedContent,
    );

    return questionList.map(q => q.id);
  }

  async checkAnswer(id: string, answer: number[]): Promise<QuestionResult> {
    if (Array.isArray(answer) && typeof answer[0] !== 'number') {
      throw new BadRequestException('answer must be a number array');
    }

    const { detail, explain } = (
      await this.multipleChoiceModel.findById(id).select('correctAnswer')
    ).correctAnswer;

    answer.sort();
    detail.sort();

    const isCorrect = answer.join() === detail.join();

    return { question: id, isCorrect, answer, correctAnswer: detail, explain };
  }

  setDefaultExplain(questionList: MultipleChoice[]) {
    questionList.forEach(q => {
      if (!q.correctAnswer.explain) {
        const correctAnswerString = q.question.answers
          .filter(answer => q.correctAnswer.detail.includes(answer.id))
          .map(correctAnswer => correctAnswer.text)
          .join(', ');

        q.correctAnswer.explain = `Correct answer: ${correctAnswerString}`;
      }
    });
  }

  setMultipleAnswerValue(questionList: MultipleChoice[]) {
    questionList.forEach(q => {
      if (q.correctAnswer.detail.length > 1) {
        q.question.multipleCorrectAnswers = true;
      }
    });
  }
}
