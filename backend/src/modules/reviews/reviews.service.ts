import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review, ReviewDocument } from './schemas/review.schema';
import { ReviewDto } from './dto/review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review.name)
    private readonly reviewModel: Model<ReviewDocument>,
  ) {}

  async createReview(review: ReviewDto) {
    const newReview = new this.reviewModel(review);
    await newReview.save();
    return newReview;
  }

  async deleteReviewsOfCourse(courseId: string) {
    const deletedReview = await this.reviewModel.deleteMany({
      courseId: courseId,
    });
    return deletedReview;
  }
}
