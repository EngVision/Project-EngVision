import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import AppLoading from '../../../components/common/AppLoading'
import { lessonApi } from '../../../services/lessonApi'
import ExerciseTable from './ExerciseTable'
import { Button } from 'antd'
import { ArrowLeftIcon } from '../../../components/Icons'
import MaterialsTable from './MaterialsTable'

const LessonDetail = () => {
  const { lessonId = '' } = useParams()
  const navigate = useNavigate()

  const { data: lesson, isLoading } = useQuery({
    queryKey: ['lesson', lessonId],
    queryFn: () => lessonApi.getLesson(lessonId),
  })

  if (isLoading) return <AppLoading />

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Button
          type="primary"
          ghost
          shape="circle"
          icon={<ArrowLeftIcon width={20} height={20} />}
          onClick={() => navigate('../..', { relative: 'path' })}
        />
        <h2>{lesson?.title}</h2>
      </div>
      <ExerciseTable exerciseList={lesson?.exercises ?? []} />
      <MaterialsTable materials={lesson?.materials ?? []} />
    </div>
  )
}

export default LessonDetail
