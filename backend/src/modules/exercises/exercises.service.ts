import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CEFRLevel, Role } from 'src/common/enums';
import { ExerciseContentServiceFactory } from '../exercise-content/exercise-content-factory.service';
import { QuestionResult } from '../submissions/schemas/submission.schema';
import { SubmissionsService } from '../submissions/submissions.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { Exercise, ExerciseDocument } from './schemas/exercise.schema';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectModel(Exercise.name) private exerciseModel: Model<Exercise>,
    private readonly exerciseContentServiceFactory: ExerciseContentServiceFactory,
    private readonly submissionsService: SubmissionsService,
  ) {}

  async create(
    createExerciseDto: CreateExerciseDto,
  ): Promise<ExerciseDocument> {
    const newExercise = new this.exerciseModel(createExerciseDto);

    const service = await this.exerciseContentServiceFactory.createService(
      createExerciseDto.type,
    );

    const content = await service.createContent(createExerciseDto.content);

    newExercise.content = content;
    await newExercise.save();

    return await newExercise.populate('content');
  }

  async find(
    query: UpdateExerciseDto = {},
    roles?: Role[],
  ): Promise<ExerciseDocument[]> {
    if (roles && roles.includes(Role.Admin)) {
      const exercises = await this.exerciseModel.aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'creator',
            foreignField: '_id',
            as: 'creator',
          },
        },
        {
          $match: {
            'creator.role': Role.Admin,
          },
        },
      ]);

      return exercises.map(exercise => ({
        ...exercise,
        creator: exercise.creator[0]._id,
      }));
    }

    const exercises = await this.exerciseModel.find(query);

    return exercises;
  }

  async findOne(id: string): Promise<ExerciseDocument> {
    const exercise = await this.exerciseModel.findById(id).populate('content');

    if (!exercise) {
      throw new NotFoundException('Exercise not found');
    }

    return exercise;
  }

  async update(
    id: string,
    updateExerciseDto: UpdateExerciseDto,
    userId: string,
  ): Promise<ExerciseDocument> {
    const exercise = await this.exerciseModel.findById(id);

    if (!exercise || exercise.creator.toString() !== userId) {
      throw new NotFoundException('Exercise not found');
    }

    const service = await this.exerciseContentServiceFactory.createService(
      exercise.type,
    );

    const prevQuestions = exercise.content.map(id => id.toString());
    const currQuestions = updateExerciseDto.content.map(({ id }) => id);
    const removedQuestions = prevQuestions.filter(
      id => !currQuestions.includes(id),
    );

    const content = await service.updateContent(
      updateExerciseDto.content,
      removedQuestions,
    );

    const updatedExercise = await this.exerciseModel.findByIdAndUpdate(
      id,
      {
        ...updateExerciseDto,
        content: content,
      },
      { new: true },
    );

    return updatedExercise.populate('content');
  }

  async remove(id: string, userId: string): Promise<void> {
    const exercise = await this.exerciseModel.findById(id);

    if (!exercise || exercise.creator.toString() !== userId) {
      throw new NotFoundException('Exercise not found');
    }

    const service = await this.exerciseContentServiceFactory.createService(
      exercise.type,
    );

    await service.deleteContent(exercise.content);
    await exercise.deleteOne();
  }

  async getEntranceExercises(level: CEFRLevel): Promise<ExerciseDocument[]> {
    const exercises = await this.exerciseModel.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'creator',
          foreignField: '_id',
          as: 'creator',
        },
      },
      {
        $match: {
          level: level,
          'creator.role': Role.Teacher,
        },
      },
    ]);

    return exercises;
  }

  async submitAnswer(
    userId: string,
    exerciseId: string,
    questionId: string,
    answer: any,
  ): Promise<QuestionResult> {
    const exercise = await this.findOne(exerciseId);

    const service = await this.exerciseContentServiceFactory.createService(
      exercise.type,
    );

    console.log(exercise);

    const result = await service.checkAnswer(questionId, answer);

    await this.submissionsService.update(userId, exercise.id, {
      user: userId,
      exercise: exerciseId,
      exerciseType: exercise.type,
      totalQuestion: exercise.content.length,
      detail: [result],
      teacher: exercise.creator,
      needGrade: exercise.needGrade,
      course: exercise.course,
    });

    return result;
  }
}
