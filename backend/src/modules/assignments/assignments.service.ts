import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AssignmentDto } from './dto/assignment.dto';
import {
  Assignment,
  AssignmentDocument,
  QuestionResult,
} from './schemas/assignment.schema';

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectModel(Assignment.name) private assignmentModel: Model<Assignment>,
  ) {}

  async update(
    userId: string,
    exerciseId: string,
    assignmentDto: AssignmentDto,
  ): Promise<AssignmentDocument> {
    const assignment = await this.findByUserAndExercise(userId, exerciseId);

    let detail: QuestionResult[] = [];
    if (assignment) {
      detail = assignment.detail;
    }

    //Add or update question result
    const [result] = assignmentDto.detail;
    const i = detail.findIndex(
      value => value.question.toString() === result.question.toString(),
    );
    if (i > -1) detail[i] = result;
    else detail.push(result);

    assignmentDto.detail = detail;
    assignmentDto.totalCorrect = assignmentDto.detail.reduce(
      (prev, questionResult) => (questionResult.isCorrect ? prev + 1 : prev),
      0,
    );
    assignmentDto.totalDone = assignmentDto.detail.length;

    const newAssignment = await this.assignmentModel.findOneAndUpdate(
      {
        user: userId,
        exercise: exerciseId,
      },
      { ...assignmentDto },
      {
        upsert: true,
        new: true,
      },
    );

    return newAssignment;
  }

  async findByUserAndExercise(
    userId: string,
    exerciseId: string,
  ): Promise<AssignmentDocument> {
    const assignment = await this.assignmentModel.findOne({
      user: userId,
      exercise: exerciseId,
    });

    if (!assignment) {
      return null;
    }

    return assignment;
  }

  async findByUser(userId: string): Promise<AssignmentDocument[]> {
    const assignments = await this.assignmentModel.find({
      user: userId,
    });

    return assignments;
  }

  async findOne(id: string): Promise<AssignmentDocument> {
    const assignment = await this.assignmentModel.findById(id);

    if (!assignment) {
      throw new NotFoundException('Assignment not found');
    }

    return assignment;
  }
}
