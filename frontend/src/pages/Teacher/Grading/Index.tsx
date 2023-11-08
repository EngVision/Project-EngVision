import { Button, Space } from 'antd'
import { useEffect, useState } from 'react'
import ArrowLeft from '../../../components/Icons/ArrowLeft'
import ArrowRight from '../../../components/Icons/ArrowRight'
import CourseCard from './CourseCard'
import ExamTable from './ExamTable'
import { useQuery } from '@tanstack/react-query'
import coursesApi from '../../../services/coursesApi'
import { examApi } from '../../../services/examApi'
import { useAppSelector } from '../../../hooks/redux'
import AppLoading from '../../../components/common/AppLoading'
enum Direction {
  left = 'left',
  right = 'right',
}
const Grading = () => {
  const status = useAppSelector((state) => state.course.status)
  const sortOption = useAppSelector((state) => state.course.sortOption)
  const filterOptions = useAppSelector((state) => state.course.filterOptions)
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
  const { data: rawCourseList, isLoading } = useQuery({
    queryKey: ['courses', { status, ...filterOptions, ...sortOption }],
    queryFn: async () =>
      coursesApi.getCourses({ status, ...filterOptions, ...sortOption }),
  })
  const { data: rawExamList } = useQuery({
    queryKey: ['exam'],
    queryFn: async () => examApi.getExam(),
  })
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
        {isLoading ? (
          <AppLoading />
        ) : (
          <div
            id="course-list"
            className="flex gap-10 overflow-x-scroll scrollbar-hide scroll-smooth snap-mandatory snap-x"
            onScroll={handleChangeScroll}
          >
            {rawCourseList?.data && rawCourseList.data.length > 0 ? (
              rawCourseList.data.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))
            ) : (
              <div className="col-span-4 text-center italic text-textSubtle">
                <p className="text-lg">No courses found</p>
              </div>
            )}
          </div>
        )}
      </div>
      <div>
        <h3 className="text-primary text-2xl mb-4">Grading Exam</h3>
        {rawExamList?.data && rawExamList.data.length > 0 ? (
          <ExamTable exams={rawExamList.data} />
        ) : (
          <div className="col-span-4 text-center italic text-textSubtle">
            <p className="text-lg">No exam found</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Grading
