import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CoursesService } from './courses.service';
import { AtGuard, RoleGuard } from 'src/common/guards';
import { Response } from 'express';
import { courseIdDto } from './dto/course-id.dto';
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
import { GetResponseList } from 'src/common/dto/paginated-response.dto';
import {
  UpdateLessonDto,
  CourseDto,
  CreateCourseDto,
  CreateLessonDto,
  CreateSectionDto,
  SearchCourseDto,
  UpdateCourseDto,
  CourseDetailDto,
  CourseSectionIdDto,
  UpdateSectionDto,
  CourseSectionLessonIdDto,
} from './dto';

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
  async getAll(@Res() res: Response, @Query() query: SearchCourseDto) {
    const [courses, total] = await this.coursesService.getAll(query);

    return res.status(HttpStatus.OK).send(
      GetResponseList({
        data: courses,
        message: 'Courses',
        total: total,
        limit: query.limit ? query.limit : 20,
        offset: query.page && query.limit ? (query.page - 1) * query.limit : 0,
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
        message: 'Get course',
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

  @Post('/:id/sections')
  @ApiResponseData(CourseDetailDto)
  @UseGuards(AtGuard, RoleGuard(Role.Teacher))
  async createSection(
    @Body() createSection: CreateSectionDto,
    @Res() res: Response,
    @Param() params: courseIdDto,
    @CurrentUser() user: JwtPayload,
  ) {
    const newCourse = await this.coursesService.createSection(
      createSection,
      params.id,
      user.sub,
    );

    return res.status(HttpStatus.CREATED).send(
      GetResponse({
        data: newCourse,
        message: 'Add section successful',
      }),
    );
  }

  @Patch('/:id/sections/:sectionId')
  @ApiResponseData(CourseDetailDto)
  @UseGuards(AtGuard, RoleGuard(Role.Teacher))
  async updateSection(
    @Body() updateSection: UpdateSectionDto,
    @Res() res: Response,
    @Param() params: CourseSectionIdDto,
    @CurrentUser() user: JwtPayload,
  ) {
    const newCourse = await this.coursesService.updateSection(
      updateSection,
      params.id,
      params.sectionId,
      user.sub,
    );

    return res.status(HttpStatus.CREATED).send(
      GetResponse({
        data: newCourse,
        message: 'Update section successful',
      }),
    );
  }

  @Delete('/:id/sections/:sectionId')
  @ApiResponseData(CourseDetailDto)
  @UseGuards(AtGuard, RoleGuard(Role.Teacher))
  async removeSection(
    @Res() res: Response,
    @Param() params: CourseSectionIdDto,
    @CurrentUser() user: JwtPayload,
  ) {
    const newCourse = await this.coursesService.removeSection(
      params.id,
      params.sectionId,
      user.sub,
    );

    return res.status(HttpStatus.CREATED).send(
      GetResponse({
        data: newCourse,
        message: 'Remove section successful',
      }),
    );
  }

  @Post('/:id/sections/:sectionId/lessons')
  @ApiResponseData(CourseDetailDto)
  @UseGuards(AtGuard, RoleGuard(Role.Teacher))
  async createLesson(
    @Body() createLesson: CreateLessonDto,
    @Res() res: Response,
    @Param() params: CourseSectionIdDto,
    @CurrentUser() user: JwtPayload,
  ) {
    const newCourse = await this.coursesService.createLesson(
      createLesson,
      params.id,
      params.sectionId,
      user.sub,
    );

    return res.status(HttpStatus.CREATED).send(
      GetResponse({
        data: newCourse,
        message: 'Add lesson successful',
      }),
    );
  }

  @Patch('/:id/sections/:sectionId/lessons/:lessonId')
  @ApiResponseData(CourseDetailDto)
  @UseGuards(AtGuard, RoleGuard(Role.Teacher))
  async updateLesson(
    @Body() updateLesson: UpdateLessonDto,
    @Res() res: Response,
    @Param() params: CourseSectionLessonIdDto,
    @CurrentUser() user: JwtPayload,
  ) {
    const newCourse = await this.coursesService.updateLesson(
      updateLesson,
      params.id,
      params.sectionId,
      params.lessonId,
      user.sub,
    );

    return res.status(HttpStatus.CREATED).send(
      GetResponse({
        data: newCourse,
        message: 'Update lesson successful',
      }),
    );
  }

  @Delete('/:id/sections/:sectionId/lessons/:lessonId')
  @ApiResponseData(CourseDetailDto)
  @UseGuards(AtGuard, RoleGuard(Role.Teacher))
  async removeLesson(
    @Res() res: Response,
    @Param() params: CourseSectionLessonIdDto,
    @CurrentUser() user: JwtPayload,
  ) {
    const newCourse = await this.coursesService.removeLesson(
      params.id,
      params.sectionId,
      params.lessonId,
      user.sub,
    );

    return res.status(HttpStatus.CREATED).send(
      GetResponse({
        data: newCourse,
        message: 'Remove lesson successful',
      }),
    );
  }

  @Post('/:id/attend')
  @ApiResponseData(Object)
  @UseGuards(AtGuard, RoleGuard(Role.Student))
  async attendCourse(
    @Res() res: Response,
    @Param() params: courseIdDto,
    @CurrentUser() user: JwtPayload,
  ) {
    await this.coursesService.attendCourse(params.id, user.sub);

    return res.status(HttpStatus.CREATED).send(
      GetResponse({
        message: 'Attend course successful',
      }),
    );
  }

  @Get('/:id/attend')
  @ApiResponseData(Array)
  @UseGuards(AtGuard, RoleGuard(Role.Teacher))
  async attendanceList(
    @Res() res: Response,
    @Param() params: courseIdDto,
    @CurrentUser() user: JwtPayload,
  ) {
    const attendanceList = await this.coursesService.getAttendanceList(
      params.id,
      user.sub,
    );

    return res.status(HttpStatus.CREATED).send(
      GetResponse({
        message: 'Get attendance list',
        data: attendanceList,
      }),
    );
  }
}
