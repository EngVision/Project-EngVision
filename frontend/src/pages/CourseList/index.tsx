import { Anchor } from 'antd'
import { useTranslation } from 'react-i18next'
import { CourseCard } from '../../compoments/CourseCard'
import coursesApi from '../../services/coursesApi'
import { CourseParams } from '../../services/coursesApi/types'
import { useEffect, useState } from 'react'

export const CourseList = () => {
  const { t } = useTranslation()
  const [courseList, setCourseList] = useState<CourseParams[]>([])

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const courses = await coursesApi.getCourses()
        setCourseList(courses)
      } catch (error) {
        console.error('Error fetching courses:', error)
      }
    }

    fetchCourses()
  }, [])

  return (
    <>
      <div className="m-12">
        <div className="m-6">
          <p className="font-bold text-2xl mb-5">{t('CourseList.course')}</p>
          <Anchor
            direction="horizontal"
            items={[
              {
                key: 'all',
                href: '#all',
                title: <span className="text-base mx-2">All</span>,
              },
              {
                key: 'active',
                href: '#active',
                title: <span className="text-base mx-2">Active</span>,
              },
              {
                key: 'completed',
                href: '#completed',
                title: <span className="text-base mx-2">Completed</span>,
              },
            ]}
          />
        </div>
        <div className="m-6">
          <div
            id="all"
            style={{
              background: 'rgba(0,255,0,0.02)',
            }}
            className="grid gap-4 grid-cols-4"
          >
            {courseList.map((course) => (
              <CourseCard course={course} />
            ))}
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
