import { faNoteSticky } from '@fortawesome/free-regular-svg-icons'
import {
  faChartSimple,
  faEllipsis,
  faEraser,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Card, Popover } from 'antd'
import { StarIcon, VideoPlayIcon } from '../Icons'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../utils/constants'

export const CourseCard = (course: any) => {
  const { Meta } = Card

  const levels = [
    { level: 'A1', color: 'bg-green-300' },
    { level: 'A2', color: 'bg-green-500' },
    { level: 'B1', color: 'bg-blue-300' },
    { level: 'B2', color: 'bg-blue-500' },
    { level: 'C1', color: 'bg-red-300' },
    { level: 'C2', color: 'bg-red-500' },
  ]

  const popover = (
    <div className="flex flex-col items-start">
      <Button type="text">
        <FontAwesomeIcon className="mr-1" icon={faChartSimple} />
        Statistics
      </Button>
      <Button href="./exam-edit" type="text">
        <FontAwesomeIcon className="mr-1" icon={faNoteSticky} />
        Edit
      </Button>
      <Button type="text">
        <FontAwesomeIcon className="mr-1" icon={faEraser} />
        Remove
      </Button>
    </div>
  )

  return (
    <Link to={ROUTES.discover + '/' + course.course.id}>
      <Card
        className="w-[100%]"
        hoverable
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
      >
        <p
          className={`${levels.find(
            (level) => level.level === course.course.level,
          )?.color} absolute left-2 top-2 text-white px-2 py-0.5 rounded-md`}
        >
          {course.course.level}
        </p>
        <div className="flex justify-between text-xs">
          <div className="flex items-center">
            <VideoPlayIcon className="pr-1" />
            <p>{course.course.totalLessons}</p>
          </div>
          <div className="flex items-center">
            <p>
              {course.course.teacher[0].firstName +
                ' ' +
                course.course.teacher[0].lastName}
            </p>
          </div>
        </div>
        <Meta
          title={
            <span className="text-xl font-bold uppercase">
              {course.course.title}
            </span>
          }
          className="py-3"
        />
        <div className="flex justify-between items-center text-xs pb-2">
          <div className="flex items-center">
            <StarIcon className="text-yellow-400" />
            <p className="font-semibold pl-1">{course.course.avgStar}</p>
          </div>
          <div className="flex">
            <p className="text-blue-700 pr-1">{course.course.attendance}</p>
            <p>Students</p>
          </div>
        </div>

        <div className="flex justify-between items-center text-xs pt-1">
          <div className="flex">
            <p className="font-semibold text-3xl text-blue-600">
              ${course.course.price}
            </p>
          </div>
          <Popover
            content={popover}
            trigger="click"
            className="text-blue-600 hover:text-slate-400"
          >
            <Button type="text" className="absolute right-2">
              <FontAwesomeIcon icon={faEllipsis} />
            </Button>
          </Popover>
        </div>
      </Card>
    </Link>
  )
}
