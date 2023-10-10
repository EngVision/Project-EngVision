import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import mongoose, { Model, Types } from 'mongoose';
import { FilesService } from '../files/files.service';
import { ReviewDto } from '../reviews/dto/review.dto';
import { ReviewsService } from '../reviews/reviews.service';
import { UserBriefDto } from '../users/dto/user-brief.dto';
import { Course, CourseDocument } from './schemas/course.schema';
import {
  UpdateLessonDto,
  CourseDto,
  CreateCourseDto,
  CreateLessonDto,
  CreateSectionDto,
  SearchCourseDto,
  UpdateCourseDto,
  CourseDetailDto,
} from './dto';
import { Role, StatusCourseSearch } from 'src/common/enums';
import { JwtPayload } from '../auth/types';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name)
    private readonly courseModel: Model<CourseDocument>,
    private readonly reviewsService: ReviewsService,
    private readonly filesService: FilesService,
  ) { }

  async createCourse(course: CreateCourseDto, user: JwtPayload) {
    const newCourse = new this.courseModel({ ...course, teacher: user.sub });
    await newCourse.save();
    return await this.getCourse(newCourse.id, user);
  }

  // + sum people enroll + filter tags
  async getAll(data: SearchCourseDto, userId: string) {
    const keyword = { $regex: new RegExp(data.keyword, 'i') };
    const dataFilter: mongoose.FilterQuery<any> = {};

    switch (data.status) {
      case StatusCourseSearch.All:
        dataFilter.isPublished = { $eq: true };
        break;
      case StatusCourseSearch.Attended:
        dataFilter.isPublished = { $eq: true };
        dataFilter.attendanceList = {
          $elemMatch: { $eq: new Types.ObjectId(userId) },
        };
        break;
      case StatusCourseSearch.Draft:
        dataFilter.isPublished = { $eq: false };
        dataFilter['teacher._id'] = { $eq: new Types.ObjectId(userId) };
        break;
      case StatusCourseSearch.Published:
        dataFilter.isPublished = { $eq: true };
        dataFilter['teacher._id'] = { $eq: new Types.ObjectId(userId) };
        break;
    }

    if (data.dateStart || data.dateEnd) {
      dataFilter.createdAt = {};
      if (data.dateStart) dataFilter.createdAt.$gte = new Date(data.dateStart);
      if (data.dateEnd) dataFilter.createdAt.$lte = data.dateEnd;
    }

    if (data.priceMin || data.priceMax) {
      dataFilter.price = {};
      if (data.priceMin) dataFilter.price.$gte = data.priceMin;
      if (data.priceMax) dataFilter.price.$lte = data.priceMax;
    }

    const result = await this.courseModel.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'teacher',
          foreignField: '_id',
          pipeline: [
            {
              $addFields: {
                fullName: {
                  $concat: ['$firstName', ' ', '$lastName'],
                },
              },
            },
          ],
          as: 'teacher',
        },
      },
      { $unwind: '$teacher' },
      {
        $lookup: {
          from: 'reviews',
          localField: 'reviews',
          foreignField: '_id',
          pipeline: [
            {
              $group: {
                _id: '$courseId',
                avgStar: { $avg: '$star' },
              },
            },
          ],
          as: 'reviews',
        },
      },
      {
        $match: {
          $and: [
            { $or: [{ title: keyword }, { 'teacher.fullName': keyword }] },
            dataFilter,
          ],
        },
      },
      {
        $facet: {
          courses: [
            {
              $skip: data.page && data.limit ? (data.page - 1) * data.limit : 0,
            },
            {
              $limit: data.limit ? data.limit : 20,
            },
          ],
          total: [
            {
              $group: {
                _id: null,
                count: {
                  $sum: 1,
                },
              },
            },
          ],
        },
      },
    ]);

    const courses = result[0].courses.map(course => {
      let totalLessons = 0;
      course.sections.forEach(section => {
        totalLessons += section.lessons.length;
      });

      return {
        ...plainToInstance(CourseDto, course),
        avgStar: course.reviews[0]
          ? course.reviews[0].avgStar.toFixed(1)
          : null,
        totalLessons: totalLessons,
      };
    });

    const totalItem = result[0].total.length ? result[0]?.total[0]?.count : 0;
    return [courses, totalItem];
  }

  async getCourse(id: string, user: JwtPayload) {
    let course, courseMap: CourseDetailDto;
    const courseCheck = await this.courseModel.findById(id);

    //Teacher get not own course
    if (
      user.roles.includes(Role.Teacher) &&
      courseCheck.teacher.toString() !== user.sub
    ) {
      throw new ForbiddenException('Access denied');
    }

    // Student not attend course yet
    if (
      user.roles.includes(Role.Student) &&
      !courseCheck.attendanceList.includes(user.sub)
    ) {
      course = await this.courseModel
        .findOne({ _id: id })
        .populate('teacher')
        .populate({
          path: 'reviews',
          populate: { path: 'user' },
        });

      courseMap = {
        ...plainToInstance(CourseDetailDto, course.toObject()),
        isAttended: false,
      };

      courseMap.sections.forEach(section => {
        section.lessons.forEach(lesson => {
          delete lesson.exercises;
        });
      });
    }
    // Student enrolled or teacher's course or admin
    else {
      course = await this.courseModel
        .findOne({ _id: id })
        .populate('teacher')
        .populate({
          path: 'reviews',
          populate: { path: 'user' },
        })
        .populate('sections.lessons.exercises', 'id title');

      if (user.roles.includes(Role.Student)) {
        courseMap = {
          ...plainToInstance(CourseDetailDto, course.toObject()),
          isAttended: true,
          isReviewed: !!course.reviews.find(
            review => review.user.id === user.sub,
          ),
        };
      } else courseMap = plainToInstance(CourseDetailDto, course.toObject());
    }

    courseMap.avgStar = this.reviewsService.averageStar(course.reviews);

    return courseMap;
  }

  async updateCourse(
    id: string,
    user: JwtPayload,
    updateCourse: UpdateCourseDto,
  ) {
    const oldCourse = await this.courseModel.findById(id);

    if (String(oldCourse.teacher) !== user.sub) {
      throw new ForbiddenException('Access denied');
    }

    await this.courseModel.findOneAndUpdate({ _id: id }, updateCourse);

    return this.getCourse(id, user);
  }

  async deleteCourse(id: string, teacherId: string) {
    const course = await this.courseModel.findOne({ _id: id });

    if (!course) throw new BadRequestException('Course not found');
    if (String(course.teacher) !== teacherId)
      throw new ForbiddenException('Access denied');

    // remove thumbnail, review, post
    if (course.thumbnail) {
      await this.filesService.remove(course.thumbnail, teacherId);
    }
    if (!!course.reviews.length) {
      await this.reviewsService.deleteReviewsOfCourse(course.id);
    }

    await this.courseModel.deleteOne({ _id: id });
    return true;
  }

  async createReview(review: ReviewDto) {
    const course = await this.courseModel.findById(review.courseId);

    if (!course) throw new BadRequestException('Course not found');
    if (!course.attendanceList.includes(review.user))
      throw new ConflictException('You have not attended this course');

    const newReview = await this.reviewsService.createReview(review);

    await this.addReview(course, newReview.id);

    return newReview;
  }

  async addReview(course: CourseDocument, reviewId: string) {
    course.reviews.push(new mongoose.Types.ObjectId(reviewId));
    await course.save();
  }

  async createSection(
    section: CreateSectionDto,
    courseId: string,
    teacherId: string,
  ) {
    const course = await this.courseModel.findOneAndUpdate(
      {
        _id: courseId,
        teacher: teacherId,
      },
      { $push: { sections: section } },
      { new: true },
    );

    if (!course)
      throw new BadRequestException('Course ID not found or access denied');

    return course;
  }

  async updateSection(
    updateSection: CreateSectionDto,
    courseId: string,
    sectionId: string,
    teacherId: string,
  ) {
    const course = await this.courseModel.findOneAndUpdate(
      {
        _id: courseId,
        teacher: teacherId,
        'sections._id': sectionId,
      },
      { $set: { 'sections.$': updateSection } },
      { new: true },
    );

    if (!course)
      throw new BadRequestException(
        'Course ID or section ID is either missing or access denied',
      );

    return course;
  }

  async removeSection(courseId: string, sectionId: string, teacherId: string) {
    const course = await this.courseModel.findOneAndUpdate(
      {
        _id: courseId,
        teacher: teacherId,
        'sections._id': sectionId,
      },
      { $pull: { sections: { _id: sectionId } } },
      { new: true },
    );

    if (!course)
      throw new BadRequestException(
        'Course ID or section ID is either missing or access denied',
      );

    return course;
  }

  async createLesson(
    lesson: CreateLessonDto,
    courseId: string,
    sectionId: string,
    teacherId: string,
  ) {
    const course = await this.courseModel.findOneAndUpdate(
      {
        _id: courseId,
        teacher: teacherId,
        'sections._id': sectionId,
      },
      { $push: { 'sections.$.lessons': lesson } },
      { new: true },
    );

    if (!course)
      throw new BadRequestException(
        'Course ID or section ID is either missing or access denied',
      );

    return course;
  }

  async updateLesson(
    updateLesson: UpdateLessonDto,
    courseId: string,
    sectionId: string,
    lessonId: string,
    teacherId: string,
  ) {
    const course = await this.courseModel.findOneAndUpdate(
      {
        _id: courseId,
        teacher: teacherId,
        'sections._id': sectionId,
        'sections.lessons._id': lessonId,
      },
      { $set: { 'sections.$.lessons.$[index]': updateLesson } },
      { arrayFilters: [{ 'index._id': lessonId }], new: true },
    );

    if (!course)
      throw new BadRequestException(
        'Course ID, section ID or lessonID is either missing or access denied',
      );

    return course;
  }

  async removeLesson(
    courseId: string,
    sectionId: string,
    lessonId: string,
    teacherId: string,
  ) {
    const course = await this.courseModel.findOneAndUpdate(
      {
        _id: courseId,
        teacher: teacherId,
        'sections._id': sectionId,
        'sections.lessons._id': lessonId,
      },
      { $pull: { 'sections.$.lessons': { _id: lessonId } } },
      { new: true },
    );

    if (!course)
      throw new BadRequestException(
        'Course ID, section ID or lessonID is either missing or access denied',
      );

    return course;
  }

  async createExercise(
    exerciseId: string,
    lessonId: string,
    teacherId: string,
  ) {
    const course = await this.courseModel.findOneAndUpdate(
      {
        teacher: teacherId,
        'sections.lessons._id': lessonId,
      },
      { $push: { 'sections.$.lessons.$[index].exercises': exerciseId } },
      { arrayFilters: [{ 'index._id': lessonId }], new: true },
    );

    if (!course)
      throw new BadRequestException('Lesson ID is missing or access denied');

    return course;
  }

  async removeExercise(
    exerciseId: string,
    lessonId: string,
    teacherId: string,
  ) {
    const course = await this.courseModel.findOneAndUpdate(
      {
        teacher: teacherId,
        'sections.lessons._id': lessonId,
        'sections.lessons.exercises': {
          $elemMatch: { $eq: exerciseId },
        },
      },
      { $pull: { 'sections.$.lessons.$[index].exercises': exerciseId } },
      { arrayFilters: [{ 'index._id': lessonId }], new: true },
    );

    if (!course)
      throw new BadRequestException(
        'Lesson ID or exercise ID is either missing or access denied',
      );

    const newLesson = await this.getLesson(lessonId, teacherId);

    return newLesson;
  }

  async getLesson(lessonId: string, teacherId: string) {
    const [lesson] = await this.courseModel.aggregate([
      {
        $match: {
          $and: [
            { teacher: new Types.ObjectId(teacherId) },
            { 'sections.lessons._id': new Types.ObjectId(lessonId) },
          ],
        },
      },
      {
        $unwind: '$sections',
      },
      {
        $match: {
          'sections.lessons._id': new Types.ObjectId(lessonId),
        },
      },
      {
        $unwind: '$sections.lessons',
      },
      {
        $match: {
          'sections.lessons._id': new Types.ObjectId(lessonId),
        },
      },
      {
        $replaceRoot: {
          newRoot: '$sections.lessons',
        },
      },
      {
        $lookup: {
          from: 'exercises',
          localField: 'exercises',
          foreignField: '_id',
          pipeline: [{ $project: { _id: 1, title: 1, description: 1 } }],
          as: 'exercises',
        },
      },
    ]);

    if (!lesson) {
      throw new BadRequestException(
        'Course ID, section ID or lessonID is either missing or access denied',
      );
    }

    return lesson;
  }

  async attendCourse(courseId: string, studentId: string) {
    const course = await this.courseModel.findById(courseId);

    if (!course) throw new BadRequestException('Course not found');
    if (course.attendanceList.includes(studentId))
      throw new ConflictException('You have already attended this course');

    course.attendanceList.push(studentId);
    await course.save();

    return true;
  }

  async getAttendanceList(courseId: string, teacherId: string) {
    const course = (await this.courseModel
      .findOne({ _id: courseId })
      .populate('attendanceList')) as any;

    if (!course) throw new BadRequestException('Course not found');
    if (String(course.teacher) !== teacherId)
      throw new ForbiddenException('Access denied');

    const attendanceList = course.attendanceList.map(student =>
      plainToInstance(UserBriefDto, student.toObject()),
    );

    return attendanceList;
  }

  async publishCourse(courseId: string, teacherId: string) {
    const course = await this.courseModel.findById(courseId);

    if (!course) throw new BadRequestException('Course not found');
    if (String(course.teacher) !== teacherId)
      throw new ForbiddenException('Access denied');

    course.isPublished = true;
    await course.save();

    return true;
  }
}
