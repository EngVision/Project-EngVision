import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { CEFRLevel } from 'src/common/enums';
import { Score } from '../schemas/score.schema';

class ListeningLevelDto {
  @Transform(value => value.obj.grammar?.sum || null)
  grammar: number;

  @Transform(value => value.obj.vocabulary?.sum || null)
  vocabulary: number;

  @Transform(value => value.obj.comprehension?.sum || null)
  comprehension: number;

  @Transform(value => value.obj.overall?.sum || null)
  overall: number;
}

class ReadingLevelDto {
  @Transform(value => value.obj.grammar?.sum || null)
  grammar: number;

  @Transform(value => value.obj.vocabulary?.sum || null)
  vocabulary: number;

  @Transform(value => value.obj.skimming?.sum || null)
  skimming: number;

  @Transform(value => value.obj.scanning?.sum || null)
  scanning: number;

  @Transform(value => value.obj.comprehension?.sum || null)
  comprehension: number;

  @Transform(value => value.obj.overall?.sum || null)
  overall: number;
}

class WritingLevelDto {
  @Transform(value => value.obj.grammar?.sum || null)
  grammar: number;

  @Transform(value => value.obj.vocabulary?.sum || null)
  vocabulary: number;

  @Transform(value => value.obj.organization?.sum || null)
  organization: number;

  @Transform(value => value.obj.overall?.sum || null)
  overall: number;
}

class SpeakingLevelDto {
  @Transform(value => value.obj.grammar?.sum || null)
  grammar: number;

  @Transform(value => value.obj.vocabulary?.sum || null)
  vocabulary: number;

  @Transform(value => value.obj.pronunciation?.sum || null)
  pronunciation: number;

  @Transform(value => value.obj.fluency?.sum || null)
  fluency: number;

  @Transform(value => value.obj.overall?.sum || null)
  overall: number;
}

export class UserLevelDto {
  @Expose({ name: '_id' })
  @Transform(value => value.obj._id.toString())
  @ApiProperty({ description: 'id' })
  id: string;

  @Transform(value => value.obj.user.toString())
  @ApiProperty({ description: 'user id' })
  user: string;

  @Transform(value => value.obj.overall?.sum)
  overall: number;

  @Type(() => ListeningLevelDto)
  listening: ListeningLevelDto;

  @Type(() => ReadingLevelDto)
  reading: ReadingLevelDto;

  @Type(() => WritingLevelDto)
  writing: WritingLevelDto;

  @Type(() => SpeakingLevelDto)
  speaking: SpeakingLevelDto;

  @Expose({ name: 'CEFRLevel' })
  @Transform(value => Score.getCEFRLevel(value.obj.overall?.sum))
  CEFRLevel: CEFRLevel;

  @Exclude()
  grammar: number;

  @Exclude()
  vocabulary: number;
}
