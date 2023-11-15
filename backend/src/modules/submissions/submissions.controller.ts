import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import {
  ApiResponseData,
  ApiResponseList,
  CurrentUser,
} from 'src/common/decorators';
import { GetResponse } from 'src/common/dto';
import { GetResponseList } from 'src/common/dto/paginated-response.dto';
import { QueryDto } from 'src/common/dto/query.dto';
import { Role } from 'src/common/enums';
import { AtGuard, RoleGuard } from 'src/common/guards';
import { JwtPayload } from '../auth/types';
import { GradingDto } from './dto/grading.dto';
import { SubmissionDto } from './dto/submission.dto';
import { SubmissionsService } from './submissions.service';
import { SubmissionQueryDto } from './dto/submission-query.dto';

@ApiTags('Submissions')
@Controller('submissions')
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @Get()
  @UseGuards(AtGuard)
  @ApiResponseList(SubmissionDto)
  async findAll(
    @Query() query: SubmissionQueryDto,
    @CurrentUser() user: JwtPayload,
    @Res() res: Response,
  ) {
    const [submissions, total] = await this.submissionsService.findByUser(
      query,
      user.sub,
      user.roles,
    );

    return res.status(HttpStatus.OK).send(
      GetResponseList({
        dataType: SubmissionDto,
        data: submissions,
        limit: query.limit,
        offset: query.page,
        total,
      }),
    );
  }

  @Get(':id')
  @UseGuards(AtGuard)
  @ApiResponseData(SubmissionDto)
  async findOne(
    @CurrentUser() user: JwtPayload,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    const submission = await this.submissionsService.findById(id);

    return res.status(HttpStatus.OK).send(
      GetResponse({
        dataType: SubmissionDto,
        data: submission,
      }),
    );
  }

  @Get('exercise/:id')
  @UseGuards(AtGuard)
  @ApiResponseData(SubmissionDto)
  async findSubmissionByExercise(
    @CurrentUser() user: JwtPayload,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    const submission = await this.submissionsService.findByExerciseUser(
      user.sub,
      id,
    );

    return res.status(HttpStatus.OK).send(
      GetResponse({
        dataType: SubmissionDto,
        data: submission,
      }),
    );
  }

  @Post(':submissionId/grade/:questionId')
  @UseGuards(AtGuard, RoleGuard(Role.Teacher))
  @ApiResponseData(SubmissionDto)
  async gradeExercise(
    @CurrentUser() user: JwtPayload,
    @Param('submissionId') submissionId: string,
    @Param('questionId') questionId: string,
    @Body() gradingDto: GradingDto,
    @Res() res: Response,
  ) {
    const submission = await this.submissionsService.gradeSubmission(
      submissionId,
      questionId,
      gradingDto,
      user.sub,
    );

    return res.status(HttpStatus.OK).send(
      GetResponse({
        dataType: SubmissionDto,
        data: submission,
      }),
    );
  }
}
