import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LocalFile, LocalFileSchema } from './schemas/local-file.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LocalFile.name, schema: LocalFileSchema },
    ]),
  ],
  controllers: [FilesController],
  providers: [FilesService],
  exports: [FilesService],
})
export class FilesModule {}
