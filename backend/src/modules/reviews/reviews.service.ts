import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review, ReviewDocument } from './schemas/review.schema';
import { CreateReviewDto } from './dto/create-review.dto';
import { CoursesService } from '../courses/courses.service';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review.name)
    private readonly reviewModel: Model<ReviewDocument>,
    @Inject(forwardRef(() => CoursesService))
    private readonly courseService: CoursesService,
  ) {}

  async createReview(createReview: CreateReviewDto) {
    const newReview = new this.reviewModel(createReview);
    const isCourseUpdated = await this.courseService.addReview(
      newReview.courseId,
      newReview.id,
    );
    if (!isCourseUpdated) return null;
    await newReview.save();
    return newReview;
  }
}
