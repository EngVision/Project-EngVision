import { ApiProperty } from '@nestjs/swagger';
import { CreateExerciseDto } from './create-exercise.dto';
import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateExerciseListDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateExerciseDto)
  @ApiProperty({ type: [CreateExerciseDto], description: 'CreateExerciseDto' })
  exerciseList: [CreateExerciseDto];
}
