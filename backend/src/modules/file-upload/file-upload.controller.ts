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
import { Request, Response } from 'express';
import { multerOptions } from 'src/common/config';
import { CurrentUser } from 'src/common/decorators';
import { ApiResponseData } from 'src/common/decorators/api-response-data.decorator';
import { GetResponse } from 'src/common/dto';
import { AtGuard } from 'src/common/guards';
import { JwtPayload } from '../auth/types';
import { LocalFileDto } from './dto/local-file.dto';
import { FileValidationErrors } from './enums';
import { FileUploadService } from './file-upload.service';

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
  @ApiResponseData(LocalFileDto)
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
      .send(GetResponse({ dataType: LocalFileDto, data: newFile }));
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
  @ApiResponseData(LocalFileDto)
  async uploadAudio(
    @CurrentUser() user: JwtPayload,
    @UploadedFile()
    file: Express.Multer.File,
    @Res() res: Response,
  ) {
    const newFile = await this.fileUploadService.create(file, user.sub);

    return res
      .status(HttpStatus.CREATED)
      .send(GetResponse({ dataType: LocalFileDto, data: newFile }));
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
  @ApiResponseData(LocalFileDto)
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
      .send(GetResponse({ dataType: LocalFileDto, data: updatedFile }));
  }

  @Delete(':id')
  @UseGuards(AtGuard)
  @ApiResponseData(Object)
  async remove(
    @CurrentUser() user: JwtPayload,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    await this.fileUploadService.remove(id, user.sub);

    return res
      .status(HttpStatus.OK)
      .send(GetResponse({ message: 'Remove file successful' }));
  }
}
