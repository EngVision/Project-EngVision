import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateCourseDto } from './create-course.dto';
import { SectionDto } from './section.dto';
import { IsOptional } from 'class-validator';

export class UpdateCourseDto extends PartialType(CreateCourseDto) {
  @IsOptional()
  @ApiPropertyOptional({ type: [SectionDto], description: 'sections' })
  sections?: SectionDto[];
}
