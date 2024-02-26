import { useQuery } from '@tanstack/react-query'
import { Button } from 'antd'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ArrowLeft from '../../../components/Icons/ArrowLeft'
import ArrowRight from '../../../components/Icons/ArrowRight'
import AppLoading from '../../../components/common/AppLoading'
import coursesApi from '../../../services/coursesApi'
import CourseCard from '../CourseCard'

enum Direction {
  left = 'left',
  right = 'right',
}

const AttendedCourses = () => {
  const { t } = useTranslation()
  const [disabledScrollLeft, setDisabledScrollLeft] = useState<boolean>(true)
  const [disabledScrollRight, setDisabledScrollRight] = useState<boolean>(true)

  const { data: rawCourseExercise, isLoading } = useQuery({
    queryKey: ['coursesExercises'],
    queryFn: () => coursesApi.getCoursesExercises(),
  })

  useEffect(() => {
    initDisabledScrollRight()
  }, [rawCourseExercise?.data])

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

  if (isLoading) return <AppLoading />

  return (
    rawCourseExercise && (
      <div>
        <div className="my-6 flex justify-between align-middle">
          <p className="font-bold text-3xl text-primary">
            {t('MyHub.myCourses')}
          </p>
          <div className="flex gap-2">
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
          </div>
        </div>
        <div
          id="course-list"
          className="flex gap-6 overflow-x-scroll scrollbar-hide scroll-smooth snap-mandatory snap-x"
          onScroll={handleChangeScroll}
        >
          {rawCourseExercise.data.length > 0 ? (
            rawCourseExercise.data.map((course) => (
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
  )
}

export default AttendedCourses
