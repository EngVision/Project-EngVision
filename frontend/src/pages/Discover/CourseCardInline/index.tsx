import { Button } from 'antd'
import { StarIcon, VideoPlayIcon } from '../../../components/Icons'
import CustomImage from '../../../components/common/CustomImage'
import type { CourseDetails } from '../../../services/coursesApi/types'
import { LEVELS, UPLOAD_FILE_URL } from '../../../utils/constants'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
interface CourseCardProps {
  course: CourseDetails
}
export const CourseCardInLine = ({ course }: CourseCardProps) => {
  const navigate = useNavigate()
  return (
    <div className="bg-bgNeutral flex items-center gap-20 rounded-xl overflow-hidden transition-shadow hover:shadow-lg ">
      <div className="relative h-[14rem]">
        <CustomImage
          onClick={() => navigate(`./${course.id}`)}
          className="object-cover w-[21rem] h-full rounded-xl cursor-pointer"
          src={`${UPLOAD_FILE_URL}${course.thumbnail}`}
        />
        <div
          className={`${LEVELS.find((level) => level.level === course.level)
            ?.color} absolute left-3 top-3 text-white text-xs px-5 py-2 rounded-md`}
        >
          {course.level}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-xs w-[20rem]">
          <div className="flex items-center font-light">
            <VideoPlayIcon className="w-4 h-4 mr-2" />
            <p>{course.totalLessons} Lessons</p>
          </div>
          <div className="flex items-center">
            <p>{course.teacher.firstName + ' ' + course.teacher.lastName}</p>
          </div>
        </div>
        <Link to={`/discover/${course.id}`}>
          <span className="text-xl font-bold uppercase transition-colors duration-300 hover:text-primary">
            {course.title}
          </span>
        </Link>

        <div className="text-sm">{course.about}</div>
        <div className="flex justify-between items-center text-xs w-[20rem]">
          <div className="flex items-center gap-2">
            <StarIcon className="text-secondary" />
            <p className="font-semibold">{course.avgStar}</p>
          </div>
          <div>
            <span className="font-bold">{course.attendance}</span> Students
          </div>
        </div>

        <div className="flex justify-between items-center text-xs w-[40rem]">
          <div className="flex">
            <p className="font-semibold text-2xl text-primary">
              ${course.price}
            </p>
          </div>
          <Button onClick={() => navigate(`./${course.id}`)}>
            View Course
          </Button>
        </div>
      </div>
    </div>
  )
}
