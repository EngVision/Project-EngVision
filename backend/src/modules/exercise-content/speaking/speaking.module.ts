import { Module } from '@nestjs/common';
import { SpeakingService } from './speaking.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Speaking, SpeakingSchema } from './schemas/speaking.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Speaking.name, schema: SpeakingSchema },
    ]),
  ],
  providers: [SpeakingService],
  exports: [SpeakingService],
})
export class SpeakingModule {}
