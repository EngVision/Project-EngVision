import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { CourseCard } from '../../components/CourseCard'
import coursesApi from '../../services/coursesApi'
import type { CourseParams } from '../../services/coursesApi/types'

const Discover = () => {
  const { t } = useTranslation()
  const [courseList, setCourseList] = useState<CourseParams[]>([])

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const courses: any = await coursesApi.getCourses('All')
        setCourseList(courses.data)
      } catch (error) {
        console.error('Error fetching courses:', error)
      }
    }

    fetchCourses()
  }, [])

  return (
    <>
      <div>
        <div className="m-6 mt-0">
          <p className="font-bold text-3xl text-blue-600">
            {t('Discover.discover')}
          </p>
        </div>
        <div className="m-6">
          <div
            style={{
              background: 'rgba(0,255,0,0.02)',
            }}
            className="grid gap-4 grid-cols-4"
          >
            {courseList &&
              courseList.map((course) => <CourseCard course={course} />)}
          </div>
          <div
            id="active"
            style={{
              background: 'rgba(0,0,255,0.02)',
            }}
          />
          <div
            id="completed"
            style={{
              background: '#FFFBE9',
            }}
          />
        </div>
      </div>
    </>
  )
}

export default Discover
