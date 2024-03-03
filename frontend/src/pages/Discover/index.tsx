import { AppstoreOutlined, MenuOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Button, Input, Pagination, Spin, Tooltip } from 'antd'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CourseCard } from '../../components/CourseCard'
import coursesApi from '../../services/coursesApi'
import { GetCourseProps } from '../../services/coursesApi/types'
import { COURSE_STATUS } from '../../utils/constants'
import { CourseCardInLine } from './CourseCardInline'
import SortDropDown from './SortDropDown'
import PersonalizeCourses from './PersonalizeCourses'
import { Order } from '../../services/types'
const { Search } = Input

const Discover = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'Discover' })
  const [sortBy, setSortBy] = useState<string>('createdAt')
  const [isGrid, setIsGrid] = useState<boolean>(true)
  const [keyword, setKeyword] = useState<string>('')
  const [page, setPage] = useState<number>(1)
  const [status, setStatus] = useState<COURSE_STATUS>(COURSE_STATUS.all)
  const [order, setOrder] = useState(Order.desc)

  const onSearch = (value: string) => {
    setKeyword(value)
    setPage(1)
  }

  const handleSort = (value: number) => {
    switch (value) {
      case 1:
        setSortBy('createdAt')
        setStatus(COURSE_STATUS.all)
        break
      case 2:
        setStatus(COURSE_STATUS.attended)
        break
      case 3:
        setSortBy('price')
        setStatus(COURSE_STATUS.all)
        setOrder(Order.asc)
        break
      case 4:
        setSortBy('price')
        setStatus(COURSE_STATUS.all)
        setOrder(Order.desc)
        break
      case 5:
        setSortBy('star')
        setStatus(COURSE_STATUS.all)
        setOrder(Order.asc)
        break
      case 6:
        setSortBy('star')
        setStatus(COURSE_STATUS.all)
        setOrder(Order.desc)
        break
      default:
        setSortBy('createdAt')
        break
    }
  }

  const getAllCoursesParams: GetCourseProps = {
    status: status,
    sortBy: sortBy,
    order: order,
    keyword: keyword,
    limit: 10,
    page: page - 1,
  }

  const { data: personalizedCourse } = useQuery({
    queryKey: ['personalizedCourse'],
    queryFn: () => coursesApi.getPersonalizedCourse(),
  })

  const { data: rawAllCourseList, isLoading } = useQuery({
    queryKey: ['courses', getAllCoursesParams],
    queryFn: () => coursesApi.getCourses(getAllCoursesParams),
  })
  console.log('🚀 ~ Discover ~ rawAllCourseList:', rawAllCourseList)
  return (
    <>
      <>
        <div className="flex flex-col gap-12 mx-6 lg:mx-10">
          <PersonalizeCourses course={personalizedCourse} />

          <div className="min-h-[800px]">
            <div className="flex justify-between flex-col gap-4 lg:flex-row mb-10">
              <div className="font-bold text-2xl lg:text-3xl text-primary">
                {t('All Courses')}
              </div>
              <div className="flex gap-4 flex-col lg:flex-row">
                <Search
                  className="rounded-md"
                  placeholder={t('Search course...')}
                  allowClear
                  enterButton
                  size="middle"
                  onSearch={onSearch}
                />

                <div className="flex justify-between gap-4">
                  <SortDropDown onSort={handleSort} />
                  <div className="hidden lg:flex gap-2">
                    <Tooltip title="Grid View">
                      <Button
                        shape="circle"
                        disabled={isGrid}
                        onClick={() => setIsGrid(true)}
                        icon={<AppstoreOutlined />}
                      />
                    </Tooltip>
                    <Tooltip title="List View">
                      <Button
                        shape="circle"
                        disabled={!isGrid}
                        onClick={() => setIsGrid(false)}
                        icon={<MenuOutlined />}
                      />
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>
            {isLoading ? (
              <div className="flex w-full justify-center">
                <Spin size="large" />
              </div>
            ) : isGrid ? (
              <div className="grid grid-cols-fill-40 gap-x-6 gap-y-4">
                {rawAllCourseList?.data.length ? (
                  rawAllCourseList.data.map((course) => (
                    <CourseCard course={course} key={course.id} />
                  ))
                ) : (
                  <div className="col-span-4 text-center italic text-textSubtle">
                    <p className="text-lg">{t('No courses found')}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full flex flex-col gap-8">
                {rawAllCourseList?.data.length ? (
                  rawAllCourseList.data.map((course) => (
                    <CourseCardInLine course={course} key={course.id} />
                  ))
                ) : (
                  <div className="col-span-4 text-center italic text-textSubtle">
                    <p className="text-lg">{t('No courses found')}</p>
                  </div>
                )}
              </div>
            )}
            <Pagination
              className="flex justify-end mt-4"
              defaultCurrent={1}
              current={page}
              onChange={(page) => setPage(page)}
              total={rawAllCourseList?.total}
            />
          </div>
        </div>
      </>
    </>
  )
}

export default Discover
