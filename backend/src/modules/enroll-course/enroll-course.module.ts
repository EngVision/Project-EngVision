import { Module } from '@nestjs/common';
import { EnrollCourseService } from './enroll-course.service';
import { EnrollCourseController } from './enroll-course.controller';
import { CoursesModule } from '../courses/courses.module';
import { PaymentModule } from '../payment/payments.module';

@Module({
  imports: [CoursesModule, PaymentModule],
  controllers: [EnrollCourseController],
  providers: [EnrollCourseService],
  exports: [EnrollCourseService],
})
export class EnrollCourseModule {}
