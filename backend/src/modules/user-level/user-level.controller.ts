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
import { CurrentUser, ApiResponseData } from 'src/common/decorators';
import { GetResponse } from 'src/common/dto';
import { Role } from 'src/common/enums';
import { AtGuard, RoleGuard } from 'src/common/guards';
import { CreateUserLevelDto } from './dto/create-user-level.dto';
import { UserLevelDto } from './dto/user-level.dto';
import { UserLevelService } from './user-level.service';

@Controller('user-level')
@ApiTags('User Level')
export class UserLevelController {
  constructor(private readonly userLevelService: UserLevelService) {}

  @Post()
  @UseGuards(AtGuard, RoleGuard(Role.Student))
  @ApiResponseData(UserLevelDto)
  async create(
    @Body() createUserLevelDto: CreateUserLevelDto,
    @CurrentUser() user,
    @Res() res: Response,
  ) {
    const userLevel = await this.userLevelService.create(
      createUserLevelDto,
      user.sub,
    );

    return res
      .status(HttpStatus.CREATED)
      .send(GetResponse({ data: userLevel, dataType: UserLevelDto }));
  }

  @Get()
  @UseGuards(AtGuard, RoleGuard(Role.Student))
  @ApiResponseData(UserLevelDto)
  async get(@CurrentUser() user, @Res() res: Response) {
    const userLevel = await this.userLevelService.findOneByUser(user.sub);

    return res
      .status(HttpStatus.OK)
      .send(GetResponse({ data: userLevel, dataType: UserLevelDto }));
  }
}
