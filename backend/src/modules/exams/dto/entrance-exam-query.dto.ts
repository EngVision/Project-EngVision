import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { CEFRLevel } from 'src/common/enums';

export class EntranceExamQueryDto {
  @IsEnum(CEFRLevel)
  @ApiProperty({ enum: CEFRLevel })
  level: CEFRLevel;
}
