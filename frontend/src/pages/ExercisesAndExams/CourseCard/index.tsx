import { Card } from 'antd'

import { NoteIcon, PeopleIcon } from '../../../components/Icons'
import { useNavigate } from 'react-router-dom'
import { LEVELS } from '../../../utils/constants'
import CustomImage from '../../../components/common/CustomImage'
import { CourseExercisesDue } from '../../../services/coursesApi/types'

interface CourseProps {
  course: CourseExercisesDue
}

const CourseCard = ({ course }: CourseProps) => {
  const navigate = useNavigate()
  const level = LEVELS.find((l) => l.level === course.level)

  return (
    <Card
      className="min-w-[300px] max-w-[330px] shadow-lg snap-center cursor-pointer"
      onClick={() => navigate(`../discover/${course.id}`)}
      cover={
        <CustomImage
          src={`${import.meta.env.VITE_SERVER_FILES_URL}${course.thumbnail}`}
          className="h-[200px]"
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
          <PeopleIcon width={20} height={20} className="pr-1" />
          <p>{course.attendance} student</p>
        </div>

        <div className="flex items-center">
          <NoteIcon className="pr-1" />
          <p>{course.totalLessons} assignments</p>
        </div>
      </div>

      <p className="text-sm font-bold uppercase py-4">{course.title}</p>

      <p className="text-alternative">
        {course.ongoingExercises} assignment due in one week
      </p>
      <p className="text-secondary">{course.dueExercises} due</p>
    </Card>
  )
}

export default CourseCard
