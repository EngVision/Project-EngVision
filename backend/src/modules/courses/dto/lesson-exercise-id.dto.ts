import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class LessonExerciseIdDto {
  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty({ type: String, description: 'Lesson dd' })
  lessonId: string;

  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty({ type: String, description: 'Exercise id' })
  exerciseId: string;
}
