import { Injectable } from '@nestjs/common';
import { CreateChecklistDto } from './dto/create-checklist.dto';
import { UpdateChecklistDto } from './dto/update-checklist.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Checklist } from './schemas/checklist.schema';
import { Model } from 'mongoose';

@Injectable()
export class ChecklistService {
  constructor(
    @InjectModel(Checklist.name) private checklistModel: Model<Checklist>,
  ) {}

  async create(createChecklistDto: CreateChecklistDto) {
    const checklist = new this.checklistModel(createChecklistDto);
    await checklist.save();

    return checklist;
  }

  findAll() {
    return `This action returns all checklist`;
  }

  findOne(id: number) {
    return `This action returns a #${id} checklist`;
  }

  update(id: number, updateChecklistDto: UpdateChecklistDto) {
    return `This action updates a #${id} checklist`;
  }

  remove(id: number) {
    return `This action removes a #${id} checklist`;
  }
}
