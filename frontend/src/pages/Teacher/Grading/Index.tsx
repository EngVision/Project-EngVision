import { Button, Space } from 'antd'
import { useEffect, useState } from 'react'
import ArrowLeft from '../../../components/Icons/ArrowLeft'
import ArrowRight from '../../../components/Icons/ArrowRight'
import CourseCard from './CourseCard'
import ExamTable from './ExamTable'
enum Direction {
  left = 'left',
  right = 'right',
}
const Grading = () => {
  const [disabledScrollLeft, setDisabledScrollLeft] = useState<boolean>(true)
  const [disabledScrollRight, setDisabledScrollRight] = useState<boolean>(true)
  useEffect(() => {
    initDisabledScrollRight()
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
      <div className="mb-8">
        <h3 className="text-primary text-2xl">Grading Course</h3>
        <div className="flex justify-between align-middle">
          <p className="font-bold text-3xl text-primary">
            {/* {t('Exercises.exercises')} */}
          </p>
          <Space>
            <Button
              type="primary"
              shape="circle"
              size="middle"
              ghost
              onClick={() => scroll(Direction.left)}
              disabled={disabledScrollLeft}
              icon={<ArrowLeft width={20} height={20} />}
            ></Button>
            <Button
              type="primary"
              shape="circle"
              size="middle"
              ghost
              onClick={() => scroll(Direction.right)}
              disabled={disabledScrollRight}
              icon={<ArrowRight width={20} height={20} />}
            ></Button>
          </Space>
        </div>
        <div
          id="course-list"
          className="flex gap-10 overflow-x-scroll scrollbar-hide scroll-smooth snap-mandatory snap-x"
          onScroll={handleChangeScroll}
        >
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
        </div>
      </div>
      <div>
        <h3 className="text-primary text-2xl mb-4">Grading Exam</h3>
        <ExamTable />
      </div>
    </div>
  )
}

export default Grading
