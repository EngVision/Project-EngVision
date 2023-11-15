import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Exam, ExamDocument } from './schemas/exam.schema';
import { Model } from 'mongoose';
import { ExercisesService } from '../exercises/exercises.service';
import { CEFRLevel } from 'src/common/enums';
import { shuffleArray } from 'src/common/utils';
import { QueryDto } from 'src/common/dto/query.dto';

@Injectable()
export class ExamsService {
  constructor(
    @InjectModel(Exam.name)
    private readonly examModel: Model<ExamDocument>,
    private readonly exercisesService: ExercisesService,
  ) {}

  async create(
    createExamDto: CreateExamDto,
    creator: string,
  ): Promise<ExamDocument> {
    const newExam = new this.examModel(createExamDto);

    newExam.creator = creator;

    return await newExam.save();
  }

  async findAll(queryDto: QueryDto): Promise<[ExamDocument[], number]> {
    const exams = await this.examModel.find({}, null, {
      skip: queryDto.page * queryDto.limit,
      limit: queryDto.limit,
    });
    const total = await this.examModel.countDocuments({});

    return [exams, total];
  }

  async findOne(id: string): Promise<ExamDocument> {
    const exam = await this.examModel.findById(id);

    if (!exam) {
      throw new NotFoundException(`Exam not found`);
    }

    return await exam.populate('parts', 'id title description');
  }

  async update(
    id: string,
    updateExamDto: UpdateExamDto,
  ): Promise<ExamDocument> {
    const updatedExam = await this.examModel.findByIdAndUpdate(
      id,
      { ...updateExamDto },
      { new: true },
    );

    if (!updatedExam) {
      throw new NotFoundException(`Exam #${id} not found`);
    }

    return updatedExam;
  }

  async remove(id: string) {
    await this.examModel.findByIdAndDelete(id);
  }

  async getEntranceExam(level: CEFRLevel): Promise<ExamDocument> {
    const exercises = await this.exercisesService.getEntranceExercises(level);

    shuffleArray(exercises);

    const newExam = new this.examModel({
      title: 'Entrance Exam',
      description: 'Entrance Exam',
      level: level,
      parts: exercises.slice(0, 4).map(exercise => exercise._id),
    });
    newExam.save();

    return newExam;
  }

  async addPart(id: string, partId: string): Promise<ExamDocument> {
    const exam = await this.examModel.findOneAndUpdate(
      {
        _id: id,
      },
      { $addToSet: { parts: partId } },
      { new: true },
    );

    if (!exam) {
      throw new NotFoundException(`Exam #${id} not found`);
    }

    return exam.populate('parts', 'id title description');
  }

  async removePart(id: string, partId: string): Promise<ExamDocument> {
    const exam = await this.examModel.findOneAndUpdate(
      {
        _id: id,
      },
      { $pull: { parts: partId } },
      { new: true },
    );

    if (!exam) {
      throw new NotFoundException(`Exam #${id} not found`);
    }

    return exam.populate('parts', 'id title description');
  }
}
