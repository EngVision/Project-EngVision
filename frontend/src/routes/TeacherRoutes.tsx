import Chat from '../pages/Chat'
import Exam from '../pages/Exam'
import Exercise from '../pages/Exercise'
import HelpCenter from '../pages/HelpCenter'
import Home from '../pages/Home'
import MakeSentences from '../pages/Lesson/MakeSentences'
import MultipleChoice from '../pages/Lesson/MultipleChoice'
import ManageExercise from '../pages/ManageExercise'
import Settings from '../pages/Settings'
import Statistic from '../pages/Statistic'
import TeacherCourseDetail from '../pages/Teacher/CourseDetail'
import TeacherCourses from '../pages/Teacher/Courses'
import TeacherCreateCourse from '../pages/Teacher/CreateCourse'
import LessonDetail from '../pages/Teacher/LessonDetail'
import { UpdateProfile } from '../pages/UpdateProfile'
import { PRIVATE_ROUTES, TEACHER_ROUTES } from '../utils/constants'

import RoleRoutes from './RoleRoutes'
import type { RouteElement } from './types'

const teacherRoutes: RouteElement[] = [
  {
    element: Home,
    path: PRIVATE_ROUTES.home,
  },
  {
    element: TeacherCourses,
    path: TEACHER_ROUTES.courses,
  },
  {
    element: Exam,
    path: TEACHER_ROUTES.assignmentExam,
  },
  {
    element: Exercise,
    layout: null,
    path: PRIVATE_ROUTES.exercise,
  },
  {
    element: ManageExercise,
    path: PRIVATE_ROUTES.createExercise,
  },
  {
    element: ManageExercise,
    path: PRIVATE_ROUTES.editExercise,
  },
  {
    element: Statistic,
    path: PRIVATE_ROUTES.statistic,
  },
  {
    element: Chat,
    path: PRIVATE_ROUTES.chat,
  },
  {
    element: MakeSentences,
    path: PRIVATE_ROUTES.makeSentence,
  },
  {
    element: Settings,
    path: PRIVATE_ROUTES.settings,
  },
  {
    element: HelpCenter,
    path: PRIVATE_ROUTES.helpCenter,
  },
  {
    element: TeacherCourseDetail,
    path: TEACHER_ROUTES.courseDetail,
  },
  {
    element: TeacherCreateCourse,
    path: TEACHER_ROUTES.createCourse,
  },
  {
    element: Exercise,
    layout: null,
    path: PRIVATE_ROUTES.exercise,
  },
  {
    element: MultipleChoice,
    path: PRIVATE_ROUTES.multipleChoice,
  },
  {
    element: UpdateProfile,
    path: PRIVATE_ROUTES.updateProfile,
  },
  {
    element: LessonDetail,
    path: TEACHER_ROUTES.lessonDetail,
  },
]

const TeacherRoutes = () => {
  return <RoleRoutes routes={teacherRoutes} />
}

export default TeacherRoutes
