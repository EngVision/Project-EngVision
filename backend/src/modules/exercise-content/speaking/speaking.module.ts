import { Module } from '@nestjs/common';
import { SpeakingService } from './speaking.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Speaking, SpeakingSchema } from './schemas/speaking.schema';
import { WhisperModule } from 'src/modules/whisper/whisper.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Speaking.name, schema: SpeakingSchema },
    ]),
    WhisperModule,
  ],
  providers: [SpeakingService],
  exports: [SpeakingService],
})
export class SpeakingModule {}
