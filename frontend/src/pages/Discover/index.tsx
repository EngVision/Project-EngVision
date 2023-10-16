import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { CourseCard } from '../../components/CourseCard'
import coursesApi from '../../services/coursesApi'
import type { CourseParams } from '../../services/coursesApi/types'
import { COURSE_STATUS } from '../../utils/constants'
const Discover = () => {
  const { t } = useTranslation()
  const [courseList, setCourseList] = useState<CourseParams[]>([])
  const status: any = { status: COURSE_STATUS.all }
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const courses: any = await coursesApi.getCourses(status)
        setCourseList(courses.data)
      } catch (error) {
        console.error('Error fetching courses:', error)
      }
    }

    fetchCourses()
  }, [])

  return (
    <div>
      <div className="m-6">
        <p className="font-bold text-3xl text-primary">
          {t('Discover.discover')}
        </p>
      </div>
      <div className="m-6">
        <div className="grid grid-flow-col grid-cols-4 gap-11">
          {courseList &&
            courseList.map((course) => <CourseCard course={course} />)}
        </div>
      </div>
    </div>
  )
}

export default Discover
