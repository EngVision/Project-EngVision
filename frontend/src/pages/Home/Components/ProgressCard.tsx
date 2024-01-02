import { useQuery } from '@tanstack/react-query'
import { Button, Progress } from 'antd'
import { useNavigate } from 'react-router-dom'
import BookSquare from '../../../components/Icons/BookSquare'
import AppLoading from '../../../components/common/AppLoading'
import coursesApi from '../../../services/coursesApi'
import { ObjectId } from '../../../services/examSubmissionApi/type'
import submissionApi from '../../../services/submissionApi'

const ProgressCard = (course: any) => {
  const navigate = useNavigate()

  console.log(course.course.title, 'course')

  const { data: rawCourseExercise, isLoading: isLoadingRawCourseExercise } =
    useQuery({
      queryKey: ['coursesExercises'],
      queryFn: () => coursesApi.getCoursesExercises(),
    })

  const { data: submissions, isLoading: isLoadingSubmissions } = useQuery({
    queryKey: ['submissions'],
    queryFn: () => {
      return fetchSubmissions(rawCourseExercise?.data || [])
    },
    enabled: !!rawCourseExercise,
  })

  const fetchSubmissions = async (objectIdList: ObjectId[]) => {
    const submissionsPromises = objectIdList.map((objectId) =>
      submissionApi.getSubmissionList({ course: objectId.id, limit: -1 }),
    )
    const submissionsRes = await Promise.all(submissionsPromises)
    return submissionsRes
  }

  const findSubmissions = (courseId: string) => {
    if (!Array.isArray(submissions)) return []
    const data = submissions?.find(
      (submission) => submission.data?.[0]?.course?.id === courseId,
    )

    return data?.data
  }

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

  if (isLoadingSubmissions || isLoadingRawCourseExercise) return <AppLoading />

  return (
    <div className="grid grid-cols-4 gap-2 bg-bgNeutral rounded-2xl items-center p-2">
      <div className="ml-5 items-center col-span-2 flex">
        <BookSquare />
        <div className="ml-3">
          <p className="text-base font-bold">{course.course.title}</p>
          <p className="text-sm">{course.course.about}</p>
        </div>
      </div>

      <div>
        <Progress
          type="circle"
          size={50}
          percent={getProgress(course.course)}
        />
      </div>
      <div className="mx-auto">
        <Button
          className="bg-green-500 text-white rounded-xl"
          onClick={() => navigate(`./my-hub/${course.course.id}`)}
        >
          Continue
        </Button>
      </div>
    </div>
  )
}

export default ProgressCard
