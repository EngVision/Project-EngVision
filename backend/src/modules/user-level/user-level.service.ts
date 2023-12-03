import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserLevelDto } from './dto/create-user-level.dto';
import { UserLevel, UserLevelDocument } from './schemas/user-level.scheme';
import { QuestionResult } from '../submissions/schemas/submission.schema';
import { CEFRLevel, ExerciseTag } from 'src/common/enums';
import { Score } from './schemas/score.schema';
import { ExerciseQuestionDto } from '../exercise-content/dto/exercise-content.dto';

const ScorePerQuestion = 5;

@Injectable()
export class UserLevelService {
  constructor(
    @InjectModel(UserLevel.name) private userLevelModel: Model<UserLevel>,
  ) {}

  async create(createUserLevelDto: CreateUserLevelDto, userId: string) {
    const userLevel = await this.userLevelModel.findOne({ user: userId });
    if (userLevel) {
      return this.transform(userLevel);
    }

    const level = createUserLevelDto.level;

    const newUserLevel = new this.userLevelModel(new UserLevel(userId, level));
    await newUserLevel.save();

    return this.transform(newUserLevel);
  }

  async findOneByUser(id: string) {
    const userLevel = await this.userLevelModel.findOne({ user: id });

    return this.transform(userLevel);
  }

  async update(
    user: string,
    result: QuestionResult,
    question: ExerciseQuestionDto,
  ) {
    let userLevel = await this.userLevelModel.findOne({ user });
    const tags = question.tags;

    if (!userLevel) {
      userLevel = new this.userLevelModel(new UserLevel(user, CEFRLevel.A1));
    }

    if (tags.includes(ExerciseTag.Grammar)) {
      userLevel.grammar = this.updateScore(
        userLevel.grammar || userLevel.overall,
        result,
        question,
      );
    }
    if (tags.includes(ExerciseTag.Vocabulary)) {
      userLevel.vocabulary = this.updateScore(
        userLevel.vocabulary || userLevel.overall,
        result,
        question,
      );
    }
    if (tags.includes(ExerciseTag.ListeningComprehension)) {
      userLevel.listening.comprehension = this.updateScore(
        userLevel.listening.comprehension || userLevel.overall,
        result,
        question,
      );
    }
    if (tags.includes(ExerciseTag.Pronunciation)) {
      userLevel.speaking.pronunciation = this.updateScore(
        userLevel.speaking.pronunciation || userLevel.overall,
        result,
        question,
      );
    }
    if (tags.includes(ExerciseTag.Fluency)) {
      userLevel.speaking.fluency = this.updateScore(
        userLevel.speaking.fluency || userLevel.overall,
        result,
        question,
      );
    }
    if (tags.includes(ExerciseTag.ReadingComprehension)) {
      userLevel.reading.comprehension = this.updateScore(
        userLevel.reading.comprehension || userLevel.overall,
        result,
        question,
      );
    }
    if (tags.includes(ExerciseTag.Skimming)) {
      userLevel.reading.skimming = this.updateScore(
        userLevel.reading.skimming || userLevel.overall,
        result,
        question,
      );
    }
    if (tags.includes(ExerciseTag.Scanning)) {
      userLevel.reading.scanning = this.updateScore(
        userLevel.reading.scanning || userLevel.overall,
        result,
        question,
      );
    }
    if (tags.includes(ExerciseTag.Organization)) {
      userLevel.writing.organization = this.updateScore(
        userLevel.writing.organization || userLevel.overall,
        result,
        question,
      );
    }
    if (tags.includes(ExerciseTag.Coherence)) {
      userLevel.writing.coherence = this.updateScore(
        userLevel.writing.coherence || userLevel.overall,
        result,
        question,
      );
    }
    if (tags.includes(ExerciseTag.Conciseness)) {
      userLevel.writing.conciseness = this.updateScore(
        userLevel.writing.conciseness || userLevel.overall,
        result,
        question,
      );
    }

    await userLevel.save();
  }

  updateScore(
    currentScore: Score,
    result: QuestionResult,
    question: ExerciseQuestionDto,
  ): Score {
    let score = 0;

    if (result.grade !== null) {
      score = ScorePerQuestion * (result.grade / 10);
    }

    if (result.isCorrect !== null) {
      score = result.isCorrect ? ScorePerQuestion : -ScorePerQuestion;
    }

    const questionLevel = question.level;
    if (questionLevel === CEFRLevel.A1 || questionLevel === CEFRLevel.A2) {
      currentScore.LevelA += score;
    }
    if (questionLevel === CEFRLevel.B1 || questionLevel === CEFRLevel.B2) {
      currentScore.LevelB += score;
    }
    if (questionLevel === CEFRLevel.C1 || questionLevel === CEFRLevel.C2) {
      currentScore.LevelC += score;
    }

    return currentScore;
  }

  transform(userLevel: UserLevelDocument) {
    const data = userLevel.toJSON();

    return {
      ...data,
      listening: {
        ...data.listening,
        grammar: data.grammar,
        vocabulary: data.vocabulary,
      },
      reading: {
        ...data.reading,
        grammar: data.grammar,
        vocabulary: data.vocabulary,
      },
      speaking: {
        ...data.speaking,
        grammar: data.grammar,
        vocabulary: data.vocabulary,
      },
      writing: {
        ...data.writing,
        grammar: data.grammar,
        vocabulary: data.vocabulary,
      },
    };
  }
}
