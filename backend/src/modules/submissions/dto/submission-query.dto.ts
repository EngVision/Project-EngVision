import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsOptional } from 'class-validator';
import { QueryDto } from 'src/common/dto/query.dto';

export class SubmissionQueryDto extends QueryDto {
  @IsOptional()
  @IsMongoId()
  @ApiPropertyOptional({ description: 'Course id' })
  course?: string;
}
