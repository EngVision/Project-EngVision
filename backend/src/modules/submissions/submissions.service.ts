import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, Role, SubmissionStatus } from 'src/common/enums';
import { GradingDto } from './dto/grading.dto';
import { SubmissionQueryDto } from './dto/submission-query.dto';
import { SubmissionDto } from './dto/submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';
import {
  QuestionResult,
  Submission,
  SubmissionDocument,
} from './schemas/submission.schema';

@Injectable()
export class SubmissionsService {
  constructor(
    @InjectModel(Submission.name) private submissionModel: Model<Submission>,
  ) {}

  async update(
    userId: string,
    exerciseId: string,
    submissionDto: UpdateSubmissionDto,
  ): Promise<UpdateSubmissionDto> {
    const submission = await this.findByExerciseUser(userId, exerciseId);

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

    const newSubmission = await this.submissionModel.findOneAndUpdate(
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
      ...newSubmission,
      id: newSubmission._id.toString(),
      progress: Math.round(
        newSubmission.totalDone / newSubmission.totalQuestion,
      ),
    };
  }

  async findById(id: string): Promise<SubmissionDto> {
    const submission = await this.submissionModel
      .findOne({ _id: id })
      .populate('exercise', 'title')
      .populate('user', 'firstName lastName avatar')
      .populate('course', 'title sections')
      .populate('teacher', 'firstName lastName');

    if (!submission) {
      return null;
    }

    return this.transformSubmission(submission);
  }

  async findByExerciseUser(userId: string, exerciseId: string) {
    const submission = await this.submissionModel
      .findOne({ user: userId, exercise: exerciseId })
      .populate('exercise', 'title')
      .populate('user', 'firstName lastName avatar')
      .populate('course', 'title sections')
      .populate('teacher', 'firstName lastName');

    if (!submission) {
      return null;
    }

    return this.transformSubmission(submission);
  }

  async findByUser(
    query: SubmissionQueryDto,
    userId: string,
    roles: Role[],
  ): Promise<[SubmissionDto[], number]> {
    const { limit, page, sortBy, order, ...filter } = query;

    const documentQuery = {
      skip: page * limit,
      limit: limit,
      sort: { [sortBy]: order === Order.asc ? 1 : -1 },
    };

    let filterQuery;

    if (roles.includes(Role.Teacher)) {
      filterQuery = {
        ...filter,
        teacher: userId,
        needGrade: true,
        $expr: { $eq: ['$totalDone', '$totalQuestion'] },
      };
    } else {
      filterQuery = {
        ...filter,
        user: userId,
      };
    }

    const submissions = await this.submissionModel
      .find(filterQuery, null, documentQuery)
      .populate('exercise', 'title')
      .populate('user', 'firstName lastName avatar')
      .populate('course', 'title sections')
      .populate('teacher', 'firstName lastName');
    const total = await this.submissionModel.countDocuments(filterQuery);

    const res: SubmissionDto[] = submissions.map(submission =>
      this.transformSubmission(submission),
    );

    return [res, total];
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
    submission.detail[i].explanation = gradingDto.explanation;

    submission.grade =
      submission.detail.reduce((accumulator, q) => q.grade + accumulator, 0) /
      submission.detail.length;

    await submission.save();

    return submission;
  }

  transformSubmission(submission: SubmissionDocument): SubmissionDto {
    let section = null;
    let lesson = null;
    if (submission.course) {
      section = submission.course?.['sections'].find(section =>
        section['lessons'].some(lesson =>
          lesson['exercises'].includes(submission.exercise['_id']),
        ),
      );
      lesson = section?.lessons.find(lesson =>
        lesson['exercises'].includes(submission.exercise['_id']),
      );
    }

    return {
      ...submission.toObject(),
      section: section ? { ...section.toObject() } : null,
      lesson: lesson ? { ...lesson.toObject() } : null,
      progress: +(submission.totalDone / submission.totalQuestion).toPrecision(
        2,
      ),
      status:
        submission.needGrade && submission.detail.every(res => res.grade)
          ? SubmissionStatus.Graded
          : SubmissionStatus.Pending,
    };
  }
}
