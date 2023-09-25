import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import mongoose, { AggregatePaginateModel } from 'mongoose';
import { FilesService } from '../files/files.service';
import { ReviewDto } from '../reviews/dto/review.dto';
import { ReviewsService } from '../reviews/reviews.service';
import { UserBriefDto } from '../users/dto/user-brief.dto';
import { CourseDto } from './dto/course.dto';
import { CreateCourseDto } from './dto/create-course.dto';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { CreateSectionDto } from './dto/create-section.dto';
import { SearchCourseDto } from './dto/search.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course, CourseDocument } from './schemas/course.schema';
import { Lesson } from './schemas/lesson.schema';
import { Section } from './schemas/section.schema';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name)
    private readonly courseModel: AggregatePaginateModel<CourseDocument>,
    @Inject(forwardRef(() => ReviewsService))
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

    const id = new mongoose.Types.ObjectId();
    console.log(id);

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
        teacher: plainToInstance(UserBriefDto, course.teacher),
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

    let sumStar = 0;
    course.reviews.forEach(review => {
      sumStar += review.star;
    });

    const courseMap = {
      ...plainToInstance(CourseDto, course.toObject()),
      avgStar: Number((sumStar / course.reviews.length).toFixed(1)),
      teacher: plainToInstance(UserBriefDto, course.teacher.toObject()),
      reviews: course.reviews.map(review => {
        return {
          ...plainToInstance(ReviewDto, review.toObject()),
          user: plainToInstance(UserBriefDto, review.user.toObject()),
        };
      }),
    };

    if (Number.isNaN(courseMap.avgStar)) delete courseMap['avgStar'];

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

    // remove thumbnail, review, post, lessons, section
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
    const course = await this.courseModel.findById(courseId);

    if (!course) throw new BadRequestException('Course not found');
    if (String(course.teacher) !== teacherId)
      throw new ForbiddenException('Access denied');

    const newSection: Section = {
      ...section,
      id: new mongoose.Types.ObjectId().toString(),
      lessons: [],
    };

    course.sections.push(newSection);
    await course.save();

    return newSection;
  }

  async updateSection(
    updateSection: CreateSectionDto,
    courseId: string,
    sectionId: string,
    teacherId: string,
  ) {
    const course = await this.courseModel.findById(courseId);

    if (!course) throw new BadRequestException('Course not found');
    if (String(course.teacher) !== teacherId)
      throw new ForbiddenException('Access denied');

    const section: Section = course.sections.find(s => s.id === sectionId);
    if (!section) throw new BadRequestException('Section not found');

    section.title = updateSection.title;
    course.markModified('sections');
    await course.save();

    return section;
  }

  async createLesson(
    lesson: CreateLessonDto,
    courseId: string,
    sectionId: string,
    teacherId: string,
  ) {
    const course = await this.courseModel.findById(courseId);

    if (!course) throw new BadRequestException('Course not found');
    if (String(course.teacher) !== teacherId)
      throw new ForbiddenException('Access denied');

    const section: Section = course.sections.find(s => s.id === sectionId);
    if (!section) throw new BadRequestException('Section not found');

    const newLesson: Lesson = {
      ...lesson,
      id: new mongoose.Types.ObjectId().toString(),
      exercises: [],
    };

    section.lessons.push(newLesson);
    course.markModified('sections');
    await course.save();

    return newLesson;
  }
}
