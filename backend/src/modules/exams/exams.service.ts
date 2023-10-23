import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Exam, ExamDocument } from './schemas/exam.schema';
import { Model } from 'mongoose';

@Injectable()
export class ExamsService {
  constructor(
    @InjectModel(Exam.name)
    private readonly examModel: Model<ExamDocument>,
  ) {}

  async create(createExamDto: CreateExamDto): Promise<ExamDocument> {
    const newExam = new this.examModel(createExamDto);

    return await newExam.save();
  }

  async findAll(): Promise<ExamDocument[]> {
    const exams = await this.examModel.find();

    return exams;
  }

  async findOne(id: string): Promise<ExamDocument> {
    const exam = await this.examModel.findById(id);

    if (!exam) {
      throw new NotFoundException(`Exam #${id} not found`);
    }

    return await exam.populate('parts');
  }

  async update(
    id: string,
    updateExamDto: UpdateExamDto,
  ): Promise<ExamDocument> {
    const updatedExam = await this.examModel.findByIdAndUpdate(
      id,
      updateExamDto,
    );

    if (!updatedExam) {
      throw new NotFoundException(`Exam #${id} not found`);
    }

    return updatedExam;
  }

  async remove(id: string) {
    await this.examModel.findByIdAndDelete(id);
  }
}
