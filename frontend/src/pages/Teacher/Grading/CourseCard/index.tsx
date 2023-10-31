import { Card } from 'antd'

import { NoteIcon, PeopleIcon } from '../../../../components/Icons'
import { useNavigate } from 'react-router-dom'
import { LEVELS } from '../../../../utils/constants'
import CustomImage from '../../../../components/common/CustomImage'
// import { CourseExercisesDue } from '../../../../services/coursesApi/types'

// interface CourseProps {
//   course: CourseExercisesDue
// }

const CourseCard = () => {
  const navigate = useNavigate()
  const level = LEVELS.find((l) => l.level === 'A1')

  return (
    <Card
      className="min-w-[19rem] max-w-[21rem] shadow-lg snap-center cursor-pointer"
      // onClick={() => navigate(`./course/${course?.id}`)}
      onClick={() => navigate(`./course/1`)}
      cover={
        <CustomImage
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          //   src={`${import.meta.env.VITE_SERVER_FILES_URL}${course?.thumbnail}`}
          className="h-[200px]"
        />
      }
    >
      <p
        className={`${level?.color} absolute left-3 top-3 text-white py-0.5 rounded-md min-w-[40px] text-center`}
      >
        {/* {course?.level} */}A1
      </p>

      <div className="flex justify-between text-xs">
        <div className="flex items-center">
          <PeopleIcon width={20} height={20} className="pr-1" />
          <p>
            {/* {course.attendance} */}
            1425 student
          </p>
        </div>

        <div className="flex items-center">
          <NoteIcon className="pr-1" />
          <p>{/* {course.totalLessons} */}4 assignments</p>
        </div>
      </div>

      <p className="text-sm font-bold uppercase py-4">
        {/* {course.title} */}IELTS Exam Strategies and Practice
      </p>

      <p className="text-alternative">
        {/* {course.ongoingExercises}  */}
        123 assignments submitted
      </p>
      <p className="text-secondary">
        {/* {course.dueExercises} */}
        47 assignments are pending
      </p>
    </Card>
  )
}

export default CourseCard
