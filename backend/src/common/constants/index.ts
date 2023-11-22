import { CEFRLevel } from './../enums/exercise.enum';

export const LevelScore = {
  [CEFRLevel.A1]: {
    min: 0,
    max: 2,
  },
  [CEFRLevel.A2]: {
    min: 2,
    max: 4,
  },
  [CEFRLevel.B1]: {
    min: 4,
    max: 5,
  },
  [CEFRLevel.B2]: {
    min: 5,
    max: 7,
  },
  [CEFRLevel.C1]: {
    min: 7,
    max: 8.5,
  },
  [CEFRLevel.C2]: {
    min: 8.5,
    max: 10,
  },
};
