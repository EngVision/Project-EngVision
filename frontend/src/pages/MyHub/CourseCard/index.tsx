import { Card, Progress } from 'antd'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { PeopleIcon, VideoPlayIcon } from '../../../components/Icons'
import CustomImage from '../../../components/common/CustomImage'
import { CourseDetails } from '../../../services/coursesApi/types'
import { LEVELS, UPLOAD_FILE_URL } from '../../../utils/constants'
interface CourseProps {
  course: CourseDetails
}

const CourseCard = ({ course }: CourseProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'common' })
  const navigate = useNavigate()
  const level = LEVELS.find((l) => l.level === course.level)

  return (
    <Card
      className="min-w-[300px] max-w-[330px] shadow-lg snap-center cursor-pointer"
      onClick={() => navigate(`./${course.id}`)}
      cover={
        <CustomImage
          src={`${UPLOAD_FILE_URL}${course.thumbnail}`}
          className="h-[200px]"
        />
      }
      hoverable
    >
      <p
        className={`${level?.color} absolute left-3 top-3 text-white py-0.5 rounded-md min-w-[40px] text-center`}
      >
        {course.level}
      </p>
      <p className="text-sm font-bold uppercase pb-4">{course.title}</p>

      <div className="flex items-center gap-3">
        <img
          src={`${UPLOAD_FILE_URL}${course.teacher.avatar}`}
          alt="avatar"
          className="w-6 h-6 rounded-xl"
        />
        <p className="font-semibold">
          {course.teacher?.firstName ?? '' + ' ' + course.teacher?.lastName}
        </p>
      </div>

      <div className="flex justify-between text-xs my-3">
        <div className="flex items-center">
          <PeopleIcon width={20} height={20} className="pr-1" />
          <p>
            {course.attendance} {t('students')}
          </p>
        </div>

        <div className="flex items-center">
          <VideoPlayIcon className="pr-1" />
          <p>
            {course.totalLessons} {t('lessons')}
          </p>
        </div>
      </div>

      <Progress percent={Math.round(course.progress * 100)} />
    </Card>
  )
}

export default CourseCard
