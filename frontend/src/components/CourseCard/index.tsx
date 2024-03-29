import { Card, Tooltip } from 'antd'
import { StarIcon, VideoPlayIcon } from '../Icons'
import { Link } from 'react-router-dom'
import { LEVELS, UPLOAD_FILE_URL } from '../../utils/constants'
import CustomImage from '../common/CustomImage'
import { useTranslation } from 'react-i18next'
import type { CourseDetails } from '../../services/coursesApi/types'
import { formatCurrency } from '../../utils/currency'
interface CourseCardProps {
  course: CourseDetails
}
export const CourseCard = ({ course }: CourseCardProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'common' })
  const { Meta } = Card

  return (
    <Link to={course.id}>
      <Card
        bodyStyle={{ padding: '1rem' }}
        className="bg-surface"
        hoverable
        cover={
          <CustomImage
            className="object-cover w-full h-[9rem]"
            src={`${UPLOAD_FILE_URL}${course.thumbnail}`}
          />
        }
      >
        <div
          className={`${LEVELS.find((level) => level.level === course.level)
            ?.color} absolute left-3 top-3 text-white text-xs px-5 py-2 rounded-md`}
        >
          {course.level}
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between text-xs">
            <div className="flex items-center font-light">
              <VideoPlayIcon className="w-4 h-4 mr-2" />
              <p>
                {course.totalLessons} {t('Lessons')}
              </p>
            </div>
            <div className="flex items-center">
              <p>{course.teacher.fullName}</p>
            </div>
          </div>
          <Meta
            title={
              <Tooltip title={course.title}>
                <span className="text-base font-bold uppercase hover:text-primary transition-all">
                  {course.title}
                </span>
              </Tooltip>
            }
          />
          <div className="flex justify-between items-center text-xs ">
            <div className="flex items-center gap-2">
              <StarIcon className="text-secondary" />
              <p className="font-semibold">{course.avgStar || 0}</p>
            </div>
            <div>
              <span className="font-bold">{course.attendance}</span>{' '}
              {t('Students')}
            </div>
          </div>

          <div className="flex justify-between items-center text-xs">
            <div className="flex">
              <p className="font-semibold text-2xl text-primary">
                {formatCurrency(course.price)}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}
