import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Course, CourseDocument } from './schemas/course.schema';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ReviewsService } from '../reviews/reviews.service';
import { plainToInstance } from 'class-transformer';
import { ReviewDto } from '../reviews/dto/review.dto';
import { CourseDto } from './dto/course.dto';
import { FilesService } from '../files/files.service';
import { UserBriefDto } from '../users/dto/user-brief.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name)
    private readonly courseModel: Model<CourseDocument>,
    @Inject(forwardRef(() => ReviewsService))
    private readonly reviewsService: ReviewsService,
    @Inject(forwardRef(() => FilesService))
    private readonly filesService: FilesService,
  ) {}

  async createCourse(course: CreateCourseDto, teacher: string) {
    const newCourse = new this.courseModel({ ...course, teacher });
    await newCourse.save();
    return await this.getCourse(newCourse.id);
  }
  // count avg star + sum people enroll
  async getAll() {
    let courses = (await this.courseModel
      .find({})
      .populate(['reviews', 'teacher'])
      .exec()) as any;

    courses = courses.map(course => {
      let sumStar = 0;
      course.reviews.forEach(review => {
        sumStar += review.star;
      });

      const courseMap = {
        ...plainToInstance(CourseDto, course.toObject()),
        teacher: plainToInstance(UserBriefDto, course.teacher.toObject()),
        avgStar: Number((sumStar / course.reviews.length).toFixed(1)),
      };

      if (Number.isNaN(courseMap.avgStar)) delete courseMap['avgStar'];
      delete courseMap['reviews'];
      delete courseMap['sections'];
      delete courseMap['posts'];

      return courseMap;
    });

    return courses;
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
}
