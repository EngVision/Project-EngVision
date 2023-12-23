import { JwtPayload } from './../auth/types/jwt-payload.type';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { ChecklistItems } from 'src/common/constants';
import { Checklist, ChecklistDocument } from './schemas/checklist.schema';
import { CoursesService } from '../courses/courses.service';
import { SubmissionsService } from '../submissions/submissions.service';
import { Role } from 'src/common/enums';

@Injectable()
export class ChecklistService {
  constructor(
    @InjectModel(Checklist.name)
    private checklistModel: Model<ChecklistDocument>,
    private readonly coursesService: CoursesService,
    private readonly submissionsService: SubmissionsService,
  ) {}

  async create(userId: string): Promise<ChecklistDocument> {
    let checklist = await this.checklistModel.findOne({ user: userId });

    if (!checklist) {
      checklist = new this.checklistModel({
        user: userId,
        ...ChecklistItems,
      });
      await checklist.save();
    }

    return checklist;
  }

  async find(userId: string) {
    const checklist = await this.checklistModel.findOne({ user: userId });

    if (!checklist) return await this.create(userId);

    await this.update(userId, checklist);

    return checklist;
  }

  async update(userId: string, checklist: ChecklistDocument) {
    const courses = await this.coursesService.getCoursesExercises({
      sub: userId,
    } as JwtPayload);

    if (courses.length > 0) {
      checklist.items[0].isDone = true;

      checklist.items[1].disabled = false;
      checklist.items[1].link = `/discover/${courses[0].id}?tab=2`;

      checklist.items[2].link = `/discover/${courses[0].id}?tab=3`;

      const [submissions] = await this.submissionsService.findByUser(
        { course: courses[0].id },
        userId,
      );
      if (submissions.length > 0) {
        checklist.items[1].isDone = true;
        checklist.items[2].disabled = false;

        const course = await this.coursesService.getCourse(courses[0].id, {
          sub: userId,
          roles: [Role.Student],
        } as JwtPayload);

        if (course.isReviewed) {
          checklist.items[2].isDone = true;

          checklist.isDone = true;
        }
      }
    }

    await checklist.save();
  }
}
