import { Line, Radar } from '@ant-design/charts'
import { useQuery } from '@tanstack/react-query'
import { Button, Calendar, CalendarProps, Progress } from 'antd'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import 'dayjs/locale/en'
import 'dayjs/locale/vi'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CourseCard } from '../../components/CourseCard'
import BookSquare from '../../components/Icons/BookSquare'
import Fire from '../../components/Icons/Fire'
import AppLoading from '../../components/common/AppLoading'
import coursesApi from '../../services/coursesApi'
import { ObjectId } from '../../services/examSubmissionApi/type'
import submissionApi from '../../services/submissionApi'
import { lessonApi } from '../../services/userLevelApi'
import Grammar from '../../components/Icons/Grammar'
import Skimming from '../../components/Icons/Skimming'
import Conciseness from '../../components/Icons/Skimming'
import Pronunciation from '../../components/Icons/Pronunciation'

dayjs.locale('en')

const Home = () => {
  const navigate = useNavigate()

  const { data: rawCourseExercise } = useQuery({
    queryKey: ['coursesExercises'],
    queryFn: () => coursesApi.getCoursesExercises(),
  })

  const { data: rawSubmissionList } = useQuery({
    queryKey: ['submission'],
    queryFn: () => submissionApi.getSubmissionList(),
  })

  const { data: userLevel } = useQuery({
    queryKey: ['courses'],
    queryFn: () => lessonApi.getUserLevel(),
  })

  console.log(userLevel, 'userLevel')

  const fetchSubmissions = async (objectIdList: ObjectId[]) => {
    const submissionsPromises = objectIdList.map((objectId) =>
      submissionApi.getSubmissionList({ course: objectId.id, limit: 10000 }),
    )
    const submissionsRes = await Promise.all(submissionsPromises)
    return submissionsRes
  }

  const { data: submissions, isLoading: isLoadingSubmissions } = useQuery({
    queryKey: ['submissions'],
    queryFn: () => {
      return fetchSubmissions(rawCourseExercise?.data || [])
    },
    enabled: !!rawCourseExercise,
  })

  const findSubmissions = (courseId: string) => {
    if (!Array.isArray(submissions)) return []
    const data = submissions?.find(
      (submission) => submission.data?.[0]?.course?.id === courseId,
    )

    return data?.data
  }

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
    [rawCourseExercise?.data, submissions],
  )

  console.log(userLevel?.data, 'userLevel?.data')

  const processScore = (value: any) => (value === null ? 0 : value)

  const dataRadarChart = [
    {
      category: 'Listening',
      comprehension: processScore(userLevel?.data.listening.comprehension),
      overall: 150,
      grammar: processScore(userLevel?.data.listening.grammar),
      vocabulary: processScore(userLevel?.data.listening.vocabulary),
    },
    {
      category: 'Reading',
      skimming: processScore(userLevel?.data.reading.skimming),
      scanning: processScore(userLevel?.data.reading.scanning),
      comprehension: processScore(userLevel?.data.reading.comprehension),
      overall: 200,
      grammar: processScore(userLevel?.data.reading.grammar),
      vocabulary: processScore(userLevel?.data.reading.vocabulary),
    },
    {
      category: 'Writing',
      organization: processScore(userLevel?.data.writing.organization),
      coherence: processScore(userLevel?.data.writing.coherence),
      conciseness: processScore(userLevel?.data.writing.conciseness),
      overall: 250,
      grammar: processScore(userLevel?.data.writing.grammar),
      vocabulary: processScore(userLevel?.data.writing.vocabulary),
    },
    {
      category: 'Speaking',
      pronunciation: processScore(userLevel?.data.speaking.pronunciation),
      fluency: processScore(userLevel?.data.speaking.fluency),
      overall: 175,
      grammar: processScore(userLevel?.data.speaking.grammar),
      vocabulary: processScore(userLevel?.data.speaking.vocabulary),
    },
  ]

  const dataListeningRadarChart = [
    {
      category: 'Comprehension',
      overall: processScore(userLevel?.data.listening.comprehension),
    },
    {
      category: 'Grammar',
      overall: processScore(userLevel?.data.listening.grammar),
    },
    {
      category: 'Vocabulary',
      overall: processScore(userLevel?.data.listening.vocabulary),
    },
  ]

  const dataReadingRadarChart = [
    {
      category: 'Skimming',
      overall: processScore(userLevel?.data.reading.skimming),
    },
    {
      category: 'Scanning',
      overall: processScore(userLevel?.data.reading.scanning),
    },
    {
      category: 'Comprehension',
      overall: processScore(userLevel?.data.reading.comprehension),
    },
    {
      category: 'Grammar',
      overall: processScore(userLevel?.data.reading.grammar),
    },
    {
      category: 'Vocabulary',
      overall: processScore(userLevel?.data.reading.vocabulary),
    },
  ]

  const dataWritingRadarChart = [
    {
      category: 'Organization',
      overall: processScore(userLevel?.data.writing.organization),
    },
    {
      category: 'Coherence',
      overall: processScore(userLevel?.data.writing.coherence),
    },
    {
      category: 'Conciseness',
      overall: processScore(userLevel?.data.writing.conciseness),
    },
    {
      category: 'Grammar',
      overall: processScore(userLevel?.data.writing.grammar),
    },
    {
      category: 'Vocabulary',
      overall: processScore(userLevel?.data.writing.vocabulary),
    },
  ]

  const dataSpeakingRadarChart = [
    {
      category: 'Pronunciation',
      overall: processScore(userLevel?.data.speaking.pronunciation),
    },
    {
      category: 'Fluency',
      overall: processScore(userLevel?.data.speaking.fluency),
    },
    {
      category: 'Grammar',
      overall: processScore(userLevel?.data.speaking.grammar),
    },
    {
      category: 'Vocabulary',
      overall: processScore(userLevel?.data.speaking.vocabulary),
    },
  ]

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const handleClick = (category: string) => {
    setSelectedCategory(category)
  }

  const dataMap = {
    Speaking: dataSpeakingRadarChart,
    Writing: dataWritingRadarChart,
    Reading: dataReadingRadarChart,
    Listening: dataListeningRadarChart,
  }

  const filteredDataRadarChart = selectedCategory
    ? dataMap[selectedCategory]
    : dataRadarChart

  const configRadarChart = {
    data: filteredDataRadarChart,
    xField: 'category',
    yField: 'overall',
    meta: {
      value: { alias: 'Score' },
    },
    xAxis: {
      line: null,
      tickLine: null,
      label: {
        style: {
          fontSize: 16,
        },
      },
    },
    yAxis: {
      min: 0,
      max: 250,
      line: null,
      tickLine: null,
      grid: {
        line: {
          type: 'line',
        },
      },
    },
    radiusAxis: {
      grid: {
        alternateColor: ['rgba(0, 0, 0, 0.04)', null],
      },
    },
    area: {
      visible: false,
    } as any,
    point: {
      visible: true,
    } as any,
  }

  const configLineChart = {
    data: exerciseData,
    height: 200,
    autoFit: true,
    xField: 'day',
    yField: 'exercises',
    point: {
      size: 5,
      shape: 'diamond',
      color: '#F76519',
    },
    label: {
      style: {
        fill: '#aaa',
      },
    },
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

  const getProgress = (course: any) => {
    if (course.exercises?.length === 0) return 100
    const submissionArray = findSubmissions(course.id)
    const countExerciseDone = submissionArray?.filter(
      (submission) => submission.progress === 1,
    ).length
    if (!countExerciseDone) return 0

    return Number(
      ((countExerciseDone / (course.exercises?.length || 1)) * 100).toPrecision(
        2,
      ),
    )
  }

  const course = useMemo(() => {
    const course = {
      totalDone: 0,
    }

    if (rawCourseExercise?.data) {
      rawCourseExercise.data.forEach((assignment) => {
        if (getProgress(assignment) === 100) {
          course.totalDone += 1
        }
      })
    }

    return course
  }, [rawSubmissionList?.data])

  const { data: rawSuggestedList } = useQuery({
    queryKey: ['suggestedCourses', { levels: userLevel?.data.CEFRLevel }],
    queryFn: () => coursesApi.getSuggestedCourses(),
  })

  const DashboardCard = (title: any, value: any) => {
    return (
      <div className="w-[100%/4] h-44 p-2 my-4 flex flex-col items-center justify-center text-xl">
        <div className="text-3xl font-bold">{value}</div>
        <div className=" text-center">{title}</div>
      </div>
    )
  }

  const ProgressCard = (course: any) => {
    return (
      <div className="grid grid-cols-4 gap-2 bg-bgNeutral rounded-2xl items-center p-2">
        <div className="ml-5 items-center col-span-2 flex">
          <BookSquare />
          <div className="ml-3">
            <p className="text-base font-bold">{course.title}</p>
            <p className="text-sm">{course.about}</p>
          </div>
        </div>

        <div>
          <Progress type="circle" size={50} percent={getProgress(course)} />
        </div>
        <div className="mx-auto">
          <Button
            className="bg-green-500 text-white rounded-xl"
            onClick={() => navigate(`./my-hub/${course.id}`)}
          >
            Continue
          </Button>
        </div>
      </div>
    )
  }

  const dateCellRender = (value: any) => {
    const formattedDate = value.format('YYYY-MM-DD')
    const hasSubmission = rawSubmissionList?.data.some((submission: any) => {
      const submissionDate = dayjs(submission.updatedAt).format('YYYY-MM-DD')
      return dayjs(submissionDate).isSame(formattedDate, 'day')
    })

    return (
      <div className={`${hasSubmission ? 'bg-[#F76519]' : ''} rounded-3xl`}>
        {hasSubmission ? (
          <span className="text-white">{value.date()}</span>
        ) : (
          value.date()
        )}
      </div>
    )
  }

  const monthCellRender = (value: any) => {
    return (
      <div
        className={`calendar-cell 
        } rounded-3xl`}
      >
        {value.month() + 1}
      </div>
    )
  }

  const calculateDayStreaks = () => {
    if (rawSubmissionList?.data) {
      const sortedSubmissions = rawSubmissionList.data.sort((a: any, b: any) =>
        dayjs(b.updatedAt).diff(dayjs(a.updatedAt)),
      )

      let currentStreak = 0
      let currentDate = dayjs()

      for (const submission of sortedSubmissions) {
        const submissionDate = dayjs(submission.updatedAt)
        const isConsecutiveDay =
          currentDate.diff(submissionDate, 'day') === 1 ||
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

  const cellRender: CalendarProps<Dayjs>['fullCellRender'] = (
    current,
    info,
  ) => {
    if (info.type === 'date') return dateCellRender(current)
    if (info.type === 'month') return monthCellRender(current)
    return info.originNode
  }

  if (isLoadingSubmissions) return <AppLoading />

  type GradientColors = {
    [key: string]: { start: string; end: string }
  }

  const gradientColors: GradientColors = {
    Listening: { start: '#5BB3D7', end: '#001171' },
    Reading: { start: '#F76519', end: '#001171' },
    Writing: { start: '#0088FE', end: '#001171' },
    Speaking: { start: '#00C49F', end: '#001171' },
  }
  return (
    <div className="flex flex-row gap-5 max-lg:flex-wrap ">
      <div className="basis-3/4">
        <div className="bg-surface flex rounded-2xl mt-0">
          <div className="basis-1/3 rounded-2xl m-3 bg-gradient-to-r from-[#5BB3D7] to-[#001171] text-white">
            {DashboardCard('Completed Course', course.totalDone)}
          </div>
          <div className="basis-1/3 rounded-2xl m-3 bg-gradient-to-r from-[#C6ECFE] to-[#77AFFE] text-dark">
            {DashboardCard('Completed Exercises', exercise.totalDone)}
          </div>
          <div className="basis-1/3 rounded-2xl m-3 bg-gradient-to-r from-[#C7DFF2] to-[#D2BBE6] text-dark">
            {DashboardCard('Your Level', userLevel?.data.CEFRLevel)}
          </div>
        </div>

        <div className="bg-surface rounded-2xl flex justify-center mb-8 p-5">
          <div style={{ width: '70%' }}>
            <p className="text-2xl font-bold ">Your Skills</p>
            <Radar {...configRadarChart} />
            <div className="flex justify-center my-10 text-xl">
              {selectedCategory ? selectedCategory : 'Overall'} Score
            </div>
          </div>
          <div style={{ width: '30%', paddingLeft: '20px' }}>
            <div>
              <div
                className="rounded-2xl mb-3 hover:cursor-pointer bg-gradient-to-r from-[#8B5CF6] to-[#001171] text-white transform transition-transform hover:scale-105"
                onClick={() => handleClick('')}
              >
                <div className="w-[100%/2] h-40 p-2 my-4 flex flex-col items-center justify-center text-2xl">
                  <div className="text-5xl font-bold">
                    {userLevel?.data.overall}
                  </div>
                  <div className=" text-center">Overall</div>
                </div>
              </div>

              {dataRadarChart.map((item) => {
                const categoryStyle = {
                  background: `linear-gradient(to right, ${
                    gradientColors[item.category].start
                  }, ${gradientColors[item.category].end})`,
                }

                return (
                  <div
                    style={categoryStyle}
                    key={item.category}
                    className={`text-white mb-1 basis-1/3 rounded-2xl my-3 hover:cursor-pointer transform transition-transform hover:scale-105`}
                    onClick={() => handleClick(item.category)}
                  >
                    <div className="w-[100%/2] h-20 p-2 my-4 flex flex-col items-center justify-center text-xl">
                      <div className="text-3xl font-bold">
                        {processScore(item.overall)}
                      </div>
                      <div className="text-center">{item.category}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="bg-surface rounded-2xl my-8 p-5">
          <div className="flex justify-between w-full mb-2">
            <p className="text-2xl font-bold ">Your Progress</p>
            <Button
              type="text"
              className="text-base bg-white"
              onClick={() => navigate(`./my-hub`)}
            >
              Show all &gt;
            </Button>
          </div>
          {rawCourseExercise &&
            (rawCourseExercise.data.length > 0 ? (
              rawCourseExercise.data
                .filter(
                  (course: any) =>
                    getProgress(course) > 0 && getProgress(course) < 100,
                )
                .slice(0, 3)
                .map((course: any) => (
                  <div className="my-4" key={course.id}>
                    {ProgressCard(course)}
                  </div>
                ))
            ) : (
              <div className="text-center">No course</div>
            ))}
        </div>

        <div className="bg-surface rounded-2xl p-5">
          <div className="flex justify-between w-full mb-2">
            <p className="text-2xl font-bold mb-3">Topics for you</p>
            <Button
              type="text"
              className="text-base bg-white"
              onClick={() => navigate(`./discover`)}
            >
              Show all &gt;
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
                  <p className="text-lg">No courses found</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="basis-1/4 rounded-2xl">
        <div className="relative h-56 bg-yellow-400 rounded-2xl">
          <div className="absolute bottom-0 right-0">
            <Fire />
          </div>

          <div className=" bg-slate-200 text-[#F76519] font-semibold text-xl w-fit h-fit py-1 px-3 rounded-2xl top-5 left-5 absolute">
            <p>STREAK SOCIETY</p>
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
            <p className="text-xl font-bold ">Exercise Learned</p>
            <p className="text-base mb-5">Data update every time</p>
          </div>
          <div className="flex justify-center">
            <div style={{ width: '100%' }}>
              <Line {...configLineChart} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
