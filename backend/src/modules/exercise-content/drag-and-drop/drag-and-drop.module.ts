import { Module } from '@nestjs/common';
import { DragAndDropService } from './drag-and-drop.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DragAndDrop, DragAndDropSchema } from './schemas/drag-and-drop.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DragAndDrop.name, schema: DragAndDropSchema },
    ]),
  ],
  providers: [DragAndDropService],
  exports: [DragAndDropService],
})
export class DragAndDropModule {}
