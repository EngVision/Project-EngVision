import { Module } from '@nestjs/common';
import { ExamSubmissionsService } from './exam-submissions.service';
import { ExamSubmissionsController } from './exam-submissions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ExamSubmission,
  ExamSubmissionSchema,
} from './schemas/exam-submission.schema';
import { ExercisesModule } from '../exercises/exercises.module';
import { ExamsModule } from '../exams/exams.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ExamSubmission.name, schema: ExamSubmissionSchema },
    ]),
    ExercisesModule,
    ExamsModule,
  ],
  controllers: [ExamSubmissionsController],
  providers: [ExamSubmissionsService],
})
export class ExamSubmissionsModule {}
