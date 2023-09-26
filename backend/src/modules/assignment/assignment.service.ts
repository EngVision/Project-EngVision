import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Assignment, QuestionResult } from './schemas/assignment.schema';
import { Model } from 'mongoose';
import { AssignmentDto } from './dto/assignment.dto';

@Injectable()
export class AssignmentService {
  constructor(
    @InjectModel(Assignment.name) private assignmentModel: Model<Assignment>,
  ) {}

  async update(
    userId: string,
    exerciseId: string,
    assignmentDto: AssignmentDto,
  ) {
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

  async findByUserAndExercise(userId: string, exerciseId: string) {
    const assignment = await this.assignmentModel.findOne({
      user: userId,
      exercise: exerciseId,
    });

    if (!assignment) {
      return null;
    }

    return assignment;
  }

  async findOne(id: string) {
    const assignment = await this.assignmentModel.findById(id);

    if (!assignment) {
      return null;
    }

    return assignment;
  }
}
