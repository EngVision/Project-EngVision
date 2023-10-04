import { Card } from 'antd'

import { getFormattedPrice } from '../../utils/common'
import {
  MoreIcon,
  PeopleIcon,
  PlayCircleIcon,
  StarIcon,
  VideoPlayIcon,
} from '../Icons'

interface CourseProps {
  course: any
}

const Course = ({ course }: CourseProps) => {
  return (
    <Card
      className="w-[100%]"
      cover={
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
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
