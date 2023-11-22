import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  ExamSubmission,
  ExamSubmissionDocument,
} from './schemas/exam-submission.schema';
import { Model } from 'mongoose';
import { ExercisesService } from '../exercises/exercises.service';
import { ExamsService } from '../exams/exams.service';
import { ExamSubmissionDto } from './dto/exam-submission.dto';

@Injectable()
export class ExamSubmissionsService {
  constructor(
    @InjectModel(ExamSubmission.name)
    private readonly examSubmissionModel: Model<ExamSubmissionDocument>,
    private readonly exercisesService: ExercisesService,
    private readonly examsService: ExamsService,
  ) {}

  async createSubmission(
    userId: string,
    examId: string,
  ): Promise<ExamSubmissionDocument> {
    const exam = await this.examsService.findOne(examId);

    const parts = await this.exercisesService.find({
      _id: { $in: exam.parts },
    });

    const submission = new this.examSubmissionModel({
      user: userId,
      exam: examId,
      totalQuestion: parts.reduce(
        (prev, part) => prev + part.content.length,
        0,
      ),
      needGrade: parts.some(part => part.needGrade),
    });

    return await submission.save();
  }

  async submitAnswer(
    userId: string,
    partId: string,
    questionId: string,
    answer: any,
    examId: string,
  ) {
    let examSubmission = await this.examSubmissionModel
      .findOne<ExamSubmissionDocument>({
        user: userId,
        exam: examId,
      })
      .populate('exam');

    if (!examSubmission) {
      examSubmission = await this.createSubmission(userId, examId);
    }

    const result = await this.exercisesService.submitAnswer(
      userId,
      partId,
      questionId,
      answer,
    );

    const { submissions } = examSubmission;

    if (!submissions.includes(result.id)) {
      submissions.push(result.id);
      if (result.isCorrect) {
        examSubmission.totalCorrect += 1;
      }
      examSubmission.totalDone += 1;
      examSubmission.grade = +(
        (examSubmission.totalCorrect / examSubmission.totalDone) *
        10
      ).toPrecision(2);
    }

    await this.examSubmissionModel.findByIdAndUpdate(examSubmission.id, {
      ...examSubmission,
    });

    return result;
  }

  async findAll(userId: string) {
    const submissions = await this.examSubmissionModel
      .find({ user: userId })
      .populate('exam', 'title description')
      .populate('user', 'firstName lastName avatar');

    return submissions.map(submission => ({
      ...submission.toObject(),
      progress: Math.round(submission.totalDone / submission.totalQuestion),
    }));
  }

  async getSubmissionByUser(
    userId: string,
    examId: string,
  ): Promise<ExamSubmissionDto> {
    const submission = await this.examSubmissionModel
      .findOne({ user: userId, exam: examId })
      .populate('exam', 'title description')
      .populate('user', 'firstName lastName avatar');

    if (!submission) {
      throw new NotFoundException('Submission not found');
    }

    return {
      ...submission.toObject(),
      progress: Math.round(submission.totalDone / submission.totalQuestion),
    };
  }

  async getSubmissionById(id: string): Promise<ExamSubmissionDto> {
    const submission = await this.examSubmissionModel
      .findById(id)
      .populate('exam', 'title description')
      .populate('user', 'firstName lastName avatar');

    if (!submission) {
      throw new NotFoundException('Submission not found');
    }

    return {
      ...submission.toObject(),
      progress: Math.round(submission.totalDone / submission.totalQuestion),
    };
  }
}
