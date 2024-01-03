import { Controller, Get, HttpStatus, Res, UseGuards } from '@nestjs/common';
import { PersonalizedCourseService } from './personalized-course.service';
import { ApiResponseData, CurrentUser } from 'src/common/decorators';
import { AtGuard, RoleGuard } from 'src/common/guards';
import { Role } from 'src/common/enums';
import { JwtPayload } from 'src/modules/auth/types';
import { CourseDetailDto } from 'src/modules/courses/dto';
import { Response } from 'express';
import { GetResponse } from 'src/common/dto';

@Controller('personalized-course')
export class PersonalizedCourseController {
  constructor(
    private readonly personalizedCourseService: PersonalizedCourseService,
  ) {}

  @Get('')
  @ApiResponseData(CourseDetailDto)
  @UseGuards(AtGuard, RoleGuard(Role.Student))
  async getPersonalized(@Res() res: Response, @CurrentUser() user: JwtPayload) {
    const course = await this.personalizedCourseService.get(user);

    return res.status(HttpStatus.OK).send(
      GetResponse({
        data: {
          ...course,
          sectionDisabled: true,
        },
      }),
    );
  }
}
