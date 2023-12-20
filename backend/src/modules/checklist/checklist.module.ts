import { UpdateChecklistDto } from './dto/update-checklist.dto';
import { Module } from '@nestjs/common';
import { ChecklistService } from './checklist.service';
import { ChecklistController } from './checklist.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Checklist, ChecklistSchema } from './schemas/checklist.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Checklist.name, schema: ChecklistSchema },
    ]),
  ],
  controllers: [ChecklistController],
  providers: [ChecklistService],
})
export class ChecklistModule {}
