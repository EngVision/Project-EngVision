import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CurrentUser } from 'src/common/decorators';
import { GetResponseList } from 'src/common/dto/paginated-response.dto';
import { Role } from 'src/common/enums';
import { AtGuard, RoleGuard } from 'src/common/guards';
import { JwtPayload } from '../auth/types';
import { CourseLessonDto } from './dto/course-lesson.dto';
import { LessonsService } from './lessons.service';
import { GetResponse } from 'src/common/dto';
import { AddLessonDto } from './dto/add-lesson.dto';

@ApiTags('Lessons')
@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  // @Post()
  // create(@Body() createLessonDto: CreateLessonDto) {
  //   return this.lessonsService.create(createLessonDto);
  // }

  @Get()
  @UseGuards(AtGuard, RoleGuard(Role.Teacher))
  async findAll(@CurrentUser() user: JwtPayload, @Res() res: Response) {
    const courseLessons = await this.lessonsService.get(user);

    return res.status(HttpStatus.OK).json(
      GetResponseList({
        data: courseLessons,
        dataType: CourseLessonDto,
        total: 0,
        limit: 0,
        offset: 0,
      }),
    );
  }

  @Post()
  async addLessons(@Body() addLessonDto: AddLessonDto, @Res() res: Response) {
    console.log(addLessonDto);

    const course = await this.lessonsService.addLessons(addLessonDto);

    return res.status(HttpStatus.OK).json(
      GetResponse({
        data: course,
        dataType: CourseLessonDto,
      }),
    );
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.lessonsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto) {
  //   return this.lessonsService.update(+id, updateLessonDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.lessonsService.remove(+id);
  // }
}
