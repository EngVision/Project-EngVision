import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
  StreamableFile,
  UnsupportedMediaTypeException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { multerOptions } from 'src/common/config';
import { ApiResponseData, CurrentUser } from 'src/common/decorators';
import { JwtPayload } from '../auth/types';
import { FilesService } from './files.service';
import { FileValidationErrors } from 'src/common/enums';
import { GetResponse } from 'src/common/dto';
import { Response } from 'express';
import { AtGuard } from 'src/common/guards';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('files')
@ApiTags('Files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('')
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

    const newFile = await this.filesService.create(file, user.sub);

    return res
      .status(HttpStatus.CREATED)
      .send(
        GetResponse({ message: 'File uploaded', data: { fileId: newFile.id } }),
      );
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
    const updatedFile = await this.filesService.update(id, user.sub, file);

    return res.status(HttpStatus.OK).send(
      GetResponse({
        message: 'File updated',
        data: { fileId: updatedFile.id },
      }),
    );
  }

  @Get(':id')
  async getFile(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const file = await this.filesService.get(id);

    if (file.url) {
      return res.redirect(file.url);
    }

    const stream = createReadStream(join(process.cwd(), file.path));

    res.set({
      'Content-Disposition': `inline; filename="${file.filename}"`,
      'Content-Type': file.mimetype,
    });
    return new StreamableFile(stream);
  }

  @Delete(':id')
  @UseGuards(AtGuard)
  @ApiResponseData(Object)
  async remove(
    @CurrentUser() user: JwtPayload,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    await this.filesService.remove(id, user.sub);

    return res
      .status(HttpStatus.OK)
      .send(GetResponse({ message: 'Remove file successful' }));
  }
}
