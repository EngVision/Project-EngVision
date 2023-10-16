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
        hoverable
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
      >
        <div
          className={`${Level.find(
            (level) => level.level === course.course.level,
          )
            ?.color} absolute left-3 top-3 text-white text-xs px-5 py-2 rounded-md`}
        >
          {course.course.level}
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between text-xs">
            <div className="flex items-center font-light">
              <VideoPlayIcon className="w-4 h-4 mr-2" />
              <p>{course.course.totalLessons} Lessons</p>
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
          />
          <div className="flex justify-between items-center text-xs ">
            <div className="flex items-center gap-2">
              <StarIcon className="text-secondary" />
              <p className="font-semibold">{course.course.avgStar}</p>
            </div>
            <div>
              <span className="font-bold">{course.course.attendance}</span>{' '}
              Students
            </div>
          </div>

          <div className="flex justify-between items-center text-xs">
            <div className="flex">
              <p className="font-semibold text-3xl text-primary">
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
        </div>
      </Card>
    </Link>
  )
}
