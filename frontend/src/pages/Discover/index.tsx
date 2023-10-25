import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { CourseCard } from '../../components/CourseCard'
import coursesApi from '../../services/coursesApi'
import { COURSE_STATUS } from '../../utils/constants'
import AppLoading from '../../components/common/AppLoading'

const Discover = () => {
  const { t } = useTranslation()
  const status: any = { status: COURSE_STATUS.all }

  const { data: rawCourseList, isLoading } = useQuery({
    queryKey: ['courses', status],
    queryFn: () => coursesApi.getCourses(status),
  })

  if (isLoading) return <AppLoading />

  return (
    <div>
      <div className="m-6">
        <p className="font-bold text-3xl text-primary">
          {t('Discover.discover')}
        </p>
      </div>
      <div className="m-6">
        <div className="grid grid-cols-fill-40 gap-x-8 gap-y-6">
          {rawCourseList &&
            rawCourseList.data.map((course) => (
              <CourseCard course={course} key={course.id} />
            ))}
        </div>
      </div>
    </div>
  )
}

export default Discover
