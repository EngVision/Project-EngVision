import { Module } from '@nestjs/common';
import { WordSearchService } from './word-search.service';
import { MongooseModule } from '@nestjs/mongoose';
import { WordSearch, WordSearchSchema } from './schemas/word-search.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WordSearch.name, schema: WordSearchSchema },
    ]),
  ],
  providers: [WordSearchService],
  exports: [WordSearchService],
})
export class WordSearchModule {}
