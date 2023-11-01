import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ApiResponseData, CurrentUser } from 'src/common/decorators';
import { GetResponse } from 'src/common/dto';
import { AtGuard } from 'src/common/guards';
import { JwtPayload } from '../auth/types';
import { FilesService } from './files.service';

const maxFileSize = 50 * 1000 * 1000;

@Controller('files')
@ApiTags('Files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('')
  // @UseGuards(AtGuard)
  @UseInterceptors(
    FileInterceptor('file', { limits: { fileSize: maxFileSize } }),
  )
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
    @Res() res: Response,
  ) {
    const newFile = await this.filesService.create(file, user.sub);

    return res
      .status(HttpStatus.CREATED)
      .send(
        GetResponse({ message: 'File uploaded', data: { fileId: newFile.id } }),
      );
  }

  @Put(':id')
  @UseGuards(AtGuard)
  @UseInterceptors(
    FileInterceptor('file', { limits: { fileSize: maxFileSize } }),
  )
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

    // const stream = createReadStream(join(process.cwd(), file.path));

    res.set({
      'Content-Disposition': `inline; filename="${file.filename}"`,
      'Content-Type': file.mimetype,
    });
    return new StreamableFile(file.body);
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
