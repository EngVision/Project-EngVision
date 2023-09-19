import { ValidationPipe } from '@nestjs/common';
import { Validator } from 'class-validator';
import { Document } from 'mongoose';
import { ExerciseContentDto } from './dto/exercise-content.dto';
import { plainToInstance } from 'class-transformer';

export abstract class ExerciseContentService {
  async validate(
    content: ExerciseContentDto,
    dataType: any,
  ): Promise<ExerciseContentDto> {
    const validator = new Validator();
    const errors = await validator.validate(
      plainToInstance(dataType, content),
      { whitelist: true },
    );

    if (errors.length !== 0) {
      const validatePipe = new ValidationPipe().createExceptionFactory();
      throw validatePipe(errors);
    }

    return content;
  }

  abstract createContent(
    createContentDto: ExerciseContentDto,
  ): Promise<Document>;

  abstract checkAnswer(id: string, answer: any): Promise<boolean>;
}
