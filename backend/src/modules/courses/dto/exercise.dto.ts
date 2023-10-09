import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class ExerciseDto {
  @Expose({ name: '_id' })
  @Transform(value => value.obj._id.toString())
  @ApiProperty({ type: String, description: 'Exercise id' })
  id?: string;

  @ApiProperty({ type: String, description: 'Title' })
  title: string;

  @ApiProperty({ type: String, description: 'Description' })
  description: string;
}
