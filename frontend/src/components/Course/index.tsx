import { Card } from 'antd'

import { getFormattedPrice } from '../../utils/common'
import {
  MoreIcon,
  PeopleIcon,
  PlayCircleIcon,
  StarIcon,
  VideoPlayIcon,
} from '../Icons'
import { useNavigate } from 'react-router-dom'

interface CourseProps {
  course: any
}

const Course = ({ course }: CourseProps) => {
  const navigate = useNavigate()

  return (
    <Card
      className="w-full"
      cover={
        <img
          alt="example"
          src={`${import.meta.env.VITE_SERVER_FILES_URL}${course.thumbnail}`}
          onClick={() => navigate(course.id)}
          role="presentation"
          className="cursor-pointer h-[200px]"
        />
      }
    >
      <p
        className={`absolute left-3 top-3 bg-primary text-white py-0.5 rounded-md min-w-[40px] text-center`}
      >
        {course.level}
      </p>

      <div className="flex justify-between text-xs">
        <div className="flex items-center">
          <VideoPlayIcon className="pr-1" />
          <p>10 Lessons</p>
        </div>

        <div className="flex items-center">
          <PlayCircleIcon className="pr-1" />
          <p>25 hr 3 min </p>
        </div>
      </div>

      <p className="text-sm font-bold uppercase py-4">{course.title}</p>

      <div className="flex justify-between items-center text-xs pt-3">
        <div className="flex items-center gap-1">
          <StarIcon className="text-blue-600" width={20} height={20} />
          <p className="font-semibold">{course.avgStar}</p>
        </div>

        <div className="flex items-center gap-1">
          <PeopleIcon width={20} height={20} />
          <p className="text-blue-700">400+</p>
          <p>Students</p>
        </div>
      </div>

      <div className="flex justify-between items-center mt-2">
        <span className="text-primary text-2xl font-semibold">
          {getFormattedPrice(course.price)}
        </span>

        <MoreIcon className="text-primary" />
      </div>
    </Card>
  )
}

export default Course
