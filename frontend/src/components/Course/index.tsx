import { Card } from 'antd'

import { getFormattedPrice } from '../../utils/common'
import { MoreIcon, PeopleIcon, StarIcon, VideoPlayIcon } from '../Icons'
import { useNavigate } from 'react-router-dom'
import { CourseDetails } from '../../services/coursesApi/types'
import CustomImage from '../common/CustomImage'
import { LEVELS, UPLOAD_FILE_URL } from '../../utils/constants'

interface CourseProps {
  course: CourseDetails
}

const Course = ({ course }: CourseProps) => {
  const navigate = useNavigate()
  const level = LEVELS.find((l) => l.level === course.level)

  return (
    <Card
      className="w-full"
      cover={
        <CustomImage
          src={`${UPLOAD_FILE_URL}${course.thumbnail}`}
          onClick={() => navigate(course.id)}
          className="cursor-pointer h-[200px]"
        />
      }
    >
      <p
        className={`${level?.color} absolute left-3 top-3 text-white py-0.5 rounded-md min-w-[40px] text-center`}
      >
        {course.level}
      </p>

      <div className="flex justify-between text-xs">
        <div className="flex items-center">
          <VideoPlayIcon className="pr-1" />
          <p>{course.totalLessons} Lessons</p>
        </div>
      </div>

      <p className="text-sm font-bold uppercase py-4">{course.title}</p>

      <div className="flex justify-between items-center text-xs pt-3">
        <div className="flex items-center gap-1">
          <StarIcon className="text-negative-200" width={20} height={20} />
          <p className="font-semibold">{course.avgStar || '0'}</p>
        </div>

        <div className="flex items-center gap-1">
          <PeopleIcon width={20} height={20} />
          <p className="text-blue-700">{course.attendance}+</p>
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
