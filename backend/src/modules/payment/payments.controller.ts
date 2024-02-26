import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CurrentUser } from 'src/common/decorators';
import { GetResponse } from 'src/common/dto';
import { AtGuard, RoleGuard } from 'src/common/guards';
import { JwtPayload } from '../auth/types';
import { PaymentsService } from './payments.service';
import { Role } from '../reviews/enums';
import { WebhookType } from '@payos/node/lib/type';

@Controller('payments')
@ApiTags('Payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @UseGuards(AtGuard, RoleGuard(Role.Student))
  async createPaymentLink(
    @CurrentUser() user: JwtPayload,
    @Body('courseId') courseId: string,
    @Res() res: Response,
  ) {
    const paymentUrl = await this.paymentsService.createPaymentUrl(
      courseId,
      user.sub,
    );

    return res.status(HttpStatus.OK).send(
      GetResponse({
        message: 'Create payment url successfully',
        data: paymentUrl,
      }),
    );
  }

  @Post('check-paid')
  @UseGuards(AtGuard, RoleGuard(Role.Student))
  async checkPaid(
    @CurrentUser() user: JwtPayload,
    @Body('courseId') courseId: string,
    @Res() res: Response,
  ) {
    const isPaid = await this.paymentsService.checkPaid(courseId, user.sub);

    return res
      .status(HttpStatus.CREATED)
      .send(GetResponse({ success: true, data: { isPaid } }));
  }

  @Post('confirm-webhook')
  @UseGuards(AtGuard, RoleGuard(Role.Admin))
  async confirmWebhook(
    @Body('webhookUrl') webhookUrl: string,
    @Res() res: Response,
  ) {
    await this.paymentsService.confirmWebhook(webhookUrl);

    return res.status(HttpStatus.CREATED).send(
      GetResponse({
        success: true,
        message: 'Confirm webhook successfully!',
      }),
    );
  }

  @Post('webhook-event-handler')
  async webhook(@Body() webhookData: WebhookType, @Res() res: Response) {
    const payment = await this.paymentsService.verifyWebhookData(webhookData);

    await this.paymentsService.handleWebhook(payment);

    return res.status(HttpStatus.CREATED).send(payment);
  }
}
