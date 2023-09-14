import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReviewsService } from './reviews.service';
import { AtGuard, RoleGuard } from 'src/common/guards';
import { CreateReviewDto } from './dto/create-review.dto';
import { Response } from 'express';
import { plainToClass } from 'class-transformer';
import { Review } from './schemas/review.schema';
import { Role } from './enums';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post('')
  @UseGuards(AtGuard, RoleGuard(Role.Student))
  async createCourse(@Body() review: CreateReviewDto, @Res() res: Response) {
    const newReview = await this.reviewsService.createReview(review);
    if (!newReview)
      return res.status(HttpStatus.BAD_REQUEST).send('Course not found!');
    return res
      .status(HttpStatus.CREATED)
      .send(plainToClass(Review, newReview.toObject()));
  }
}
