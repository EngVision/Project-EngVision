import { Button, Card, Popover } from 'antd'
import { StarIcon, VideoPlayIcon } from '../Icons'
import { Link } from 'react-router-dom'
import { Level, STUDENT_ROUTES } from '../../utils/constants'

export const CourseCard = (course: any) => {
  const { Meta } = Card

  const popover = (
    <div className="flex flex-col items-start">
      <Button type="text">Statistics</Button>
      <Button href="./exam-edit" type="text">
        Edit
      </Button>
      <Button type="text">Remove</Button>
    </div>
  )

  return (
    <Link to={STUDENT_ROUTES.discover + '/' + course.course.id}>
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
          className={`${Level.find(
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
              {course.course.teacher.firstName +
                ' ' +
                course.course.teacher.lastName}
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
            <StarIcon className="text-[#FD6267]" />
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
            <Button type="text" className="absolute right-2"></Button>
          </Popover>
        </div>
      </Card>
    </Link>
  )
}
