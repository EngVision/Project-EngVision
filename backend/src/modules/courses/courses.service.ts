import {
  Inject,
  Injectable,
  InternalServerErrorException,
  forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Course, CourseDocument } from './schemas/course.schema';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { unlink } from 'fs';
import { ReviewsService } from '../reviews/reviews.service';
import { plainToClass } from 'class-transformer';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(Course.name)
    private readonly courseModel: Model<CourseDocument>,
    @Inject(forwardRef(() => ReviewsService))
    private readonly reviewsService: ReviewsService,
  ) {}

  async createCourse(createCourse: CreateCourseDto) {
    const newCourse = new this.courseModel(createCourse);
    await newCourse.save();
    return newCourse;
  }
  // count avg star + sum people enroll
  async getAll() {
    let courses = (await this.courseModel
      .find({})
      .populate('reviews')
      .exec()) as any;
    courses = courses.map(course => {
      let sumStar = 0;
      course.reviews.forEach(review => {
        sumStar += review.star;
      });
      const courseMap = {
        ...plainToClass(Course, course.toObject()),
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
      .populate('reviews')
      .exec()) as any;
    let sumStar = 0;
    course.reviews.forEach(review => {
      sumStar += review.star;
    });
    const courseMap = {
      ...plainToClass(Course, course.toObject()),
      avgStar: Number((sumStar / course.reviews.length).toFixed(1)),
    };
    if (Number.isNaN(courseMap.avgStar)) delete courseMap['avgStar'];
    delete courseMap['reviews'];
    delete courseMap['sections'];
    delete courseMap['posts'];
    return courseMap;
  }

  async updateCourse(id: string, updateCourse: UpdateCourseDto) {
    if (updateCourse.thumbnail) {
      const oldCourse = await this.courseModel.findById(id);
      await this.deleteThumb(oldCourse.thumbnail);
    }
    const course = await this.courseModel.findOneAndUpdate(
      { _id: id },
      updateCourse,
      { new: true },
    );
    return course;
  }

  async deleteCourse(id: string) {
    const checkExisting = await this.courseModel.findOne({ _id: id });
    if (!checkExisting) return false;
    await this.courseModel.deleteOne({ _id: id });
    return true;
  }

  async deleteThumb(fileName: string) {
    unlink(`upload/courses-thumb/${fileName}`, err => {
      if (err) throw new InternalServerErrorException(err);
    });
  }

  async addReview(id: string, reviewId: string) {
    const course = await this.courseModel.findById(id);
    if (!course) return false;
    course.reviews.push(new mongoose.Types.ObjectId(reviewId));
    await course.save();
    return true;
  }
}
