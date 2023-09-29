import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import mongoose, { Model } from 'mongoose';
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
  SectionDto,
  LessonDto,
  CourseDetailDto,
} from './dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name)
    private readonly courseModel: Model<CourseDocument>,
    private readonly reviewsService: ReviewsService,
    private readonly filesService: FilesService,
  ) {}

  async createCourse(course: CreateCourseDto, teacher: string) {
    const newCourse = new this.courseModel({ ...course, teacher });
    await newCourse.save();
    return await this.getCourse(newCourse.id);
  }

  // + sum people enroll + filter tags
  async getAll(data: SearchCourseDto) {
    const keyword = { $regex: new RegExp(data.keyword, 'i') };
    const dataFilter: mongoose.FilterQuery<any> = {};

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

    const result: any = await this.courseModel.aggregate([
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
            { $and: [dataFilter] },
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
      return {
        ...plainToInstance(CourseDto, course),
        avgStar: course.reviews[0]
          ? course.reviews[0].avgStar.toFixed(1)
          : null,
      };
    });

    return [courses, result[0].total[0].count];
  }

  // add sections - lessons
  async getCourse(id: string) {
    const course = (await this.courseModel
      .findOne({ _id: id })
      .populate('teacher')
      .populate({
        path: 'reviews',
        populate: { path: 'user' },
      })) as any;

    const courseMap = {
      ...plainToInstance(CourseDetailDto, course.toObject()),
      avgStar: this.reviewsService.averageStar(course.reviews),
    };

    return courseMap;
  }

  async updateCourse(
    id: string,
    teacherId: string,
    updateCourse: UpdateCourseDto,
  ) {
    const oldCourse = await this.courseModel.findById(id);

    if (String(oldCourse.teacher) !== teacherId) {
      throw new ForbiddenException('Access denied');
    }

    if (updateCourse.thumbnail) {
      await this.filesService.remove(oldCourse.thumbnail, teacherId);
    }

    await this.courseModel.findOneAndUpdate({ _id: id }, updateCourse);

    return this.getCourse(id);
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

  courseSectionLessonMap(course: CourseDocument) {
    return {
      ...plainToInstance(CourseDto, course.toObject()),
      sections: course.sections.map(section => {
        return {
          ...plainToInstance(SectionDto, section.toObject()),
          lessons: section.lessons.map(lesson =>
            plainToInstance(LessonDto, lesson.toObject()),
          ),
        };
      }),
    };
  }
}
