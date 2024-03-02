import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { CourseCard } from '../../../components/CourseCard'

type Props = {
  course: any
}

function PersonalizeCourses({ course }: Props) {
  const { t } = useTranslation()
  return (
    <div>
      {course && (
        <div className="">
          <p className="font-bold text-2xl lg:text-3xl text-primary mb-6">
            {t('Personalized Courses')}
          </p>
          <div className="grid grid-cols-fill-40 gap-x-6 gap-y-4">
            <CourseCard course={course} key={course.id} />
          </div>
        </div>
      )}
    </div>
  )
}

export default memo(
  PersonalizeCourses,
  (prev, next) => JSON.stringify(prev) === JSON.stringify(next),
)
