import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { CEFRLevel } from 'src/common/enums';
import { Score } from '../schemas/score.schema';
import { LevelScore } from 'src/common/constants';

class ListeningLevelDto {
  @ApiProperty({ description: 'Grammar score' })
  grammar: number;

  @ApiProperty({ description: 'Vocabulary score' })
  vocabulary: number;

  @ApiProperty({ description: 'Comprehension score' })
  comprehension: number;

  @ApiProperty({ description: 'Overall score' })
  overall: number;
}

class ReadingLevelDto {
  @ApiProperty({ description: 'Grammar score' })
  grammar: number;

  @ApiProperty({ description: 'Vocabulary score' })
  vocabulary: number;

  @ApiProperty({ description: 'Skimming score' })
  skimming: number;

  @ApiProperty({ description: 'Scanning score' })
  scanning: number;

  @ApiProperty({ description: 'Comprehension score' })
  comprehension: number;

  @ApiProperty({ description: 'Overall score' })
  overall: number;
}

class WritingLevelDto {
  @ApiProperty({ description: 'Grammar score' })
  grammar: number;

  @ApiProperty({ description: 'Vocabulary score' })
  vocabulary: number;

  @ApiProperty({ description: 'Organization score' })
  organization: number;

  @ApiProperty({ description: 'Overall score' })
  overall: number;
}

class SpeakingLevelDto {
  @ApiProperty({ description: 'Grammar score' })
  grammar: number;

  @ApiProperty({ description: 'Vocabulary score' })
  vocabulary: number;

  @ApiProperty({ description: 'Pronunciation score' })
  pronunciation: number;

  @ApiProperty({ description: 'Fluency score' })
  fluency: number;

  @ApiProperty({ description: 'Overall score' })
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

  @ApiProperty({ description: 'overall score' })
  overall: number;

  @Expose({ name: 'CEFRLevel' })
  @ApiProperty({ description: 'CEFR level', enum: CEFRLevel })
  CEFRLevel: CEFRLevel;

  @Type(() => ListeningLevelDto)
  @ApiProperty({ description: 'listening score' })
  listening: ListeningLevelDto;

  @Type(() => ReadingLevelDto)
  @ApiProperty({ description: 'reading score' })
  reading: ReadingLevelDto;

  @Type(() => WritingLevelDto)
  @ApiProperty({ description: 'writing score' })
  writing: WritingLevelDto;

  @Type(() => SpeakingLevelDto)
  @ApiProperty({ description: 'speaking score' })
  speaking: SpeakingLevelDto;

  @Exclude()
  grammar: number;

  @Exclude()
  vocabulary: number;
}
