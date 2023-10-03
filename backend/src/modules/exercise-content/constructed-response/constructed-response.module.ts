import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConstructedResponseService } from './constructed-response.service';
import {
  ConstructedResponse,
  ConstructedResponseSchema,
} from './schemas/constructed-response.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ConstructedResponse.name, schema: ConstructedResponseSchema },
    ]),
  ],
  providers: [ConstructedResponseService],
  exports: [ConstructedResponseService],
})
export class ConstructedResponseModule {}
