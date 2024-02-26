import { Button, Progress } from 'antd'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import BookSquare from '../../../components/Icons/BookSquare'

interface ProgressCardProps {
  course: {
    id: string
    title: string
    progress: number
  }
}

const ProgressCard = ({ course }: ProgressCardProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'Home' })
  const navigate = useNavigate()

  return (
    <div className="grid grid-cols-4 gap-2 bg-bgNeutral rounded-2xl items-center p-2">
      <div className="ml-5 items-center col-span-2 flex">
        <BookSquare />
        <div className="ml-3">
          <p className="text-base font-bold">{course.title}</p>
        </div>
      </div>

      <div>
        <Progress
          type="circle"
          size={50}
          percent={Math.round(course.progress * 100)}
        />
      </div>
      <div className="mx-auto">
        <Button
          className="bg-green-500 text-white rounded-xl"
          onClick={() => navigate(`./my-hub/${course.id}`)}
        >
          {t('Continue')}
        </Button>
      </div>
    </div>
  )
}

export default ProgressCard
