import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class LessonMaterialIdDto {
  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty({ type: String, description: 'Lesson dd' })
  lessonId: string;

  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty({ type: String, description: 'Material id' })
  materialId: string;
}
