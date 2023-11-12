import { RouteObject } from 'react-router-dom'
import DefaultLayout from '../layouts/DefaultLayout'
import CourseDetailsPage from '../pages/CourseDetails'
import Discover from '../pages/Discover'
import MyHub from '../pages/MyHub'
import Statistic from '../pages/Statistic'
import { PRIVATE_ROUTES, STUDENT_ROUTES } from '../utils/constants'
import ExercisesAndExams from '../pages/ExercisesAndExams'
import GetStarted from '../pages/Student/GetStarted'
import NoLayout from '../layouts/NoLayout'
import DoExercise from '../pages/DoExercise'
import DoExam from '../pages/DoExam'

export const studentRoutes: RouteObject[] = [
  {
    element: <DefaultLayout />,
    children: [
      { element: <MyHub />, path: STUDENT_ROUTES.myHub },
      {
        element: <ExercisesAndExams />,
        path: STUDENT_ROUTES.exercisesAndExams,
      },

      {
        element: <Statistic />,
        path: PRIVATE_ROUTES.statistic,
      },
      {
        element: <DoExam />,
        path: 'exam/:examId',
      },
      {
        path: 'discover',
        children: [
          {
            element: <Discover />,
            path: '',
          },
          {
            path: ':courseId',
            children: [
              {
                path: '',
                element: <CourseDetailsPage />,
              },
              {
                path: 'exercise',
                children: [
                  {
                    element: <DoExercise />,
                    path: ':exerciseId',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    element: <NoLayout />,
    children: [
      {
        path: 'get-started',
        children: [
          {
            element: <GetStarted />,
            path: '',
          },
          {
            path: ':level',
            children: [
              {
                path: 'exam',
                children: [
                  {
                    element: <DoExam />,
                    path: ':examId',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]

export default studentRoutes
