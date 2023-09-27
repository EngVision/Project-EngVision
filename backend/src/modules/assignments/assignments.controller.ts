import { Controller, Get, HttpStatus, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ApiResponseData, CurrentUser } from 'src/common/decorators';
import { GetResponseList } from 'src/common/dto/paginated-response.dto';
import { AtGuard } from 'src/common/guards';
import { JwtPayload } from '../auth/types';
import { AssignmentsService } from './assignments.service';
import { AssignmentDto } from './dto/assignment.dto';

@ApiTags('Assignments')
@Controller('assignments')
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  @Get()
  @UseGuards(AtGuard)
  @ApiResponseData(AssignmentDto)
  async getAll(@CurrentUser() user: JwtPayload, @Res() res: Response) {
    const assignments = await this.assignmentsService.findByUser(user.sub);

    return res.status(HttpStatus.OK).send(
      GetResponseList({
        dataType: AssignmentDto,
        data: assignments,
        limit: 0,
        offset: 0,
        total: 0,
      }),
    );
  }
}
