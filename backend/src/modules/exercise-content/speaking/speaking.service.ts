import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { QuestionResult } from 'src/modules/submissions/schemas/submission.schema';
import { ExerciseContentService } from '../base-exercise-content.service';
import { ExerciseQuestionDto } from '../dto/exercise-content.dto';
import { CreateSpeakingDto } from './dto/create-speaking.dto';
import { Speaking } from './schemas/speaking.schema';
import { WhisperService } from 'src/modules/whisper/whisper.service';

@Injectable()
export class SpeakingService extends ExerciseContentService {
  constructor(
    @InjectModel(Speaking.name)
    private speakingModel: Model<Speaking>,
    private readonly whisperService: WhisperService,
  ) {
    super();
  }

  async getContent(id: string): Promise<ExerciseQuestionDto> {
    const question = await this.speakingModel.findById(id);

    return question;
  }

  async createContent(
    questionListDto: ExerciseQuestionDto[],
  ): Promise<string[]> {
    const validatedContent = await this.validate(
      questionListDto,
      CreateSpeakingDto,
    );

    const questionList = await this.speakingModel.insertMany(validatedContent);

    return questionList.map(q => q.id);
  }

  async updateContent(
    questionListDto: ExerciseQuestionDto[],
    removedQuestions: string[],
  ): Promise<string[]> {
    const validatedContent = await this.validate(
      questionListDto,
      CreateSpeakingDto,
    );

    this.setDefaultExplain(validatedContent);

    const bulkOps = this.updateBulkOps(validatedContent, removedQuestions);

    const res = await this.speakingModel.bulkWrite(bulkOps);

    return [
      ...validatedContent.map(({ id }) => id).filter(id => !!id),
      ...Object.values(res.insertedIds).map(id => id.toString()),
    ];
  }

  async deleteContent(removedQuestion: string[]): Promise<void> {
    await this.speakingModel.bulkWrite([this.deleteBulkOps(removedQuestion)]);
  }

  async checkAnswer(id: string, answer: string): Promise<QuestionResult> {
    if (!mongoose.isValidObjectId(answer)) {
      throw new BadRequestException('answer must be a uploaded file id');
    }

    const correctAnswer = (
      await this.speakingModel.findById(id).select('correctAnswer')
    ).correctAnswer;
    const { detail, explanation } = correctAnswer;
    const submission: QuestionResult = {
      question: id,
      answer,
      correctAnswer: detail,
      explanation,
    };

    if (correctAnswer.detail) {
      const {
        pronunciation_accuracy,
        original_ipa_transcript,
        correct_letters,
      } = await this.whisperService.speechEvaluation({
        fileId: answer,
        original: correctAnswer.detail,
      });

      submission.grade = parseInt(pronunciation_accuracy) / 10;

      var ipa = original_ipa_transcript
        .split('')
        .map((c, i) => {
          if (correct_letters[i] === '1')
            return `<span style="color: green">${c}</span>`;
          if (correct_letters[i] === '0')
            return `<span style="color: red">${c}</span>`;
          return c;
        })
        .join('');
      submission.explanation = `/${ipa}/ <p>Your pronunciation accuracy: ${pronunciation_accuracy}</p>`;
    } else {
      this.whisperService.speechToText(submission.question, answer);
    }

    return submission;
  }

  setDefaultExplain(questionList: ExerciseQuestionDto[]): void {}
}
