import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConstructedResponseService } from './constructed-response.service';
import {
  ConstructedResponse,
  ConstructedResponseSchema,
} from './schemas/constructed-response.schema';
import { OpenAiModule } from 'src/modules/open-ai/open-ai.module';
import { SubmissionsModule } from 'src/modules/submissions/submissions.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ConstructedResponse.name, schema: ConstructedResponseSchema },
    ]),
    OpenAiModule,
  ],
  providers: [ConstructedResponseService],
  exports: [ConstructedResponseService],
})
export class ConstructedResponseModule {}
