import { CEFRLevel } from './../enums/exercise.enum';

export const LevelScore = {
  [CEFRLevel.A1]: {
    min: 0,
    max: 40,
  },
  [CEFRLevel.A2]: {
    min: 40,
    max: 80,
  },
  [CEFRLevel.B1]: {
    min: 80,
    max: 120,
  },
  [CEFRLevel.B2]: {
    min: 120,
    max: 160,
  },
  [CEFRLevel.C1]: {
    min: 160,
    max: 200,
  },
  [CEFRLevel.C2]: {
    min: 200,
    max: 250,
  },
};
