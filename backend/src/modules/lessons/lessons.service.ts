import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from 'src/common/enums';
import { JwtPayload } from '../auth/types';
import { Course, CourseDocument } from '../courses/schemas/course.schema';
import { ExercisesService } from '../exercises/exercises.service';
import { AddLessonDto } from './dto/add-lesson.dto';

@Injectable()
export class LessonsService {
  constructor(
    @InjectModel(Course.name)
    private readonly courseModel: Model<CourseDocument>,
    private readonly exercisesService: ExercisesService,
  ) {}

  async get(user: JwtPayload) {
    var condition: any = { teacher: user.sub };

    if (user.roles.includes(Role.Admin)) {
      condition = { $or: [condition, { isAdminCurriculum: true }] };
    }

    const courseLessons = await this.courseModel.find(condition).select({
      title: 1,
      sections: 1,
      lessons: 1,
    });

    return courseLessons;
  }

  async addLessons(addLessonDto: AddLessonDto) {
    console.log(addLessonDto);

    for (const { title, exercises, materials } of addLessonDto.lessons) {
      const lesson = (
        await this.courseModel.findOneAndUpdate(
          {
            _id: addLessonDto.courseId,
            'sections._id': addLessonDto.sectionId,
          },
          { $push: { 'sections.$.lessons': { title } } },
          { new: true },
        )
      ).sections
        .find(section => section._id == addLessonDto.sectionId)
        .lessons.at(-1);

      for (const exerciseId of exercises) {
        const exercise = await this.exercisesService.clone(
          exerciseId,
          addLessonDto.courseId,
        );

        await this.courseModel.findOneAndUpdate(
          {
            'sections.lessons._id': lesson._id,
          },
          { $push: { 'sections.$.lessons.$[index].exercises': exercise._id } },
          { arrayFilters: [{ 'index._id': lesson._id }], new: true },
        );
      }

      for (const materialId of materials) {
        await this.courseModel.findOneAndUpdate(
          {
            'sections.lessons._id': lesson._id,
          },
          { $push: { 'sections.$.lessons.$[index].materials': materialId } },
          { arrayFilters: [{ 'index._id': lesson._id }], new: true },
        );
      }
    }

    const course = await this.courseModel
      .findById(addLessonDto.courseId)
      .select({
        title: 1,
        sections: 1,
        lessons: 1,
      });

    return course;
  }
}
