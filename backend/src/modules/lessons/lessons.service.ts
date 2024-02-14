import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Document, Model } from 'mongoose';
import { Role } from 'src/common/enums';
import { JwtPayload } from '../auth/types';
import { CoursesService } from '../courses/courses.service';
import { Course, CourseDocument } from '../courses/schemas/course.schema';
import { ExerciseContentServiceFactory } from '../exercise-content/exercise-content-factory.service';
import { ExercisesService } from '../exercises/exercises.service';
import { AddLessonDto } from './dto/add-lesson.dto';
import { ImportLessonDto } from './dto/import-lesson.dto';
import { Exercise } from '../exercises/schemas/exercise.schema';

@Injectable()
export class LessonsService {
  constructor(
    @InjectModel(Course.name)
    private readonly courseModel: Model<CourseDocument>,
    @InjectModel(Exercise.name) private exerciseModel: Model<Exercise>,
    private readonly exerciseContentServiceFactory: ExerciseContentServiceFactory,
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

  async exportLesson(id: string) {
    const course = await this.courseModel
      .findOne({
        'sections.lessons._id': id,
      })
      .populate(`sections.lessons.exercises`);

    const lesson = course.sections
      .filter(section => section.lessons.some(lesson => lesson._id == id))[0]
      .lessons.filter(lesson => lesson._id == id)[0];

    const exercises = lesson.exercises.map((exercise: any) => ({
      ...exercise.toObject(),
      content: exercise.content.map(content => content.toString()),
    }));

    return {
      ...lesson.toObject(),
      exercises,
    };
  }

  async importLesson(
    userId: string,
    courseId: string,
    sectionId: string,
    importLessonDto: ImportLessonDto,
  ) {
    const exercises = await Promise.all(
      importLessonDto.exercises.map(async exercise => {
        const exerciseContentService =
          await this.exerciseContentServiceFactory.createService(exercise.type);
        const exerciseContents = await Promise.all(
          exercise.content.map(async contentId => {
            const content = (await exerciseContentService.getContent(
              contentId,
            )) as Document;
            content._id = new mongoose.Types.ObjectId();
            content.isNew = true;
            content.save();
            return content._id;
          }),
        );

        const newExercise = new this.exerciseModel(exercise);
        newExercise.creator = userId;
        newExercise.content = exerciseContents;
        newExercise.course = courseId;
        return await newExercise.save();
      }),
    );

    return await this.addLesson(courseId, sectionId, {
      title: importLessonDto.title,
      exercises: exercises.map(exercise => exercise._id),
    });
  }

  async addLesson(courseId: string, sectionId: string, lesson: any) {
    return await this.courseModel.findOneAndUpdate(
      {
        _id: courseId,
        'sections._id': sectionId,
      },
      { $push: { 'sections.$.lessons': lesson } },
      { new: true },
    );
  }
}
