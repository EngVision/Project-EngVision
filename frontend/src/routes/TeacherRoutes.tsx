import { RouteObject } from 'react-router-dom'
import Exam from '../pages/Exam'
import Exercise from '../pages/Exercise'
import Statistic from '../pages/Statistic'
import TeacherCourseDetail from '../pages/Teacher/CourseDetail'
import TeacherCourses from '../pages/Teacher/Courses'
import LessonDetail from '../pages/Teacher/LessonDetail'
import ManageExercise from '../pages/Teacher/ManageExercise'
import { PRIVATE_ROUTES, TEACHER_ROUTES } from '../utils/constants'

import DefaultLayout from '../layouts/DefaultLayout'

const teacherRoutes: RouteObject[] = [
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
            path: ':courseId',
            children: [
              {
                element: <TeacherCourseDetail />,
                path: '',
              },
              {
                path: 'lessons',
                children: [
                  {
                    path: ':lessonId',
                    children: [
                      {
                        element: <LessonDetail />,
                        path: '',
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
            ],
          },
        ],
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

export default teacherRoutes
