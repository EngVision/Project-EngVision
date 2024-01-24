import { Button, Progress } from 'antd'
import { useNavigate } from 'react-router-dom'
import BookSquare from '../../../components/Icons/BookSquare'

const ProgressCard = (course: any) => {
  const navigate = useNavigate()
  const progress = course.course.progress.toFixed(2) * 100

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
        <Progress type="circle" size={50} percent={progress} />
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
