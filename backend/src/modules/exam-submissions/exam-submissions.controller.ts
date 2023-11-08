import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ExamSubmissionsService } from './exam-submissions.service';
import { AtGuard } from 'src/common/guards';
import { CurrentUser } from 'src/common/decorators';
import { JwtPayload } from '../auth/types';
import { CreateExamSubmissionDto } from './dto/create-exam-submission.dto';
import { GetResponse } from 'src/common/dto';
import { Response } from 'express';
import { QuestionResult } from '../submissions/schemas/submission.schema';
import { ApiTags } from '@nestjs/swagger';
import { ExamSubmissionDto } from './dto/exam-submission.dto';

@ApiTags('Exam Submissions')
@Controller('exam-submissions')
export class ExamSubmissionsController {
  constructor(
    private readonly examSubmissionsService: ExamSubmissionsService,
  ) {}

  @Post(':examId/submit-answer')
  @UseGuards(AtGuard)
  async submitAnswer(
    @CurrentUser() user: JwtPayload,
    @Param('examId') examId: string,
    @Body() submission: CreateExamSubmissionDto,
    @Res() res: Response,
  ) {
    const result = await this.examSubmissionsService.submitAnswer(
      user.sub,
      submission.partId,
      submission.questionId,
      submission.answer,
      examId,
    );

    return res
      .status(HttpStatus.OK)
      .send(GetResponse({ dataType: QuestionResult, data: result }));
  }

  @Get('')
  @UseGuards(AtGuard)
  async findAll(@CurrentUser() user: JwtPayload, @Res() res: Response) {
    const submissions = await this.examSubmissionsService.findAll(user.sub);

    return res
      .status(HttpStatus.OK)
      .send(GetResponse({ dataType: ExamSubmissionDto, data: submissions }));
  }

  @Get(':id')
  @UseGuards(AtGuard)
  async getSubmission(@Param('id') id: string, @Res() res: Response) {
    const submission = await this.examSubmissionsService.getSubmissionById(id);

    return res
      .status(HttpStatus.OK)
      .send(GetResponse({ dataType: ExamSubmissionDto, data: submission }));
  }

  @Get('exams/:examId')
  @UseGuards(AtGuard)
  async getSubmissionByUser(
    @CurrentUser() user: JwtPayload,
    @Param('examId') examId: string,
    @Res() res: Response,
  ) {
    const submission = await this.examSubmissionsService.getSubmissionByUser(
      user.sub,
      examId,
    );

    return res
      .status(HttpStatus.OK)
      .send(GetResponse({ dataType: ExamSubmissionDto, data: submission }));
  }
}
