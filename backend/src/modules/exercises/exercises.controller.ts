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
import { AtGuard, RoleGuard } from 'src/common/guards';
import { QuestionResult } from '../assignments/schemas/assignment.schema';
import { JwtPayload } from '../auth/types';
import { CreateMultipleChoiceDto } from '../exercise-content/multiple-choice/dto/create-multiple-choice.dto';
import { CreateExerciseDto, ExerciseDto, UpdateExerciseDto } from './dto';
import { ExercisesService } from './exercises.service';
import { Role } from 'src/common/enums';
import { CreateFillBlankDto } from '../exercise-content/fill-blank/dto';
import { CreateConstructedResponseDto } from '../exercise-content/constructed-response/dto/create-constructed-response.dto';

@Controller('exercises')
@ApiTags('Exercises')
@ApiExtraModels(CreateMultipleChoiceDto)
@ApiExtraModels(CreateFillBlankDto)
@ApiExtraModels(CreateConstructedResponseDto)
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Post()
  @UseGuards(AtGuard, RoleGuard(Role.Teacher))
  async create(
    @CurrentUser() user: JwtPayload,
    @Body() createExerciseDto: CreateExerciseDto,
    @Res() res: Response,
  ) {
    createExerciseDto.creator = user.sub;
    const exercise = await this.exercisesService.create(createExerciseDto);

    return res
      .status(HttpStatus.CREATED)
      .send(GetResponse({ dataType: ExerciseDto, data: exercise }));
  }

  @Get(':id')
  @UseGuards(AtGuard)
  async findOne(
    @CurrentUser() user: JwtPayload,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    const exercise = await this.exercisesService.findOne(id);

    return res.status(HttpStatus.OK).send(
      GetResponse({
        dataType: ExerciseDto,
        data: exercise,
        dtoOptions: { groups: user.roles },
      }),
    );
  }

  @Post(':exerciseId/submit-answer/:questionId')
  @UseGuards(AtGuard, RoleGuard(Role.Student))
  async submitAnswer(
    @CurrentUser() user: JwtPayload,
    @Param('exerciseId') exerciseId: string,
    @Param('questionId') questionId: string,
    @Body('answer') answer: any,
    @Res() res: Response,
  ) {
    const result = await this.exercisesService.submitAnswer(
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
  @UseGuards(AtGuard, RoleGuard(Role.Teacher))
  async update(
    @CurrentUser() user: JwtPayload,
    @Param('id') id: string,
    @Body() updateExerciseDto: UpdateExerciseDto,
    @Res() res: Response,
  ) {
    const exercise = await this.exercisesService.update(id, updateExerciseDto);

    return res.status(HttpStatus.OK).send(
      GetResponse({
        dataType: ExerciseDto,
        data: exercise,
        dtoOptions: { groups: user.roles },
      }),
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.exercisesService.remove(id);

    return res
      .status(HttpStatus.OK)
      .send(GetResponse({ message: 'Delete exercise successful' }));
  }
}
