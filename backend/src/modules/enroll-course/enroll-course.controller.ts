import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CurrentUser } from 'src/common/decorators';
import { GetResponse } from 'src/common/dto';
import { AtGuard, RoleGuard } from 'src/common/guards';
import { JwtPayload } from '../auth/types';
import { EnrollCourseService } from './enroll-course.service';
import { Role } from '../reviews/enums';

@Controller('enroll-course')
@ApiTags('Enroll course')
export class EnrollCourseController {
  constructor(private readonly enrollCourseService: EnrollCourseService) {}

  @Post()
  @UseGuards(AtGuard, RoleGuard(Role.Student))
  async enroll(
    @CurrentUser() user: JwtPayload,
    @Body('courseId') courseId: string,
    @Res() res: Response,
  ) {
    await this.enrollCourseService.enroll(courseId, user.sub);

    return res.status(HttpStatus.OK).send(
      GetResponse({
        success: true,
        message: 'Enroll course successfully',
      }),
    );
  }
}
