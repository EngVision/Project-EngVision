import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsMongoId, IsString } from 'class-validator';

class LessonDto {
  @IsString()
  @ApiProperty({ type: String, description: 'Title' })
  title: string;

  @IsMongoId({ each: true })
  @ApiProperty({ type: [String], description: 'Exercises' })
  exercises: string[];

  @IsMongoId({ each: true })
  @ApiProperty({ type: [String], description: 'Materials' })
  materials: string[];
}

export class AddLessonDto {
  @IsMongoId()
  @ApiProperty({ type: String, description: 'course id' })
  courseId: string;

  @IsMongoId()
  @ApiProperty({ type: String, description: 'section id' })
  sectionId: string;

  @IsArray()
  @Type(() => LessonDto)
  @ApiProperty({ type: LessonDto, description: 'lessons id' })
  lessons: LessonDto[];
}
