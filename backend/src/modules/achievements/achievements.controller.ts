import { Controller, Get, HttpStatus, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { CurrentUser } from 'src/common/decorators';
import { AtGuard } from 'src/common/guards';
import { JwtPayload } from '../auth/types';
import { AchievementsService } from './achievements.service';
import { ApiTags } from '@nestjs/swagger';
import { GetResponse } from 'src/common/dto';
import { AchievementDto } from './dto/achievement.dto';

@ApiTags('Achievements')
@Controller('achievements')
export class AchievementsController {
  constructor(private readonly achievementsService: AchievementsService) {}

  @Get()
  @UseGuards(AtGuard)
  async findAll(@CurrentUser() user: JwtPayload, @Res() res: Response) {
    const achievement = await this.achievementsService.findAll(user.sub);

    return res
      .status(HttpStatus.OK)
      .send(GetResponse({ data: achievement, dataType: AchievementDto }));
  }
}
