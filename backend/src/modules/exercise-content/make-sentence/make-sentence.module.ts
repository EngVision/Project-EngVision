import { Module } from '@nestjs/common';
import { MakeSentenceService } from './make-sentence.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MakeSentence,
  MakeSentenceSchema,
} from './schemas/make-sentence.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MakeSentence.name, schema: MakeSentenceSchema },
    ]),
  ],
  providers: [MakeSentenceService],
  exports: [MakeSentenceService],
})
export class MakeSentenceModule {}
