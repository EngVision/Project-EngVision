import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import AppLoading from '../../../components/common/AppLoading'
import { lessonApi } from '../../../services/lessonApi'
import ExerciseTable from './ExerciseTable'

const LessonDetail = () => {
  const { lessonId = '' } = useParams()

  const { data: lesson, isLoading } = useQuery({
    queryKey: ['lesson', lessonId],
    queryFn: () => lessonApi.getLesson(lessonId),
  })

  if (isLoading) return <AppLoading />

  return (
    <div>
      <h2 className="mb-8">{lesson?.title}</h2>
      <ExerciseTable exerciseList={lesson?.exercises ?? []} />
    </div>
  )
}

export default LessonDetail
