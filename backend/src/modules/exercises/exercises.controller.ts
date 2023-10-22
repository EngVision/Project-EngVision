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
import { ApiResponseData, CurrentUser } from 'src/common/decorators';
import { GetResponse } from 'src/common/dto';
import { Role } from 'src/common/enums';
import { AtGuard, RoleGuard } from 'src/common/guards';
import { JwtPayload } from '../auth/types';
import { CreateConstructedResponseDto } from '../exercise-content/constructed-response/dto/create-constructed-response.dto';
import { CreateFillBlankDto } from '../exercise-content/fill-blank/dto/create-fill-blank.dto';
import { CreateMultipleChoiceDto } from '../exercise-content/multiple-choice/dto/create-multiple-choice.dto';
import { QuestionResult } from '../submissions/schemas/submission.schema';
import { CreateExerciseDto, ExerciseDto, UpdateExerciseDto } from './dto';
import { ExercisesService } from './exercises.service';

@Controller('exercises')
@ApiTags('Exercises')
@ApiExtraModels(CreateMultipleChoiceDto)
@ApiExtraModels(CreateFillBlankDto)
@ApiExtraModels(CreateConstructedResponseDto)
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Post()
  @ApiResponseData(ExerciseDto)
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
  @UseGuards(AtGuard)
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
    const exercise = await this.exercisesService.update(
      id,
      updateExerciseDto,
      user.sub,
    );

    return res.status(HttpStatus.OK).send(
      GetResponse({
        dataType: ExerciseDto,
        data: exercise,
        dtoOptions: { groups: user.roles },
      }),
    );
  }

  @Delete(':id')
  @UseGuards(AtGuard, RoleGuard(Role.Teacher))
  async remove(
    @CurrentUser() user: JwtPayload,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    await this.exercisesService.remove(id, user.sub);

    return res
      .status(HttpStatus.OK)
      .send(GetResponse({ message: 'Delete exercise successful' }));
  }
}
