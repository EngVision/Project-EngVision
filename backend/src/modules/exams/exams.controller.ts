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
import { Response } from 'express';
import { GetResponse } from 'src/common/dto';
import { Role } from 'src/common/enums';
import { AtGuard, RoleGuard } from 'src/common/guards';
import { CreateExamDto } from './dto/create-exam.dto';
import { ExamDto } from './dto/exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { ExamsService } from './exams.service';
import { ApiResponseData } from 'src/common/decorators';
import { GetResponseList } from 'src/common/dto/paginated-response.dto';
import { ApiTags } from '@nestjs/swagger';
import { ExamDetailDto } from './dto/exam-detail.dto';

@ApiTags('Exams')
@Controller('exams')
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}

  @Post()
  @UseGuards(AtGuard, RoleGuard(Role.Teacher))
  @ApiResponseData(ExamDto)
  async create(@Body() createExamDto: CreateExamDto, @Res() res: Response) {
    const exam = await this.examsService.create(createExamDto);

    return res.status(HttpStatus.CREATED).send(
      GetResponse({
        dataType: ExamDto,
        data: exam,
      }),
    );
  }

  @Get()
  async findAll(@Res() res: Response) {
    const exams = await this.examsService.findAll();

    return res.status(HttpStatus.CREATED).send(
      GetResponseList({
        dataType: ExamDto,
        data: exams,
        limit: 0,
        offset: 0,
        total: 0,
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

  @Delete(':id')
  @ApiResponseData(ExamDto)
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.examsService.remove(id);

    return res
      .status(HttpStatus.OK)
      .send(GetResponse({ message: 'Exam deleted' }));
  }
}
