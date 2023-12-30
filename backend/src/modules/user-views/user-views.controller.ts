import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CurrentUser } from 'src/common/decorators';
import { GetResponse } from 'src/common/dto';
import { AtGuard } from 'src/common/guards';
import { JwtPayload } from '../auth/types';
import { UserViewsService } from './user-views.service';

@Controller('user-views')
@ApiTags('User-views')
export class UserViewsController {
  constructor(private readonly userViewsService: UserViewsService) {}

  @Post()
  @UseGuards(AtGuard)
  async view(
    @CurrentUser() user: JwtPayload,
    @Body('targetId') targetId: string,
    @Res() res: Response,
  ) {
    await this.userViewsService.create(targetId, user?.sub);

    return res
      .status(HttpStatus.CREATED)
      .send(GetResponse({ message: 'Viewed target' }));
  }

  @Get()
  @UseGuards(AtGuard)
  async getFile(@CurrentUser() user: JwtPayload, @Res() res: Response) {
    const userViews = await this.userViewsService.getAll(user.sub);

    return res
      .status(HttpStatus.CREATED)
      .send(GetResponse({ data: userViews }));
  }
}
