import { ApiProperty } from '@nestjs/swagger';
import { IsDefined } from 'class-validator';

export class ExerciseContentDto {
  @IsDefined()
  @ApiProperty({ type: Object, description: 'Question' })
  question: any;

  @IsDefined()
  @ApiProperty({ type: Object, description: 'Correct answer' })
  correctAnswer: any;
}
