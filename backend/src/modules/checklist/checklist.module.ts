import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChecklistController } from './checklist.controller';
import { ChecklistService } from './checklist.service';
import { Checklist, ChecklistSchema } from './schemas/checklist.schema';
import { CoursesModule } from '../courses/courses.module';
import { SubmissionsModule } from '../submissions/submissions.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Checklist.name, schema: ChecklistSchema },
    ]),
    CoursesModule,
    SubmissionsModule,
  ],
  controllers: [ChecklistController],
  providers: [ChecklistService],
  exports: [ChecklistService],
})
export class ChecklistModule {}
