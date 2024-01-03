import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ExerciseContentService } from '../base-exercise-content.service';
import { QuestionResult } from 'src/modules/submissions/schemas/submission.schema';
import { WordSearch } from './schemas/word-search.schema';
import { CreateWordSearchDto } from './dto/word-search';
import { ExerciseQuestionDto } from '../dto/exercise-content.dto';
import { BadRequestException } from '@nestjs/common';

interface Answer {
  words: {
    text: string;
    start: number[];
    end: number[];
  }[];
  numberQuestionCorrect: number;
  numberQuestion: number;
}

function generateWordSearch(
  rows: number,
  cols: number,
  words: string[],
): string[][] {
  const matrix: string[][] = [];
  for (let i = 0; i < rows; i++) {
    matrix.push(Array(cols).fill(''));
  }

  for (const word of words) {
    placeWord(matrix, word);
  }

  fillEmptySpaces(matrix);

  return matrix;
}

function placeWord(matrix: string[][], word: string): void {
  const directions: [number, number][] = [
    [0, 1],
    [1, 0],
    [1, 1],
    [-1, 1],
  ];

  const dir = directions[Math.floor(Math.random() * directions.length)];
  const [dx, dy] = dir;

  let row: number, col: number;
  let isValidPosition = false;

  while (!isValidPosition) {
    row = Math.floor(Math.random() * matrix.length);
    col = Math.floor(Math.random() * matrix[0].length);

    isValidPosition = checkValidPosition(matrix, word, row, col, dx, dy);
  }

  for (let i = 0; i < word.length; i++) {
    matrix[row + i * dx][col + i * dy] = word.charAt(i);
  }
}

function checkValidPosition(
  matrix: string[][],
  word: string,
  row: number,
  col: number,
  dx: number,
  dy: number,
): boolean {
  if (row + word.length * dx < 0 || row + word.length * dx >= matrix.length) {
    return false;
  }

  if (
    col + word.length * dy < 0 ||
    col + word.length * dy >= matrix[0].length
  ) {
    return false;
  }

  for (let i = 0; i < word.length; i++) {
    const newRow = row + i * dx;
    const newCol = col + i * dy;

    if (matrix[newRow][newCol] !== '') {
      return false;
    }
  }

  return true;
}

function fillEmptySpaces(matrix: string[][]): void {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] === '') {
        const randomLetter =
          letters[Math.floor(Math.random() * letters.length)];
        matrix[i][j] = randomLetter;
      }
    }
  }
}

function calculateMaxLength(strings: string[]): number {
  if (strings.length === 0) {
    return 0;
  }

  return strings.reduce((minLength, currentString) => {
    const currentLength = currentString.length;
    return currentLength > minLength ? currentLength : minLength;
  }, strings[0].length);
}

export class WordSearchService extends ExerciseContentService {
  constructor(
    @InjectModel(WordSearch.name)
    private WordSearchModel: Model<WordSearch>,
  ) {
    super();
  }

  async getContent(id: string): Promise<ExerciseQuestionDto> {
    const question = await this.WordSearchModel.findById(id);

    return question;
  }

  async createContent(
    createQuestionListDto: CreateWordSearchDto[],
  ): Promise<string[]> {
    const validatedContent = await this.validate(
      createQuestionListDto,
      CreateWordSearchDto,
    );

    const transformedContent = this.transformContent(validatedContent);

    const questionList =
      await this.WordSearchModel.insertMany(transformedContent);

    return questionList.map(q => q.id);
  }

  async updateContent(
    updateQuestionListDto: CreateWordSearchDto[],
    removedQuestions: string[],
  ): Promise<string[]> {
    const validatedContent = await this.validate(
      updateQuestionListDto,
      CreateWordSearchDto,
    );

    const transformedContent = this.transformContent(validatedContent);

    const bulkOps = this.updateBulkOps(transformedContent, removedQuestions);

    const res = await this.WordSearchModel.bulkWrite(bulkOps);

    return [
      ...validatedContent.map(({ id }) => id).filter(id => !!id),
      ...Object.values(res.insertedIds).map(id => id.toString()),
    ];
  }

  async deleteContent(removedQuestion: string[]): Promise<void> {
    await this.WordSearchModel.bulkWrite([this.deleteBulkOps(removedQuestion)]);
  }

  async checkAnswer(id: string, answer: Answer): Promise<QuestionResult> {
    return {
      question: id,
      answer,
      correctAnswer: null,
      explanation: null,
      grade: (answer.numberQuestionCorrect / answer.numberQuestion) * 10,
    };
  }

  transformContent(questionList: CreateWordSearchDto[]): WordSearch[] {
    const res: WordSearch[] = [];

    questionList.forEach(q => {
      q.question.words = q.question.words.map(word => word.toUpperCase());
      const maxWordLength = calculateMaxLength(q.question.words);

      if (
        q.question.col - maxWordLength < 3 ||
        q.question.row - maxWordLength < 3
      ) {
        throw new BadRequestException(
          'Row and column must be greater than the longest word by at least 3',
        );
      }
      const rows = q.question.row
        ? q.question.row
        : 10 - maxWordLength >= 3
        ? 10
        : maxWordLength + 3;
      const cols = q.question.col
        ? q.question.col
        : 10 - maxWordLength >= 3
        ? 10
        : maxWordLength + 3;

      res.push({
        ...q,
        question: {
          ...q.question,
          rows: generateWordSearch(rows, cols, q.question.words),
        },
      });
    });

    return res;
  }

  setDefaultExplain() {
    return null;
  }
}
