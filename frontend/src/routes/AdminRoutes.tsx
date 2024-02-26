import { RouteObject } from 'react-router-dom'
import DefaultLayout from '../layouts/DefaultLayout'
import ManageExam from '../pages/Admin/ManageExam'
import ExamDetail from '../pages/Admin/ManageExam/Component/ExamDetail'
import ManageUsers from '../pages/ManageUsers'
import TeacherCourseDetail from '../pages/Teacher/CourseDetail'
import TeacherCourses from '../pages/Teacher/Courses'
import LessonDetail from '../pages/Teacher/LessonDetail'
import ManageExercise from '../pages/Teacher/ManageExercise'
import { ADMIN_ROUTES } from '../utils/constants'
import Grading from '../pages/Teacher/Grading/Index'
import AssignmentTable from '../pages/Teacher/Grading/AssignmentTable'
import GradeExercise from '../pages/Teacher/GradeExercise'

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
        path: 'grading',
        children: [
          {
            path: ADMIN_ROUTES.grading,
            element: <Grading />,
          },
          {
            path: 'course',
            children: [
              {
                path: ':courseID',
                children: [
                  {
                    element: <AssignmentTable />,
                    path: '',
                  },
                  {
                    element: <GradeExercise />,
                    path: 'exercises/:exerciseId/submissions/:submissionId',
                  },
                ],
              },
            ],
          },
          {
            path: 'exam',
            children: [
              {
                element: <AssignmentTable />,
                path: ':examID',
              },
            ],
          },
        ],
      },
      {
        element: <ManageUsers />,
        path: ADMIN_ROUTES.manageUsers,
      },
    ],
  },
]

export default adminRoutes
