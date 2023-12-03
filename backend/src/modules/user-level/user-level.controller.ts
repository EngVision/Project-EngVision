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
      .send(GetResponse({ data: userLevel }));
  }

  @Get()
  @UseGuards(AtGuard, RoleGuard(Role.Student))
  async get(@CurrentUser() user, @Res() res: Response) {
    const userLevel = await this.userLevelService.findOneByUser(user.sub);

    return res
      .status(HttpStatus.CREATED)
      .send(GetResponse({ data: userLevel, dataType: UserLevelDto }));
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateUserLevelDto: UpdateUserLevelDto,
  // ) {
  //   return this.userLevelService.update(+id, updateUserLevelDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userLevelService.remove(+id);
  // }
}
