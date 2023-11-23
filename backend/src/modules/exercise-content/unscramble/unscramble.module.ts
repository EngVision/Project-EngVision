import { Module } from '@nestjs/common';
import { UnscrambleService } from './unscramble.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Unscramble, UnscrambleSchema } from './schemas/unscramble.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Unscramble.name, schema: UnscrambleSchema },
    ]),
  ],
  providers: [UnscrambleService],
  exports: [UnscrambleService],
})
export class UnscrambleModule {}
