import { faClock, faStar } from '@fortawesome/free-regular-svg-icons'
import { faClapperboard } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar, Card } from 'antd'

export const CourseCard = (course: any) => {
  const { Meta } = Card

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
      <p className="absolute left-0 top-0 bg-blue-500 text-white px-2 py-0.5 rounded-md">
        {course.course.level}
      </p>
      <div className="flex justify-between text-xs">
        <div className="flex items-center">
          <FontAwesomeIcon icon={faClapperboard} className="pr-1" />
          <p>10 Lessons</p>
        </div>
        <div className="flex items-center">
          <FontAwesomeIcon icon={faClock} className="pr-1" />
          <p>25 hr 3 min </p>
        </div>
      </div>
      <Meta
        title={
          <span className="text-sm font-bold uppercase">
            {course.course.title}
          </span>
        }
        className="py-3"
      />
      <Meta
        avatar={
          <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
        }
        title={
          <span className="text-sm font-normal">{course.course.teacher}</span>
        }
      />
      <div className="flex justify-between items-center text-xs pt-3">
        <div className="flex ">
          <FontAwesomeIcon icon={faStar} className="text-blue-600" />
          <p className="font-semibold pl-1">{course.course.avgStar}</p>
        </div>
        <div className="flex">
          <p className="text-blue-700 pr-1">400+</p>
          <p>Students</p>
        </div>
      </div>
    </Card>
  )
}
