import {
  Controller,
  Delete,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
  UnsupportedMediaTypeException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { multerOptions } from 'src/common/config';
import { CurrentUser } from 'src/common/decorators';
import { AtGuard } from 'src/common/guards';
import { JwtPayload } from '../auth/types';
import { FileValidationErrors } from './enums';
import { FileUploadService } from './file-upload.service';
import { LocalFile } from './schemas/local-file.schema';

@ApiTags('File upload')
@UseGuards(AtGuard)
@Controller('file-upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('file', multerOptions('', 'image')))
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  async uploadImage(
    @CurrentUser() user: JwtPayload,
    @UploadedFile()
    file: Express.Multer.File,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    if (
      req['fileValidationError'] === FileValidationErrors.UNSUPPORTED_FILE_TYPE
    ) {
      throw new UnsupportedMediaTypeException(
        `Unsupported file type ${req['unsupportedFileType']}`,
      );
    }

    const newFile = await this.fileUploadService.create(file, user.sub);

    return res
      .status(HttpStatus.CREATED)
      .send(plainToClass(LocalFile, newFile.toObject()));
  }

  @Post('audio')
  @UseGuards(AtGuard)
  @UseInterceptors(FileInterceptor('file', multerOptions('', 'audio')))
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  async uploadAudio(
    @CurrentUser() user: JwtPayload,
    @UploadedFile()
    file: Express.Multer.File,
    @Res() res: Response,
  ) {
    const newFile = await this.fileUploadService.create(file, user.sub);

    return res
      .status(HttpStatus.CREATED)
      .send(plainToClass(LocalFile, newFile.toObject()));
  }

  @Put(':id')
  @UseGuards(AtGuard)
  @UseInterceptors(FileInterceptor('file', multerOptions('')))
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async update(
    @CurrentUser() user: JwtPayload,
    @Param('id') id: string,
    @UploadedFile()
    file: Express.Multer.File,
    @Res() res: Response,
  ) {
    const updatedFile = await this.fileUploadService.update(id, user.sub, file);

    return res
      .status(HttpStatus.OK)
      .send(plainToClass(LocalFile, updatedFile.toObject()));
  }

  @Delete(':id')
  @UseGuards(AtGuard)
  async remove(
    @CurrentUser() user: JwtPayload,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    await this.fileUploadService.remove(id, user.sub);

    return res
      .status(HttpStatus.OK)
      .send({ message: 'Remove file successful' });
  }
}
