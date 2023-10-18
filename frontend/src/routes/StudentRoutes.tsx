import { RouteObject } from 'react-router-dom'
import DefaultLayout from '../layouts/DefaultLayout'
import CourseDetailsPage from '../pages/CourseDetails'
import Discover from '../pages/Discover'
import Exercise from '../pages/Exercise'
import MyHub from '../pages/MyHub'
import Statistic from '../pages/Statistic'
import { PRIVATE_ROUTES, STUDENT_ROUTES } from '../utils/constants'
import ExercisesAndExams from '../pages/ExercisesAndExams'

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
                    element: <Exercise />,
                    path: ':id',
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
