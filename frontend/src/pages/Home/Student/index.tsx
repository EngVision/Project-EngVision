import { useQuery } from '@tanstack/react-query'
import { Button, Calendar } from 'antd'
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  RadialLinearScale,
  Title,
  Tooltip,
} from 'chart.js'
import dayjs from 'dayjs'
import 'dayjs/locale/en'
import 'dayjs/locale/vi'
import { isEmpty, map, reduce, slice } from 'lodash'
import { useMemo } from 'react'
import { Line } from 'react-chartjs-2'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { CourseCard } from '../../../components/CourseCard'
import Fire from '../../../components/Icons/Fire'
import QuickStart from '../../../components/QuickStart'
import AppLoading from '../../../components/common/AppLoading'
import { useAppSelector } from '../../../hooks/redux'
import checkListApi from '../../../services/checkListApi'
import coursesApi from '../../../services/coursesApi'
import submissionApi from '../../../services/submissionApi'
import { cellRender } from '../Components/CalendarRender'
import ProgressCard from '../Components/ProgressCard'
import RadarChart from '../Components/RadarChart'
dayjs.locale('en')

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  Filler,
)

export const Student = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'Home' })
  const navigate = useNavigate()

  const userLevel = useAppSelector((state) => state.app.currentLevel)

  const isDarkMode = useAppSelector((state) => state.app.darkMode)

  const { data: rawCourseExercise, isLoading: isLoadingRawCourseExercise } =
    useQuery({
      queryKey: ['coursesExercises'],
      queryFn: () => coursesApi.getCoursesExercises(),
    })

  const { data: rawSubmissionList, isLoading: isLoadingRawSubmissionList } =
    useQuery({
      queryKey: ['submission'],
      queryFn: () => submissionApi.getSubmissionList(),
    })

  const { data: rawSuggestedList, isLoading: isLoadingRawSuggestedList } =
    useQuery({
      queryKey: ['suggestedCourses', { levels: userLevel?.CEFRLevel }],
      queryFn: () => coursesApi.getSuggestedCourses(),
    })

  const { data: rawCheckListItems } = useQuery({
    queryKey: ['checkListItems'],
    queryFn: () => checkListApi.getCheckListItems(),
  })

  const calculateExercisesByDay = () => {
    const exercisesByDay: Record<string, number> = {}

    if (rawSubmissionList?.data) {
      const startOfThisWeek = dayjs().startOf('week')
      const endOfThisWeek = dayjs().endOf('week')
      const initialData: Record<string, number> = {}
      const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      daysOfWeek.forEach((day) => {
        initialData[day] = 0
      })
      Object.assign(exercisesByDay, initialData)

      rawSubmissionList.data.forEach((submission: any) => {
        const submissionDate = dayjs(submission.updatedAt)
        const isWithinThisWeek =
          submissionDate >= startOfThisWeek && submissionDate <= endOfThisWeek

        if (isWithinThisWeek) {
          const formattedDate = submissionDate.format('ddd')
          exercisesByDay[formattedDate] =
            (exercisesByDay[formattedDate] || 0) + submission.totalDone
        }
      })
    }

    const chartData = Object.keys(exercisesByDay).map((day) => ({
      day,
      exercises: exercisesByDay[day],
    }))

    return chartData
  }

  const exerciseData = useMemo(
    () => calculateExercisesByDay(),
    [rawCourseExercise?.data, rawSubmissionList],
  )

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      x: {
        grid: {
          color: isDarkMode ? '#555555' : '#DDDDDD',
        },
      },
      y: {
        grid: {
          color: isDarkMode ? '#555555' : '#DDDDDD',
        },
      },
    },
  }

  const data = {
    labels: exerciseData.map((item: { day: any }) => item.day),
    datasets: [
      {
        label: 'Exercises',
        data: exerciseData.map((item: { exercises: any }) => item.exercises),
        borderColor: '#F76519',
        backgroundColor: 'rgba(247, 101, 25, 0.5)',
        pointBackgroundColor: '#F76519',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#F76519',
      },
    ],
  }

  const exercise = useMemo(() => {
    const exercise = {
      totalDone: 0,
      totalQuestion: 0,
      totalInProcess: 0,
    }

    if (rawSubmissionList?.data) {
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

  const DashboardCard = (title: any, value: any) => {
    return (
      <div className="w-[100%/4] h-44 p-2 my-4 flex flex-col items-center justify-center text-xl">
        <div className="text-3xl font-bold">{value}</div>
        <div className=" text-center">{title}</div>
      </div>
    )
  }

  const calculateDayStreaks = () => {
    let uniqueSubmissions = []
    if (rawSubmissionList?.data) {
      const submissionSet = new Set()
      const sortedSubmissions =
        rawSubmissionList?.data?.sort((a, b) =>
          dayjs(b.updatedAt).diff(dayjs(a.updatedAt)),
        ) || []

      uniqueSubmissions = sortedSubmissions.reduce(
        (result: any[], submission: any) => {
          const submissionDate = dayjs(submission.updatedAt).startOf('day')
          const formattedDate = submissionDate.format('YYYY-MM-DD')

          if (!submissionSet.has(formattedDate)) {
            result.push(submission)
            submissionSet.add(formattedDate)
          }

          return result
        },
        [],
      )

      let currentStreak = 0
      let currentDate = dayjs()

      for (const submission of uniqueSubmissions) {
        const submissionDate = dayjs(submission.updatedAt)
        const isConsecutiveDay =
          currentDate
            .startOf('day')
            .diff(submissionDate.startOf('day'), 'day') === 1 ||
          currentDate.isSame(submissionDate, 'day')

        if (isConsecutiveDay) {
          currentStreak++
        } else {
          break
        }

        currentDate = submissionDate
      }

      return currentStreak
    }

    return 0
  }

  const dayStreaks = useMemo(
    () => calculateDayStreaks(),
    [rawSubmissionList?.data],
  )

  if (
    isLoadingRawCourseExercise ||
    isLoadingRawSuggestedList ||
    isLoadingRawSubmissionList
  ) {
    return <AppLoading />
  }

  const courseTotalDone = reduce(
    rawCourseExercise?.data,
    (sum, course: any) => {
      return course.progress === 1 ? sum + 1 : sum
    },
    0,
  )

  return (
    <div className="flex flex-row gap-5 max-lg:flex-wrap">
      {/* Part Left */}
      <div className="basis-full lg:basis-3/4">
        <div className="bg-surface flex rounded-2xl mt-0">
          <div className="basis-1/3 rounded-2xl m-3 bg-gradient-to-r from-[#5BB3D7] to-[#001171] text-white">
            {DashboardCard(t('Completed Course'), courseTotalDone)}
          </div>
          <div className="basis-1/3 rounded-2xl m-3 bg-gradient-to-r from-[#C6ECFE] to-[#77AFFE] text-dark">
            {DashboardCard(t('Completed Exercises'), exercise.totalDone)}
          </div>
          <div className="basis-1/3 rounded-2xl m-3 bg-gradient-to-r from-[#C7DFF2] to-[#D2BBE6] text-dark">
            {DashboardCard(t('Your Level'), userLevel?.CEFRLevel)}
          </div>
        </div>

        <RadarChart />

        <div className="bg-surface rounded-2xl my-8 p-5">
          <div className="flex justify-between w-full mb-2">
            <p className="text-2xl font-bold ">{t('Your Progress')}</p>
            <Button
              type="text"
              className="text-base bg-white"
              onClick={() => navigate(`./my-hub`)}
            >
              {t('Show all')} &gt;
            </Button>
          </div>
          {!isEmpty(rawCourseExercise?.data) ? (
            map(slice(rawCourseExercise?.data, 0, 5), (course: any) => (
              <div className="my-4" key={course.id}>
                <ProgressCard course={course} />
              </div>
            ))
          ) : (
            <div className="text-center">{t('No course')}</div>
          )}
        </div>

        <div className="bg-surface rounded-2xl p-5">
          <div className="flex justify-between w-full mb-2">
            <p className="text-2xl font-bold mb-3">{t('Topics for you')}</p>
            <Button
              type="text"
              className="text-base bg-white"
              onClick={() => navigate(`./discover`)}
            >
              {t('Show all')} &gt;
            </Button>
          </div>
          {rawSuggestedList && (
            <div className="flex flex-wrap gap-4">
              {rawSuggestedList?.data.length ? (
                rawSuggestedList?.data
                  .slice(0, 3)
                  .map((course) => (
                    <CourseCard course={course} key={course.id} />
                  ))
              ) : (
                <div className="col-span-4 text-center italic text-textSubtle">
                  <p className="text-lg">{t('No courses found')}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Part Right */}
      <div className="basis-1/4 rounded-2xl max-lg:w-full">
        <div className="relative h-56 bg-yellow-400 rounded-2xl">
          <div className="absolute bottom-0 right-0">
            <Fire />
          </div>
          <div className=" bg-slate-200 text-[#F76519] font-semibold text-xl w-fit h-fit py-1 px-3 rounded-2xl top-5 left-5 absolute">
            <p>{t('STREAK SOCIETY')}</p>
          </div>
          <div className="bottom-9 left-7 absolute flex flex-col items-center justify-center text-2xl text-blue-600">
            <div className="text-6xl font-bold">{dayStreaks}</div>
            <div className="text-center">DAY STREAKS</div>
          </div>
        </div>

        <div>
          <Calendar fullscreen={false} fullCellRender={cellRender} />
        </div>
        <div className="bg-surface rounded-2xl p-5 mt-8">
          <div className=" w-full mb-2">
            <p className="text-xl font-bold ">{t('Exercise Learned')}</p>
            <p className="text-base mb-5">{t('Data update every time')}</p>
          </div>
          <div className="flex justify-center">
            <div style={{ width: '100%' }}>
              <Line options={options} data={data} />
            </div>
          </div>
        </div>
      </div>
      {rawCheckListItems && !rawCheckListItems?.isDone && (
        <QuickStart checkListItems={rawCheckListItems.items} />
      )}
    </div>
  )
}

export default Student
