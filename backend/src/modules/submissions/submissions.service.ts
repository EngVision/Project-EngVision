import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SubmissionDto } from './dto/submission.dto';
import {
  QuestionResult,
  Submission,
  SubmissionDocument,
} from './schemas/submission.schema';
import { Order, Role } from 'src/common/enums';
import { QueryDto } from 'src/common/dto/query.dto';
import { GradingDto } from './dto/grading.dto';

@Injectable()
export class SubmissionsService {
  constructor(
    @InjectModel(Submission.name) private submissionModel: Model<Submission>,
  ) {}

  async update(
    userId: string,
    exerciseId: string,
    submissionDto: SubmissionDto,
  ): Promise<SubmissionDto> {
    const submission = await this.findByUserAndExercise(userId, exerciseId);

    let detail: QuestionResult[] = [];
    if (submission) {
      detail = submission.detail;
    }

    //Add or update question result
    const [result] = submissionDto.detail;
    const i = detail.findIndex(
      value => value.question.toString() === result.question.toString(),
    );
    if (i > -1) detail[i] = result;
    else detail.push(result);

    submissionDto.detail = detail;
    submissionDto.totalCorrect = submissionDto.detail.reduce(
      (prev, questionResult) => (questionResult.isCorrect ? prev + 1 : prev),
      0,
    );
    submissionDto.totalDone = submissionDto.detail.length;

    if (!submissionDto.needGrade) {
      submissionDto.grade =
        (submissionDto.totalCorrect / submissionDto.totalDone) * 10;
    }

    console.log(submissionDto);

    const newAssignment = await this.submissionModel.findOneAndUpdate(
      {
        user: userId,
        exercise: exerciseId,
      },
      { ...submissionDto },
      {
        upsert: true,
        new: true,
      },
    );

    return {
      ...newAssignment,
      progress: Math.round(
        newAssignment.totalDone / newAssignment.totalQuestion,
      ),
    };
  }

  async findByUserAndExercise(
    userId: string,
    exerciseId: string,
  ): Promise<SubmissionDto> {
    const submission = await this.submissionModel.findOne({
      user: userId,
      exercise: exerciseId,
    });

    if (!submission) {
      return null;
    }

    return {
      ...submission.toObject(),
      progress: +(submission.totalDone / submission.totalQuestion).toPrecision(
        2,
      ),
    };
  }

  async findByUser(
    query: QueryDto,
    userId: string,
    roles: Role[],
  ): Promise<[SubmissionDocument[], number]> {
    const documentQuery = {
      skip: query.page * query.limit,
      limit: query.limit,
      sort: { [query.sortBy]: query.order === Order.asc ? 1 : -1 },
    };

    if (roles.includes(Role.Teacher)) {
      const submissions = await this.submissionModel.find(
        {
          teacher: userId,
          needGrade: true,
        },
        null,
        documentQuery,
      );
      const total = await this.submissionModel.countDocuments({
        teacher: userId,
        needGrade: true,
      });

      return [submissions, total];
    }

    const submissions = await this.submissionModel.find(
      {
        user: userId,
      },
      null,
      documentQuery,
    );
    const total = await this.submissionModel.countDocuments({
      user: userId,
    });

    return [submissions, total];
  }

  async findOne(id: string): Promise<SubmissionDocument> {
    const submission = await this.submissionModel.findById(id);

    if (!submission) {
      throw new NotFoundException('Submission not found');
    }

    return submission;
  }

  async gradeSubmission(
    submissionId: string,
    questionId: string,
    gradingDto: GradingDto,
    userId: string,
  ) {
    const submission = await this.submissionModel.findById(submissionId);

    if (!submission || submission.teacher.toString() !== userId) {
      throw new NotFoundException('Submission not found');
    }

    const { detail } = submission;

    const i = detail.findIndex(
      value => value.question.toString() === questionId,
    );

    submission.detail[i].grade = gradingDto.grade;
    submission.detail[i].explanation = gradingDto.feedback;

    submission.grade =
      submission.detail.reduce((accumulator, q) => q.grade + accumulator, 0) /
      submission.detail.length;

    await submission.save();

    return submission;
  }
}
