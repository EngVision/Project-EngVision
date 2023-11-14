import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import TeacherLearn from '../../components/Icons/TeacherLearn'
import { useAppSelector } from '../../hooks/redux'
import coursesApi from '../../services/coursesApi'
import submissionApi from '../../services/submissionApi'
import { CEFRLevel, COURSE_STATUS, NextDue, Role } from '../../utils/constants'

const Home = () => {
  const user = useAppSelector((state) => state.app.user)
  const status: any = {
    status:
      user?.role === Role.Teacher
        ? COURSE_STATUS.published
        : COURSE_STATUS.attended,
  }

  const level = CEFRLevel
  const nextDue = NextDue

  const { data: rawCourseList } = useQuery({
    queryKey: ['courses', status],
    queryFn: () => coursesApi.getCourses(status),
  })

  const { data: rawSubmissionList } = useQuery({
    queryKey: ['submissions'],
    queryFn: submissionApi.getSubmissionList,
  })

  const exercise = useMemo(() => {
    const exercise = {
      totalDone: 0,
      totalQuestion: 0,
      totalInProcess: 0,
    }

    if (rawSubmissionList) {
      rawSubmissionList.data.forEach((assignment) => {
        if (assignment.totalDone) {
          exercise.totalDone += assignment.totalDone
        }
        if (assignment.totalQuestion) {
          exercise.totalQuestion += assignment.totalQuestion
        }
      })
      exercise.totalInProcess = exercise.totalQuestion - exercise.totalDone
    }

    return exercise
  }, [rawSubmissionList?.data])

  const DashboardNoti = () => {
    return (
      <div className="flex flex-row px-5 justify-between bg-[#41AB3F] rounded-xl items-center">
        <div className="basis-1/4 text-xl text-white">
          Hi, {user?.firstName + ' ' + user?.lastName}! <br /> You have{' '}
          {exercise.totalInProcess} upcoming assignments due and have to finish
          0 courses!
        </div>
        <div className="scale-up">
          <TeacherLearn height={241} width={240} />
        </div>
      </div>
    )
  }
  const DashboardCard = (title: string, value: any) => {
    return (
      <div className="w-[100%/4] h-56 p-2 my-4 flex flex-col rounded-xl bg-white items-center justify-center text-xl">
        <div className="text-blue-600 text-center">{title}</div>
        <div className="text-blue-700 font-bold">{value}</div>
      </div>
    )
  }
  return (
    <div className="flex flex-col">
      <div className="mb-8">
        <DashboardNoti />
      </div>
      {rawCourseList && (
        <div className="grid grid-cols-fill-40 gap-x-6 gap-y-4">
          {DashboardCard('EXERCISES', exercise.totalInProcess)}
          {DashboardCard('TOTAL EXERCISES', exercise.totalQuestion)}
          {DashboardCard('NEXT DUE', nextDue.tomorrow)}
          {DashboardCard('SUBMITTED ASSIGNMENTS', exercise.totalDone)}
          {DashboardCard('COURSES LEARNING', rawCourseList.data.length)}
          {DashboardCard('TOTAL COURSES', rawCourseList.data.length)}
          {DashboardCard('FINISHED COURSES', 0)}
          {DashboardCard('CERF LEVEL', level.C1)}
        </div>
      )}
    </div>
  )
}

export default Home
