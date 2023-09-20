import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
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
    createContentDto: CreateMultipleChoiceDto,
  ): Promise<Document> {
    const validatedContent = await this.validate(
      createContentDto,
      CreateMultipleChoiceDto,
    );

    const content = new this.multipleChoiceModel(validatedContent);
    await content.save();

    return content;
  }

  async checkAnswer(id: string, answer: number[]): Promise<boolean> {
    const correctAnswer = (
      await this.multipleChoiceModel.findById(id).select('correctAnswer')
    ).correctAnswer;

    answer.sort();
    correctAnswer.sort();

    return answer.join() === correctAnswer.join();
  }
}
