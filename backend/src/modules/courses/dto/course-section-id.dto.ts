import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CourseSectionIdDto {
  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty({ type: String, description: 'Course id' })
  id: string;

  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty({ type: String, description: 'Section id' })
  sectionId: string;
}
