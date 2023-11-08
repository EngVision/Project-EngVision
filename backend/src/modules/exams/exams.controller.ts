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
import { Response } from 'express';
import { ApiResponseData, CurrentUser } from 'src/common/decorators';
import { GetResponse } from 'src/common/dto';
import { GetResponseList } from 'src/common/dto/paginated-response.dto';
import { QueryDto } from 'src/common/dto/query.dto';
import { Role } from 'src/common/enums';
import { AtGuard, RoleGuard } from 'src/common/guards';
import { JwtPayload } from '../auth/types';
import { ExercisesService } from '../exercises/exercises.service';
import { AddPartDto } from './dto/add-part.dto';
import { CreateExamDto } from './dto/create-exam.dto';
import { EntranceExamQueryDto } from './dto/entrance-exam-query.dto';
import { ExamDetailDto } from './dto/exam-detail.dto';
import { ExamDto } from './dto/exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { ExamsService } from './exams.service';

@ApiTags('Exams')
@Controller('exams')
export class ExamsController {
  constructor(
    private readonly examsService: ExamsService,
    private readonly exercisesService: ExercisesService,
  ) {}

  @Post()
  @UseGuards(AtGuard, RoleGuard(Role.Teacher))
  @ApiResponseData(ExamDto)
  async create(
    @CurrentUser() user: JwtPayload,
    @Body() createExamDto: CreateExamDto,
    @Res() res: Response,
  ) {
    const exam = await this.examsService.create(createExamDto, user.sub);

    return res.status(HttpStatus.CREATED).send(
      GetResponse({
        dataType: ExamDto,
        data: exam,
      }),
    );
  }

  @Get('entrance-exam')
  @ApiResponseData(ExamDto)
  async getEntranceExam(
    @Query() query: EntranceExamQueryDto,
    @Res() res: Response,
  ) {
    const exam = await this.examsService.getEntranceExam(query.level);

    return res.status(HttpStatus.OK).send(
      GetResponse({
        dataType: ExamDto,
        data: exam,
      }),
    );
  }

  @Get()
  async findAll(@Query() queryDto: QueryDto, @Res() res: Response) {
    const [exams, total] = await this.examsService.findAll(queryDto);

    return res.status(HttpStatus.CREATED).send(
      GetResponseList({
        dataType: ExamDto,
        data: exams,
        limit: queryDto.limit,
        offset: queryDto.page,
        total,
      }),
    );
  }

  @Get(':id')
  @ApiResponseData(ExamDetailDto)
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const exam = await this.examsService.findOne(id);

    return res
      .status(HttpStatus.OK)
      .send(GetResponse({ dataType: ExamDetailDto, data: exam }));
  }

  @Patch(':id')
  @ApiResponseData(ExamDetailDto)
  async update(
    @Param('id') id: string,
    @Body() updateExamDto: UpdateExamDto,
    @Res() res: Response,
  ) {
    const exam = await this.examsService.update(id, updateExamDto);

    return res
      .status(HttpStatus.OK)
      .send(GetResponse({ dataType: ExamDetailDto, data: exam }));
  }

  @Post(':id/parts')
  @ApiResponseData(ExamDetailDto)
  async addPart(
    @Param('id') id: string,
    @Body() addPartDto: AddPartDto,
    @Res() res: Response,
  ) {
    const exam = await this.examsService.addPart(id, addPartDto.partId);

    return res
      .status(HttpStatus.OK)
      .send(GetResponse({ dataType: ExamDetailDto, data: exam }));
  }

  @Delete(':id/parts/:partId')
  @ApiResponseData(ExamDetailDto)
  async removePart(
    @Param('id') id: string,
    @Param('partId') partId: string,
    @Res() res: Response,
  ) {
    const exam = await this.examsService.removePart(id, partId);

    return res
      .status(HttpStatus.OK)
      .send(GetResponse({ dataType: ExamDetailDto, data: exam }));
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.examsService.remove(id);

    return res
      .status(HttpStatus.OK)
      .send(GetResponse({ message: 'Exam deleted' }));
  }
}
