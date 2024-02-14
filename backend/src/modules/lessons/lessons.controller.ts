import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  StreamableFile,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CurrentUser } from 'src/common/decorators';
import { GetResponse } from 'src/common/dto';
import { GetResponseList } from 'src/common/dto/paginated-response.dto';
import { Role } from 'src/common/enums';
import { AtGuard, RoleGuard } from 'src/common/guards';
import { Readable } from 'stream';
import { JwtPayload } from '../auth/types';
import { AddLessonDto } from './dto/add-lesson.dto';
import { CourseLessonDto } from './dto/course-lesson.dto';
import { ExportLessonDto } from './dto/export-lesson.dto';
import { LessonsService } from './lessons.service';
import { ImportLessonDto } from './dto/import-lesson.dto';

@ApiTags('Lessons')
@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Get()
  @UseGuards(AtGuard, RoleGuard(Role.Teacher))
  async findAll(@CurrentUser() user: JwtPayload, @Res() res: Response) {
    const courseLessons = await this.lessonsService.get(user);

    return res.status(HttpStatus.OK).json(
      GetResponseList({
        data: courseLessons,
        dataType: CourseLessonDto,
        total: courseLessons.length,
        limit: -1,
        offset: 0,
      }),
    );
  }

  @Post()
  @UseGuards(AtGuard, RoleGuard(Role.Teacher))
  async addLessons(@Body() addLessonDto: AddLessonDto, @Res() res: Response) {
    const course = await this.lessonsService.addLessons(addLessonDto);

    return res.status(HttpStatus.OK).json(
      GetResponse({
        data: course,
        dataType: CourseLessonDto,
      }),
    );
  }

  @Post('import/:courseId/:sectionId')
  @UseGuards(AtGuard, RoleGuard(Role.Teacher))
  async importLesson(
    @Param('courseId') courseId: string,
    @Param('sectionId') sectionId: string,
    @CurrentUser() user: JwtPayload,
    @Body() importLessonDto: ImportLessonDto,
    @Res() res: Response,
  ) {
    const course = await this.lessonsService.importLesson(
      user.sub,
      courseId,
      sectionId,
      importLessonDto,
    );

    return res.status(HttpStatus.OK).json(
      GetResponse({
        data: course,
        dataType: CourseLessonDto,
      }),
    );
  }

  @Get(':id/export')
  @UseGuards(AtGuard, RoleGuard(Role.Teacher))
  async exportLesson(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const lesson = await this.lessonsService.exportLesson(id);

    res.set({
      'Content-Disposition': `attachment; filename="${lesson.title}.json"`,
      'Content-Type': 'application/json',
    });
    return new StreamableFile(
      Buffer.from(
        JSON.stringify(
          GetResponse({
            data: lesson,
            dataType: ExportLessonDto,
          }).data,
        ),
      ),
    );
  }
}
