import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UserLevelService } from './user-level.service';
import { CreateUserLevelDto } from './dto/create-user-level.dto';
import { UpdateUserLevelDto } from './dto/update-user-level.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { GetResponse } from 'src/common/dto';
import { AtGuard, RoleGuard } from 'src/common/guards';
import { CurrentUser } from 'src/common/decorators';
import { Role } from 'src/common/enums';

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
      .send(GetResponse({ data: userLevel }));
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserLevelDto: UpdateUserLevelDto,
  ) {
    return this.userLevelService.update(+id, updateUserLevelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userLevelService.remove(+id);
  }
}
