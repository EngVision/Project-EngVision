import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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

    console.log(createQuestionListDto);

    const questionList = await this.multipleChoiceModel.insertMany(
      validatedContent,
    );
    console.log(questionList);

    return questionList.map(q => q.id);
  }

  async checkAnswer(id: string, answer: number[]): Promise<boolean> {
    // const correctAnswer = (
    //   await this.multipleChoiceModel.findById(id).select('correctAnswer')
    // ).correctAnswer;

    // answer.sort();
    // correctAnswer.sort();

    // return answer.join() === correctAnswer.join();
    return true;
  }
}
