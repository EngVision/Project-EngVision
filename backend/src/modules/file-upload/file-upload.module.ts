import { Module } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileUploadController } from './file-upload.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LocalFile, LocalFileSchema } from './schemas/local-file.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LocalFile.name, schema: LocalFileSchema },
    ]),
  ],
  controllers: [FileUploadController],
  providers: [FileUploadService],
  exports: [FileUploadService],
})
export class FileUploadModule {}
