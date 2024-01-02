import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ExerciseContentService } from '../base-exercise-content.service';
import { QuestionResult } from 'src/modules/submissions/schemas/submission.schema';
import { DragAndDrop } from './schemas/drag-and-drop.schema';
import { CreateDragAndDropDto, Item } from './dto/create-drag-and-drop.dto';
import { ExerciseQuestionDto } from '../dto/exercise-content.dto';
import { shuffleArray } from 'src/common/utils';
import { BadRequestException } from '@nestjs/common';

export class DragAndDropService extends ExerciseContentService {
  constructor(
    @InjectModel(DragAndDrop.name)
    private DragAndDropModel: Model<DragAndDrop>,
  ) {
    super();
  }

  async getContent(id: string): Promise<ExerciseQuestionDto> {
    const question = await this.DragAndDropModel.findById(id);

    return question;
  }

  async createContent(
    createQuestionListDto: CreateDragAndDropDto[],
  ): Promise<string[]> {
    const validatedContent = await this.validate(
      createQuestionListDto,
      CreateDragAndDropDto,
    );

    const transformedContent = this.transformContent(validatedContent);

    const questionList =
      await this.DragAndDropModel.insertMany(transformedContent);

    return questionList.map(q => q.id);
  }

  async updateContent(
    updateQuestionListDto: CreateDragAndDropDto[],
    removedQuestions: string[],
  ): Promise<string[]> {
    const validatedContent = await this.validate(
      updateQuestionListDto,
      CreateDragAndDropDto,
    );

    const transformedContent = this.transformContent(validatedContent);

    this.setDefaultExplain(transformedContent);

    const bulkOps = this.updateBulkOps(transformedContent, removedQuestions);

    const res = await this.DragAndDropModel.bulkWrite(bulkOps);

    return [
      ...validatedContent.map(({ id }) => id).filter(id => !!id),
      ...Object.values(res.insertedIds).map(id => id.toString()),
    ];
  }

  async deleteContent(removedQuestion: string[]): Promise<void> {
    await this.DragAndDropModel.bulkWrite([
      this.deleteBulkOps(removedQuestion),
    ]);
  }

  async checkAnswer(id: string, answer: Item[]): Promise<QuestionResult> {
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
    } = await this.DragAndDropModel.findById(id);

    return {
      question: id,
      isCorrect: detail.every(
        d => d.image === answer.find(ans => ans.text === d.text).image,
      ),
      answer,
      correctAnswer: detail,
      explanation,
    };
  }

  shuffleQuestion = (answers: Item[]) => {
    const leftSide = answers.map(answer => answer.image);
    const rightSide = answers.map(answer => answer.text);
    shuffleArray(leftSide);
    shuffleArray(rightSide);
    return leftSide.map((_, index) => ({
      image: leftSide[index],
      text: rightSide[index],
    }));
  };

  transformContent(questionList: CreateDragAndDropDto[]): DragAndDrop[] {
    const res: DragAndDrop[] = [];

    questionList.forEach(q => {
      const pairsShuffled = this.shuffleQuestion(q.question.answers);
      res.push({
        ...q,
        correctAnswer: {
          ...q.correctAnswer,
          detail: q.question.answers,
        },
        question: {
          ...q.question,
          answers: pairsShuffled,
        },
      });
    });

    return res;
  }

  setDefaultExplain(questionList: DragAndDrop[]) {}
}
