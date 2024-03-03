import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Document, Model } from 'mongoose';
import { CEFRLevel, ExerciseType, Role } from 'src/common/enums';
import { ExerciseContentServiceFactory } from '../exercise-content/exercise-content-factory.service';
import { QuestionResult } from '../submissions/schemas/submission.schema';
import { SubmissionsService } from '../submissions/submissions.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { Exercise, ExerciseDocument } from './schemas/exercise.schema';
import { OpenAiService } from '../open-ai/open-ai.service';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectModel(Exercise.name) private exerciseModel: Model<Exercise>,
    private readonly exerciseContentServiceFactory: ExerciseContentServiceFactory,
    private readonly submissionsService: SubmissionsService,
    private readonly openAiService: OpenAiService,
  ) {}

  async create(
    createExerciseDto: CreateExerciseDto,
  ): Promise<ExerciseDocument> {
    const newExercise = new this.exerciseModel(createExerciseDto);

    const service = await this.exerciseContentServiceFactory.createService(
      createExerciseDto.type,
    );

    const content = await service.createContent(createExerciseDto.content);

    newExercise.content = content;
    await newExercise.save();

    return await newExercise.populate('content');
  }

  async find(
    query: UpdateExerciseDto & { _id?: any } = {},
    roles?: Role[],
  ): Promise<ExerciseDocument[]> {
    if (roles && roles.includes(Role.Admin)) {
      const exercises = await this.exerciseModel.aggregate([
        {
          $lookup: {
            from: 'users',
            localField: 'creator',
            foreignField: '_id',
            as: 'creator',
          },
        },
        {
          $match: {
            'creator.role': Role.Admin,
          },
        },
      ]);

      return exercises.map(exercise => ({
        ...exercise,
        creator: exercise.creator[0]._id,
      }));
    }

    const exercises = await this.exerciseModel.find(query);

    return exercises;
  }

  async findOne(id: string): Promise<ExerciseDocument> {
    const exercise = await this.exerciseModel.findById(id).populate('content');

    if (!exercise) {
      throw new NotFoundException('Exercise not found');
    }

    return exercise;
  }

  async update(
    id: string,
    updateExerciseDto: UpdateExerciseDto,
    userId: string,
  ): Promise<ExerciseDocument> {
    const exercise = await this.exerciseModel.findById(id);

    if (!exercise || exercise.creator.toString() !== userId) {
      throw new NotFoundException('Exercise not found');
    }

    const service = await this.exerciseContentServiceFactory.createService(
      exercise.type,
    );

    const prevQuestions = exercise.content.map(id => id.toString());
    const currQuestions = updateExerciseDto.content
      ? updateExerciseDto.content.map(({ id }) => id)
      : prevQuestions;
    const removedQuestions = prevQuestions.filter(
      id => !currQuestions.includes(id),
    );

    const content = updateExerciseDto.content
      ? await service.updateContent(updateExerciseDto.content, removedQuestions)
      : exercise.content;

    const updatedExercise = await this.exerciseModel.findByIdAndUpdate(
      id,
      {
        ...updateExerciseDto,
        content: content,
      },
      { new: true },
    );

    return updatedExercise.populate('content');
  }

  async remove(id: string, userId: string): Promise<void> {
    const exercise = await this.exerciseModel.findById(id);

    if (!exercise || exercise.creator.toString() !== userId) {
      throw new NotFoundException('Exercise not found');
    }

    const service = await this.exerciseContentServiceFactory.createService(
      exercise.type,
    );

    await service.deleteContent(exercise.content);
    await exercise.deleteOne();
  }

  async getEntranceExercises(level: CEFRLevel): Promise<ExerciseDocument[]> {
    const exercises = await this.exerciseModel.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'creator',
          foreignField: '_id',
          as: 'creator',
        },
      },
      {
        $match: {
          level: level,
          'creator.role': Role.Admin,
          needGrade: false,
        },
      },
    ]);

    return exercises;
  }

  async submitAnswer(
    userId: string,
    exerciseId: string,
    questionId: string,
    answer: any,
  ): Promise<QuestionResult & { id: string }> {
    const exercise = await this.findOne(exerciseId);

    const service = await this.exerciseContentServiceFactory.createService(
      exercise.type,
    );

    const { ...result } = await service.checkAnswer(questionId, answer);

    const { id } = await this.submissionsService.update(userId, exercise.id, {
      user: userId,
      exercise: exerciseId,
      exerciseType: exercise.type,
      totalQuestion: exercise.content.length,
      detail: [result],
      teacher: exercise.creator,
      needGrade: exercise.needGrade,
      course: exercise.course,
      grade: result.grade,
    });

    console.log(exercise.content);

    if (
      exercise.needGrade &&
      exercise.type === ExerciseType.ConstructedResponse
    ) {
      const currentExercise: any = exercise.content.find(
        (q: any) => q.id === questionId,
      );

      this.openAiService
        .chat(
          `Evaluate skill Grammar, Vocabulary, Organization, Coherence, Conciseness the writing with topic '${currentExercise?.question?.text}': '${answer}'`,
        )
        .then(explanation => {
          result.explanation = explanation;
          this.submissionsService.update(userId, exercise.id, {
            user: userId,
            exercise: exerciseId,
            exerciseType: exercise.type,
            totalQuestion: exercise.content.length,
            detail: [result],
            teacher: exercise.creator,
            needGrade: exercise.needGrade,
            course: exercise.course,
            grade: result.grade,
          });
        });
    }

    return { ...result, id };
  }

  async clone(id: string, destCourse: string): Promise<ExerciseDocument> {
    const exercise = await this.exerciseModel.findById(id);

    if (!exercise) {
      throw new NotFoundException('Exercise not found');
    }

    const newExercise = new this.exerciseModel({
      title: exercise.title,
      description: exercise.description,
      tags: exercise.tags,
      level: exercise.level,
      type: exercise.type,
      creator: exercise.creator,
      needGrade: exercise.needGrade,
      contentQuestion: exercise.contentQuestion,
      course: destCourse,
    });

    const content = [];

    const service = this.exerciseContentServiceFactory.createService(
      exercise.type,
    );
    for (const questionId of exercise.content) {
      const oldContent: any = await service.getContent(questionId.toString());
      if (oldContent) {
        oldContent._id = new mongoose.Types.ObjectId();
        oldContent.isNew = true;
        await oldContent.save();

        content.push(oldContent._id);
      }
    }

    newExercise.content = content;
    await newExercise.save();

    return newExercise;
  }
}
