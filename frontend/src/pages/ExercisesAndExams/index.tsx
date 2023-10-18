import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import coursesApi from '../../services/coursesApi'
import type { CourseDetails } from '../../services/coursesApi/types'
import { COURSE_STATUS } from '../../utils/constants'
import CourseCard from './CourseCard'
import { Button, Space } from 'antd'
import ArrowLeft from '../../components/Icons/ArrowLeft'
import ArrowRight from '../../components/Icons/ArrowRight'

enum Direction {
  left = 'left',
  right = 'right',
}

const ExercisesAndExams = () => {
  const { t } = useTranslation()
  const [courseList, setCourseList] = useState<CourseDetails[]>([])
  const [disabledScrollLeft, setDisabledScrollLeft] = useState<boolean>(true)
  const [disabledScrollRight, setDisabledScrollRight] = useState<boolean>(false)
  const status = { status: COURSE_STATUS.all }

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
    setTimeout(() => {
      initDisabledScrollRight()
    })
  }, [])

  const initDisabledScrollRight = () => {
    const containerElement: HTMLElement | null =
      document.getElementById('course-list')
    if (!containerElement) return
    return setDisabledScrollRight(
      containerElement.scrollWidth === containerElement.offsetWidth,
    )
  }

  const scroll = (direction: Direction) => {
    const containerElement: HTMLElement | null =
      document.getElementById('course-list')

    if (containerElement) {
      if (direction === Direction.left) {
        containerElement.scrollLeft -= containerElement.offsetWidth
      } else {
        containerElement.scrollLeft += containerElement.offsetWidth
      }
    }
  }

  const handleChangeScroll = () => {
    const containerElement: HTMLElement | null =
      document.getElementById('course-list')
    if (!containerElement) return

    if (containerElement?.scrollLeft === 0) {
      setDisabledScrollLeft(true)
    } else setDisabledScrollLeft(false)

    if (
      containerElement?.scrollWidth -
        (containerElement?.offsetWidth + containerElement?.scrollLeft) <
      2
    ) {
      setDisabledScrollRight(true)
    } else setDisabledScrollRight(false)
  }

  return (
    <div>
      <div className="my-6 flex justify-between align-middle">
        <p className="font-bold text-3xl text-primary">
          {t('Exercises.exercises')}
        </p>
        <Space>
          <Button
            type="primary"
            shape="circle"
            size="large"
            ghost
            icon={<ArrowLeft />}
            onClick={() => scroll(Direction.left)}
            disabled={disabledScrollLeft}
          ></Button>
          <Button
            type="primary"
            shape="circle"
            size="large"
            ghost
            icon={<ArrowRight />}
            onClick={() => scroll(Direction.right)}
            disabled={disabledScrollRight}
          ></Button>
        </Space>
      </div>
      <div
        id="course-list"
        className="flex gap-10 overflow-x-scroll scrollbar-hide scroll-smooth snap-mandatory snap-x"
        onScroll={handleChangeScroll}
      >
        {courseList.length > 0 ? (
          courseList.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))
        ) : (
          <div className="col-span-4 text-center italic text-textSubtle">
            <p className="text-lg">No courses found</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ExercisesAndExams
