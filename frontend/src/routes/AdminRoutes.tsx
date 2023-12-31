import { RouteObject } from 'react-router-dom'
import DefaultLayout from '../layouts/DefaultLayout'
import ManageExam from '../pages/Admin/ManageExam'
import ExamDetail from '../pages/Admin/ManageExam/Component/ExamDetail'
import ManageUsers from '../pages/ManageUsers'
import Statistic from '../pages/Statistic'
import TeacherCourseDetail from '../pages/Teacher/CourseDetail'
import TeacherCourses from '../pages/Teacher/Courses'
import LessonDetail from '../pages/Teacher/LessonDetail'
import ManageExercise from '../pages/Teacher/ManageExercise'
import { ADMIN_ROUTES, PRIVATE_ROUTES } from '../utils/constants'

const adminRoutes: RouteObject[] = [
  {
    element: <DefaultLayout />,
    children: [
      {
        path: ADMIN_ROUTES.exams,
        children: [
          {
            element: <ManageExam />,
            path: '',
          },
          {
            element: <ExamDetail />,
            path: ':examId',
          },
          {
            element: <ExamDetail />,
            path: 'new',
          },
          {
            path: 'parts',
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
]

export default adminRoutes
