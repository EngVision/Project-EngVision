import { Module } from '@nestjs/common';
import { FillBlankService } from './fill-blank.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FillBlank, FillBlankSchema } from './schemas/fill-blank.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FillBlank.name, schema: FillBlankSchema },
    ]),
  ],
  providers: [FillBlankService],
  exports: [FillBlankService],
})
export class FillBlankModule {}
