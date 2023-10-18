import { useEffect, useState } from 'react'
import TeacherLearn from '../../components/Icons/TeacherLearn'
import { useAppSelector } from '../../hooks/redux'
import { AssignmentResponse } from '../../services/assignmentApi/types'
import assignmentApi from '../../services/assignmentApi'
import { CEFRLevel, COURSE_STATUS, NextDue } from '../../utils/constants'
import coursesApi from '../../services/coursesApi'
import { CourseParams } from '../../services/coursesApi/types'

const Home = () => {
  const status: any = { status: COURSE_STATUS.attended }
  const user = useAppSelector((state) => state.app.user)

  const [assignments, setAssignments] = useState<AssignmentResponse[]>([])
  const [courseList, setCourseList] = useState<CourseParams[]>([])

  const level = CEFRLevel
  const nextDue = NextDue
  const exercise = {
    totalDone: 0,
    totalQuestion: 0,
    totalInProcess: 0,
  }

  useEffect(() => {
    try {
      const fetchAssignments = async () => {
        const data = await assignmentApi.getAssignments()
        console.log(data)
        setAssignments(data)
      }
      const fetchCourses = async () => {
        const courses: any = await coursesApi.getCourses(status)
        console.log(courses)
        setCourseList(courses.data)
      }

      fetchAssignments()
      fetchCourses()
    } catch (error) {
      console.error('Error fetching assignments:', error)
    }
  }, [])

  assignments.forEach((assignment) => {
    if (assignment.totalDone) {
      exercise.totalDone += assignment.totalDone
    } else if (assignment.totalQuestion) {
      exercise.totalQuestion += assignment.totalQuestion
    }
    exercise.totalInProcess = exercise.totalQuestion - exercise.totalDone
  })

  const NotiDashboard = () => {
    return (
      <div className="flex flex-row px-5 justify-between bg-[#41AB3F] rounded-xl items-center">
        <div className="basis-1/4 text-xl text-white">
          Hi, {user?.firstName + ' ' + user?.lastName}! <br /> You have{' '}
          {exercise.totalInProcess} upcoming assignments due and have to finish
          0 courses!
        </div>
        <div>
          <TeacherLearn height={241} width={240} />
        </div>
      </div>
    )
  }
  const CardDashborad = (title: string, value: any) => {
    return (
      <div className="w-60 h-56 p-2 my-4 flex flex-col rounded-xl bg-white items-center justify-center text-xl">
        <div className="text-blue-600 text-center">{title}</div>
        <div className="text-blue-700 font-bold">{value}</div>
      </div>
    )
  }
  return (
    <div className="flex flex-col">
      <div className="mb-8">
        <NotiDashboard />
      </div>
      <div className="flex flex-wrap justify-between space-x-1">
        {CardDashborad('EXERCISES', exercise.totalInProcess)}
        {CardDashborad('TOTAL EXERCISES', exercise.totalQuestion)}
        {CardDashborad('NEXT DUE', nextDue.tomorrow)}
        {CardDashborad('SUBMITTED ASSIGNMENTS', exercise.totalDone)}
        {CardDashborad('COURSES LEARNING', courseList.length)}
        {CardDashborad('TOTAL COURSES', courseList.length)}
        {CardDashborad('FINISHED COURSES', 0)}
        {CardDashborad('CERF LEVEL', level.C1)}
      </div>
    </div>
  )
}

export default Home
