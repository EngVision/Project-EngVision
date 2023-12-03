import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { CEFRLevel } from 'src/common/enums';
import { Score } from '../schemas/score.schema';

class ListeningLevelDto {
  @Transform(value => value.obj.grammar?.sum || null)
  @ApiProperty({ description: 'Grammar score' })
  grammar: number;

  @Transform(value => value.obj.vocabulary?.sum || null)
  @ApiProperty({ description: 'Vocabulary score' })
  vocabulary: number;

  @Transform(value => value.obj.comprehension?.sum || null)
  @ApiProperty({ description: 'Comprehension score' })
  comprehension: number;

  @Transform(value => value.obj.overall?.sum || null)
  @ApiProperty({ description: 'Overall score' })
  overall: number;
}

class ReadingLevelDto {
  @Transform(value => value.obj.grammar?.sum || null)
  @ApiProperty({ description: 'Grammar score' })
  grammar: number;

  @Transform(value => value.obj.vocabulary?.sum || null)
  @ApiProperty({ description: 'Vocabulary score' })
  vocabulary: number;

  @Transform(value => value.obj.skimming?.sum || null)
  @ApiProperty({ description: 'Skimming score' })
  skimming: number;

  @Transform(value => value.obj.scanning?.sum || null)
  @ApiProperty({ description: 'Scanning score' })
  scanning: number;

  @Transform(value => value.obj.comprehension?.sum || null)
  @ApiProperty({ description: 'Comprehension score' })
  comprehension: number;

  @Transform(value => value.obj.overall?.sum || null)
  @ApiProperty({ description: 'Overall score' })
  overall: number;
}

class WritingLevelDto {
  @Transform(value => value.obj.grammar?.sum || null)
  @ApiProperty({ description: 'Grammar score' })
  grammar: number;

  @Transform(value => value.obj.vocabulary?.sum || null)
  @ApiProperty({ description: 'Vocabulary score' })
  vocabulary: number;

  @Transform(value => value.obj.organization?.sum || null)
  @ApiProperty({ description: 'Organization score' })
  organization: number;

  @Transform(value => value.obj.overall?.sum || null)
  @ApiProperty({ description: 'Overall score' })
  overall: number;
}

class SpeakingLevelDto {
  @Transform(value => value.obj.grammar?.sum || null)
  @ApiProperty({ description: 'Grammar score' })
  grammar: number;

  @Transform(value => value.obj.vocabulary?.sum || null)
  @ApiProperty({ description: 'Vocabulary score' })
  vocabulary: number;

  @Transform(value => value.obj.pronunciation?.sum || null)
  @ApiProperty({ description: 'Pronunciation score' })
  pronunciation: number;

  @Transform(value => value.obj.fluency?.sum || null)
  @ApiProperty({ description: 'Fluency score' })
  fluency: number;

  @Transform(value => value.obj.overall?.sum || null)
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

  @Transform(value => value.obj.overall?.sum)
  @ApiProperty({ description: 'overall score' })
  overall: number;

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

  @Expose({ name: 'CEFRLevel' })
  @Transform(value => Score.getCEFRLevel(value.obj.overall?.sum))
  @ApiProperty({ description: 'CEFR level', enum: CEFRLevel })
  CEFRLevel: CEFRLevel;

  @Exclude()
  grammar: number;

  @Exclude()
  vocabulary: number;
}
