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
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CoursesService } from './courses.service';
import { AtGuard, RoleGuard } from 'src/common/guards';
import { CreateCourseDto } from './dto/create-course.dto';
import { Response } from 'express';
import { courseIdDto } from './dto/course-id.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Role } from 'src/common/enums';
import { CreateReviewDto } from '../reviews/dto/create-review.dto';
import {
  ApiResponseData,
  ApiResponseList,
} from 'src/common/decorators/api-response-data.decorator';
import { ReviewDto } from '../reviews/dto/review.dto';
import { GetResponse } from 'src/common/dto';
import { CurrentUser } from 'src/common/decorators';
import { JwtPayload } from '../auth/types';
import { CourseDto } from './dto/course.dto';
import { CourseDetailDto } from './dto/course-detail.dto';
import { GetResponseList } from 'src/common/dto/paginated-response.dto';

@ApiTags('Courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post('')
  @ApiResponseData(CourseDto)
  @UseGuards(AtGuard, RoleGuard(Role.Teacher))
  async createCourse(
    @Body() course: CreateCourseDto,
    @Res() res: Response,
    @CurrentUser() user: JwtPayload,
  ) {
    const savedCourse = await this.coursesService.createCourse(
      course,
      user.sub,
    );

    return res.status(HttpStatus.CREATED).send(
      GetResponse({
        data: savedCourse,
        message: 'Create course successful',
      }),
    );
  }

  @Get('')
  @ApiResponseList(CourseDto)
  @UseGuards(AtGuard)
  async getAll(@Res() res: Response) {
    const courses = await this.coursesService.getAll();

    return res.status(HttpStatus.OK).send(
      GetResponseList({
        data: courses,
        message: 'All courses',
        total: null,
        limit: null,
        offset: null,
      }),
    );
  }

  @Get('/:id')
  @ApiResponseData(CourseDetailDto)
  @UseGuards(AtGuard)
  async getCourse(@Param() params: courseIdDto, @Res() res: Response) {
    const course = await this.coursesService.getCourse(params.id);
    return res.status(HttpStatus.OK).send(
      GetResponse({
        data: course,
        message: 'Get courses',
      }),
    );
  }

  @Patch('/:id')
  @ApiResponseData(CourseDetailDto)
  @UseGuards(AtGuard, RoleGuard(Role.Teacher))
  async updateCourse(
    @Param() params: courseIdDto,
    @Body() updateCourse: UpdateCourseDto,
    @Res() res: Response,
    @CurrentUser() user: JwtPayload,
  ) {
    const course = await this.coursesService.updateCourse(
      params.id,
      user.sub,
      updateCourse,
    );

    return res.status(HttpStatus.OK).send(
      GetResponse({
        data: course,
        message: 'Updated course',
      }),
    );
  }

  @Delete('/:id')
  @ApiResponseData(Object)
  @UseGuards(AtGuard, RoleGuard(Role.Teacher))
  async deleteCourse(
    @Param() params: courseIdDto,
    @Res() res: Response,
    @CurrentUser() user: JwtPayload,
  ) {
    await this.coursesService.deleteCourse(params.id, user.sub);

    return res.status(HttpStatus.OK).send(
      GetResponse({
        message: 'Delete course successful',
      }),
    );
  }

  @Post('/:id/review')
  @ApiResponseData(ReviewDto)
  @UseGuards(AtGuard, RoleGuard(Role.Student))
  async createReview(
    @Body() createReview: CreateReviewDto,
    @Res() res: Response,
    @Param() params: courseIdDto,
    @CurrentUser() user: JwtPayload,
  ) {
    const review = {
      ...createReview,
      user: user.sub,
      courseId: params.id,
    } as ReviewDto;

    const newReview = await this.coursesService.createReview(review);

    return res.status(HttpStatus.CREATED).send(
      GetResponse({
        dataType: ReviewDto,
        data: newReview,
        message: 'Add review successful',
      }),
    );
  }
}
