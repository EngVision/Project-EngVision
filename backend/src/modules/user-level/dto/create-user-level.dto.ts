import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { CEFRLevel } from 'src/common/enums';

export class CreateUserLevelDto {
  @IsEnum(CEFRLevel)
  @ApiProperty({ description: 'User level', enum: CEFRLevel })
  level: CEFRLevel;
}
