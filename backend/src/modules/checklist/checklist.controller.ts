import { Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/common/decorators';
import { AtGuard } from 'src/common/guards';
import { JwtPayload } from '../auth/types';
import { ChecklistService } from './checklist.service';

@ApiTags('Checklist')
@Controller('checklist')
export class ChecklistController {
  constructor(private readonly checklistService: ChecklistService) {}

  @Get()
  @UseGuards(AtGuard)
  find(@CurrentUser() user: JwtPayload) {
    return this.checklistService.find(user.sub);
  }
}
