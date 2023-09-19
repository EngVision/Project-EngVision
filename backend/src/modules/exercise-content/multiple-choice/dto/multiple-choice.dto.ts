import { Type } from 'class-transformer';
import { LocalFile } from 'src/modules/files/schemas/local-file.schema';

class Answer {
  id: number;

  text: string;

  @Type(() => LocalFile)
  image: LocalFile;
}

class Question {
  text: string;

  @Type(() => LocalFile)
  image: LocalFile;

  @Type(() => LocalFile)
  audio: LocalFile;

  @Type(() => Answer)
  answers: Answer[];
}

export class MultipleChoiceDto {
  @Type(() => Question)
  question: Question;
}
