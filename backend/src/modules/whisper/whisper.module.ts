import { Module } from '@nestjs/common';
import { WhisperService } from './whisper.service';
import { HttpModule } from '@nestjs/axios';
import { OpenAiModule } from '../open-ai/open-ai.module';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SpeechToText,
  SpeechToTextSchema,
} from './schemas/speech-to-text.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SpeechToText.name, schema: SpeechToTextSchema },
    ]),
    HttpModule,
    OpenAiModule,
  ],
  providers: [WhisperService],
  exports: [WhisperService],
})
export class WhisperModule {}
