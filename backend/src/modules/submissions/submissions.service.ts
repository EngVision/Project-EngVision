import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SubmissionDto } from './dto/submission.dto';
import {
  QuestionResult,
  Submission,
  SubmissionDocument,
} from './schemas/submission.schema';

@Injectable()
export class SubmissionsService {
  constructor(
    @InjectModel(Submission.name) private assignmentModel: Model<Submission>,
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

    const newAssignment = await this.assignmentModel.findOneAndUpdate(
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
    const submission = await this.assignmentModel.findOne({
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

  async findByUser(userId: string): Promise<SubmissionDocument[]> {
    const assignments = await this.assignmentModel.find({
      user: userId,
    });

    return assignments;
  }

  async findOne(id: string): Promise<SubmissionDocument> {
    const assignment = await this.assignmentModel.findById(id);

    if (!assignment) {
      throw new NotFoundException('Assignment not found');
    }

    return assignment;
  }
}
