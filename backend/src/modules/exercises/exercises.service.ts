import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ExerciseContentServiceFactory } from '../exercise-content/exercise-content-factory.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { Exercise } from './schemas/exercise.schema';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectModel(Exercise.name) private exerciseModel: Model<Exercise>,
    private readonly exerciseContentServiceFactory: ExerciseContentServiceFactory,
  ) {}

  async create(createExerciseDto: CreateExerciseDto): Promise<Exercise> {
    const newExercise = new this.exerciseModel(createExerciseDto);

    const service = await this.exerciseContentServiceFactory.createService(
      createExerciseDto.type,
    );

    const content = await service.createContent(createExerciseDto.content);

    newExercise.content = content;
    await newExercise.save();

    return await newExercise.populate('content');
  }

  async findAll() {
    const exercises = await this.exerciseModel.find({}).populate('content');

    return exercises;
  }

  findOne(id: number) {
    return `This action returns a #${id} exercise`;
  }

  update(id: number, updateExerciseDto: UpdateExerciseDto) {
    return `This action updates a #${id} exercise`;
  }

  remove(id: number) {
    return `This action removes a #${id} exercise`;
  }
}
