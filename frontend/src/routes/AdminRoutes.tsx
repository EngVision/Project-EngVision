import { RouteObject } from 'react-router-dom'
import DefaultLayout from '../layouts/DefaultLayout'
import Exam from '../pages/Exam'
import Exercise from '../pages/Exercise'
import Statistic from '../pages/Statistic'
import TeacherCourseDetail from '../pages/Teacher/CourseDetail'
import TeacherCourses from '../pages/Teacher/Courses'
import LessonDetail from '../pages/Teacher/LessonDetail'
import ManageExercise from '../pages/Teacher/ManageExercise'
import {
  ADMIN_ROUTES,
  PRIVATE_ROUTES,
  TEACHER_ROUTES,
} from '../utils/constants'
import ManageUsers from '../pages/ManageUsers'

const adminRoutes: RouteObject[] = [
  {
    element: <DefaultLayout />,
    children: [
      {
        element: <Exam />,
        path: TEACHER_ROUTES.assignmentExam,
      },
      {
        path: 'courses',
        children: [
          {
            element: <TeacherCourses />,
            path: '',
          },
          {
            element: <TeacherCourseDetail />,
            path: ':courseId',
          },
          {
            path: 'lessons',
            children: [
              {
                element: <LessonDetail />,
                path: ':lessonId',
              },
              {
                path: 'exercises',
                children: [
                  {
                    element: <ManageExercise />,
                    path: '',
                  },
                  {
                    element: <ManageExercise />,
                    path: ':exerciseId',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        element: <ManageUsers />,
        path: ADMIN_ROUTES.manageUsers,
      },
      {
        element: <Statistic />,
        path: PRIVATE_ROUTES.statistic,
      },
    ],
  },
  {
    element: <Exercise />,
    path: PRIVATE_ROUTES.exercise,
  },
]

export default adminRoutes
