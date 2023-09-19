import { Module } from '@nestjs/common';
import { MultipleChoiceService } from './multiple-choice.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MultipleChoice,
  MultipleChoiceSchema,
} from './schemas/multiple-choice.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MultipleChoice.name, schema: MultipleChoiceSchema },
    ]),
  ],
  providers: [MultipleChoiceService],
  exports: [MultipleChoiceService],
})
export class MultipleChoiceModule {}
