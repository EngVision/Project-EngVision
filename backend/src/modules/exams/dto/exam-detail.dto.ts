import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { ExamDto } from './exam.dto';

class PartDto {
  @Expose({ name: '_id' })
  @Transform(value => value.obj._id.toString())
  @ApiProperty({ description: 'Part id' })
  id?: string;

  @ApiProperty({ description: 'Title' })
  title: string;

  @ApiProperty({ description: 'Description' })
  description: string;
}

export class ExamDetailDto extends PartialType(
  OmitType(ExamDto, ['parts'] as const),
) {
  @Type(() => PartDto)
  @ApiProperty({ description: 'Exam parts', type: [PartDto] })
  parts: PartDto[];
}
