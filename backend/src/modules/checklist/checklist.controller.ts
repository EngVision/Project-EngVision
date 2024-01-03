import {
  Controller,
  Get,
  HttpStatus,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/common/decorators';
import { AtGuard } from 'src/common/guards';
import { JwtPayload } from '../auth/types';
import { ChecklistService } from './checklist.service';
import { Response } from 'express';
import { GetResponse } from 'src/common/dto';

@ApiTags('Checklist')
@Controller('checklist')
export class ChecklistController {
  constructor(private readonly checklistService: ChecklistService) {}

  @Get()
  @UseGuards(AtGuard)
  async find(@CurrentUser() user: JwtPayload, @Res() res: Response) {
    const checklist = await this.checklistService.find(user.sub);

    return res.status(HttpStatus.OK).send(GetResponse({ data: checklist }));
  }

  @Post('dismiss')
  @UseGuards(AtGuard)
  async dismiss(@CurrentUser() user: JwtPayload, @Res() res: Response) {
    const checklist = await this.checklistService.dismiss(user.sub);

    return res.status(HttpStatus.OK).send(GetResponse({ data: checklist }));
  }
}
