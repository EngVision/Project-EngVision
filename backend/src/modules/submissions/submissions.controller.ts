import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import {
  ApiResponseData,
  ApiResponseList,
  CurrentUser,
} from 'src/common/decorators';
import { GetResponse } from 'src/common/dto';
import { GetResponseList } from 'src/common/dto/paginated-response.dto';
import { AtGuard } from 'src/common/guards';
import { JwtPayload } from '../auth/types';
import { SubmissionDto } from './dto/submission.dto';
import { SubmissionsService } from './submissions.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Submissions')
@Controller('submissions')
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @Get()
  @UseGuards(AtGuard)
  @ApiResponseList(SubmissionDto)
  async findAll(@CurrentUser() user: JwtPayload, @Res() res: Response) {
    const assignments = await this.submissionsService.findByUser(user.sub);

    return res.status(HttpStatus.OK).send(
      GetResponseList({
        dataType: SubmissionDto,
        data: assignments,
        limit: 0,
        offset: 0,
        total: 0,
      }),
    );
  }

  @Get(':exerciseId')
  @UseGuards(AtGuard)
  @ApiResponseData(SubmissionDto)
  async findOne(
    @CurrentUser() user: JwtPayload,
    @Param('exerciseId') exerciseId: string,
    @Res() res: Response,
  ) {
    const assignment = await this.submissionsService.findByUserAndExercise(
      user.sub,
      exerciseId,
    );

    return res.status(HttpStatus.OK).send(
      GetResponse({
        dataType: SubmissionDto,
        data: assignment,
      }),
    );
  }
}
