import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CoursesService } from '../courses/courses.service';
import { PaymentsService } from '../payment/payments.service';
@Injectable()
export class EnrollCourseService {
  constructor(
    private readonly coursesService: CoursesService,
    private readonly paymentsService: PaymentsService,
  ) {}

  async enroll(courseId: string, userId: string) {
    const course = await this.coursesService.getCourseRaw(courseId);

    if (!course) throw new BadRequestException('Course not found');

    if (course.attendanceList.includes(userId))
      throw new ConflictException('You have already attended this course');

    if (course.price > 0) {
      const isPaid = await this.paymentsService.checkPaid(courseId, userId);

      if (!isPaid)
        throw new BadRequestException('You need to pay to enroll this course');
    }

    await this.coursesService.attendCourse(courseId, userId);
  }
}
