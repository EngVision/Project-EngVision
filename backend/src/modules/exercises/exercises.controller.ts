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
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CurrentUser } from 'src/common/decorators';
import { GetResponse } from 'src/common/dto';
import { AtGuard } from 'src/common/guards';
import { QuestionResult } from '../assignments/schemas/assignment.schema';
import { JwtPayload } from '../auth/types';
import { CreateMultipleChoiceDto } from '../exercise-content/multiple-choice/dto/create-multiple-choice.dto';
import { CreateExerciseDto, ExerciseDto, UpdateExerciseDto } from './dto';
import { ExercisesService } from './exercises.service';

@Controller('exercises')
@ApiTags('Exercises')
@ApiExtraModels(CreateMultipleChoiceDto)
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Post()
  async create(
    @Body() createExerciseDto: CreateExerciseDto,
    @Res() res: Response,
  ) {
    const exercise = await this.exercisesService.create(createExerciseDto);

    return res
      .status(HttpStatus.CREATED)
      .send(GetResponse({ dataType: ExerciseDto, data: exercise }));
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const exercise = await this.exercisesService.findOne(id);

    return res
      .status(HttpStatus.OK)
      .send(GetResponse({ dataType: ExerciseDto, data: exercise }));
  }

  @Post(':exerciseId/submit-answer/:questionId')
  @UseGuards(AtGuard)
  async checkAnswer(
    @CurrentUser() user: JwtPayload,
    @Param('exerciseId') exerciseId: string,
    @Param('questionId') questionId: string,
    @Body('answer') answer: any,
    @Res() res: Response,
  ) {
    const result = await this.exercisesService.checkAnswer(
      user.sub,
      exerciseId,
      questionId,
      answer,
    );

    return res
      .status(HttpStatus.OK)
      .send(GetResponse({ dataType: QuestionResult, data: result }));
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateExerciseDto: UpdateExerciseDto,
    @Res() res: Response,
  ) {
    const exercise = await this.exercisesService.update(id, updateExerciseDto);

    return res
      .status(HttpStatus.OK)
      .send(GetResponse({ dataType: ExerciseDto, data: exercise }));
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.exercisesService.remove(id);

    return res
      .status(HttpStatus.OK)
      .send(GetResponse({ message: 'Delete exercise successful' }));
  }
}
