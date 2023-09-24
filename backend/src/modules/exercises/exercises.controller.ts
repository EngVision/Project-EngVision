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
} from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { GetResponse } from 'src/common/dto';
import { GetResponseList } from 'src/common/dto/paginated-response.dto';
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

  @Get()
  async findAll() {
    const exercises = await this.exercisesService.findAll();

    return GetResponseList({
      dataType: ExerciseDto,
      data: exercises,
      total: 0,
      limit: 0,
      offset: 0,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exercisesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateExerciseDto: UpdateExerciseDto,
  ) {
    return this.exercisesService.update(+id, updateExerciseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exercisesService.remove(+id);
  }
}
