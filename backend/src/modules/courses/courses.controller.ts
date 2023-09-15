import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CoursesService } from './courses.service';
import { AtGuard, RoleGuard } from 'src/common/guards';
import { CreateCourseDto } from './dto/create-course.dto';
import { Response } from 'express';
import { plainToClass } from 'class-transformer';
import { Course } from './schemas/course.schema';
import { courseIdDto } from './dto/course-id';
import { UpdateCourseDto } from './dto/update-course.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/config';
import { Role } from '../users/enums';

@ApiTags('Courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post('')
  @UseGuards(AtGuard, RoleGuard(Role.Teacher))
  @UseInterceptors(
    FileInterceptor('thumbnail', multerOptions('courses-thumb', 'image')),
  )
  @ApiConsumes('multipart/form-data')
  async createCourse(
    @Body() course: CreateCourseDto,
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    if (file) course = { ...course, thumbnail: file.filename };
    const savedCourse = await this.coursesService.createCourse(course);
    return res
      .status(HttpStatus.CREATED)
      .send(plainToClass(Course, savedCourse.toObject()));
  }

  @Get('')
  @UseGuards(AtGuard)
  async getAll(@Res() res: Response) {
    const courses = await this.coursesService.getAll();
    return res.status(HttpStatus.OK).send(courses);
  }

  @Get('/:id')
  @UseGuards(AtGuard)
  async getCourse(@Param() params: courseIdDto, @Res() res: Response) {
    const course = await this.coursesService.getCourse(params.id);
    return res.status(HttpStatus.OK).send(course);
  }

  @Patch('/:id')
  @UseGuards(AtGuard, RoleGuard(Role.Teacher))
  @UseInterceptors(
    FileInterceptor('thumbnail', multerOptions('courses-thumb', 'image')),
  )
  @ApiConsumes('multipart/form-data')
  async updateCourse(
    @Param() params: courseIdDto,
    @Body() updateCourse: UpdateCourseDto,
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    if (file) updateCourse = { ...updateCourse, thumbnail: file.filename };
    const course = await this.coursesService.updateCourse(
      params.id,
      updateCourse,
    );
    return res
      .status(HttpStatus.OK)
      .send(plainToClass(Course, course.toObject()));
  }

  @Delete('/:id')
  @UseGuards(AtGuard, RoleGuard(Role.Admin))
  async deleteCourse(@Param() params: courseIdDto, @Res() res: Response) {
    const result = await this.coursesService.deleteCourse(params.id);
    if (result)
      return res
        .status(HttpStatus.OK)
        .send({ message: 'Delete course successful' });
    else
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send({ message: 'Delete course fail' });
  }
}
