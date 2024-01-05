import { Checklist } from 'src/modules/checklist/schemas/checklist.schema';
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

export const ChecklistItems: Partial<Checklist> = {
  items: [
    {
      title: 'Enroll in a course',
      description: 'Enroll in any course',
      link: '/discover',
      isDone: false,
      disabled: false,
    },
    {
      title: 'Complete an exercise',
      description: 'Complete an exercise in any course you have enrolled',
      link: 'd',
      isDone: false,
      disabled: true,
    },
    {
      title: 'Review a course',
      description: 'Review a course you have enrolled',
      link: '',
      isDone: false,
      disabled: true,
    },
  ],
};
