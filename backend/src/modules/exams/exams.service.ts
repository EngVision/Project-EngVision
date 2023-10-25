import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Exam, ExamDocument } from './schemas/exam.schema';
import { Model } from 'mongoose';
import { ExercisesService } from '../exercises/exercises.service';
import { CEFRLevel } from 'src/common/enums';
import { shuffleArray } from 'src/common/utils';

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

  async findAll(): Promise<ExamDocument[]> {
    const exams = await this.examModel.find();

    return exams;
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

  async getEntranceExam(): Promise<ExamDocument> {
    const exercises = await this.exercisesService.getEntranceExercises(
      CEFRLevel.B2,
    );

    shuffleArray(exercises);

    return new this.examModel({
      title: 'Entrance Exam',
      description: 'Entrance Exam',
      level: CEFRLevel.B2,
      parts: exercises.slice(0, 4).map(exercise => exercise._id),
    });
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
}
