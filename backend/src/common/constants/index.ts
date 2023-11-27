import { CEFRLevel } from './../enums/exercise.enum';

export const LevelScore = {
  [CEFRLevel.A1]: {
    min: 0,
    max: 120,
  },
  [CEFRLevel.A2]: {
    min: 120,
    max: 140,
  },
  [CEFRLevel.B1]: {
    min: 140,
    max: 160,
  },
  [CEFRLevel.B2]: {
    min: 160,
    max: 180,
  },
  [CEFRLevel.C1]: {
    min: 180,
    max: 200,
  },
  [CEFRLevel.C2]: {
    min: 200,
    max: 230,
  },
};
