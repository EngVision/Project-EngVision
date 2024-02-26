import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { CEFRLevel } from 'src/common/enums';

class LessonDto {
  @Expose({ name: '_id' })
  @Transform(value => value.obj._id.toString())
  @ApiProperty({ type: String, description: 'Lesson id' })
  id?: string;

  @ApiProperty({ type: String, description: 'Title' })
  title: string;

  @Transform(value => value.obj.materials.map(material => material.toString()))
  @ApiProperty({ type: String, description: 'Material list' })
  materials: string[];

  @Transform(value => value.obj.exercises.map(exercise => exercise.toString()))
  @ApiProperty({ type: String, description: 'Exercise list' })
  exercises: string[];
}

class SectionDto {
  @Expose({ name: '_id' })
  @Transform(value => value.obj._id.toString())
  @ApiProperty({ type: String, description: 'Section id' })
  id?: string;

  @ApiProperty({ type: String, description: 'Title' })
  title: string;

  @Type(() => LessonDto)
  @ApiProperty({ type: [LessonDto], description: 'Lessons' })
  lessons: LessonDto[];
}

export class CourseLessonDto {
  @Expose({ name: '_id' })
  @Transform(value => value.obj._id.toString())
  @ApiProperty({ type: String, description: 'Course id' })
  id?: string;

  @ApiProperty({ type: String, description: 'Title' })
  title: string;

  @ApiProperty({ type: String, description: 'Level' })
  level: CEFRLevel;

  @Type(() => SectionDto)
  @ApiProperty({ type: [SectionDto], description: 'Sections' })
  sections: SectionDto[];
}
