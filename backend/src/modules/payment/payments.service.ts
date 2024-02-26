import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payment, PaymentDocument } from './schemas/payment.schema';
import { CoursesService } from '../courses/courses.service';
import PayOS from '@payos/node';
import {
  CheckoutResponseDataType,
  WebhookDataType,
  WebhookType,
} from '@payos/node/lib/type';
import { generateUniqueRandomNumber } from 'src/common/utils';
@Injectable()
export class PaymentsService {
  private payOS;

  constructor(
    @InjectModel(Payment.name)
    private readonly paymentModel: Model<PaymentDocument>,
    private readonly coursesService: CoursesService,
  ) {
    this.payOS = new PayOS(
      process.env.CLIENT_ID,
      process.env.API_KEY,
      process.env.CHECKSUM_KEY,
    );
  }

  async createPaymentUrl(courseId: string, userId: string) {
    const course = await this.coursesService.getCourseRaw(courseId);
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    if (course.attendanceList.includes(userId)) {
      throw new BadRequestException('You have attended this course');
    }

    const existPayments = await this.paymentModel.find({}, { orderCode: 1 });
    const existPaymentsOrderCode = existPayments.map(
      payment => payment.orderCode,
    );

    const orderCode = generateUniqueRandomNumber(
      existPaymentsOrderCode,
      1000,
      100000,
    );

    const body = {
      orderCode,
      amount: course.price,
      description: 'Pay for buy the course',
      items: [
        {
          name: course.title,
          quantity: 1,
          price: course.price,
        },
      ],
      cancelUrl: `${process.env.CLIENT_URL}/discover/${courseId}`,
      returnUrl: `${process.env.CLIENT_URL}/discover/${courseId}`,
      expiredAt: Math.round((new Date().getTime() + 15 * 60 * 1000) / 1000), // 15p
    };

    const paymentLinkRes: CheckoutResponseDataType =
      await this.payOS.createPaymentLink(body);

    const payment = await this.paymentModel.findOne({
      userId,
      courseId,
    });

    if (payment) {
      payment.orderCode = paymentLinkRes.orderCode;
      payment.checkoutUrl = paymentLinkRes.checkoutUrl;
      payment.status = paymentLinkRes.status;

      await payment.save();
      return payment;
    }
    const newPayment = new this.paymentModel({
      userId,
      courseId,
      orderCode: paymentLinkRes.orderCode,
      checkoutUrl: paymentLinkRes.checkoutUrl,
      status: paymentLinkRes.status,
    });

    await newPayment.save();

    return newPayment;
  }

  async checkPaid(courseId: string, userId: string) {
    const payment = await this.paymentModel.findOne({
      userId,
      courseId,
    });

    if (!payment) return false;
    if (payment.status === 'PAID') return true;

    const paymentInformation = await this.payOS.getPaymentLinkInfomation(
      payment.orderCode,
    );
    if (paymentInformation.status !== 'PAID') return false;

    payment.status = paymentInformation.status;
    await payment.save();

    return true;
  }

  async confirmWebhook(webhookUrl: string) {
    try {
      await this.payOS.confirmWebhook(webhookUrl);
    } catch (error) {
      throw new BadRequestException('Webhook invalid');
    }
  }

  async verifyWebhookData(webhookData: WebhookType) {
    try {
      const payment: WebhookDataType =
        await this.payOS.verifyPaymentWebhookData(webhookData);
      return payment;
    } catch (error) {
      throw new BadRequestException('The data is unreliable');
    }
  }

  async handleWebhook(paymentData: WebhookDataType) {
    const payment = await this.paymentModel.findOne({
      orderCode: paymentData.orderCode,
    });

    if (!payment) return;

    payment.status = 'PAID';
    await payment.save();

    await this.coursesService.attendCourse(payment.courseId, payment.userId);
  }
}
