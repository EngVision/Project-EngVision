import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsMongoId } from 'class-validator';

export class CreateExamSubmissionDto {
  @IsMongoId()
  @ApiProperty({ type: String, description: 'Part ID' })
  partId: string;

  @IsMongoId()
  @ApiProperty({ type: String, description: 'Question ID' })
  questionId: string;

  @IsDefined()
  @ApiProperty({ description: 'Answer' })
  answer: any;
}
