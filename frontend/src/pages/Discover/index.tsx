import { AppstoreOutlined, MenuOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Button, Input, Pagination, Tooltip } from 'antd'
import { useState } from 'react'
import { CourseCard } from '../../components/CourseCard'
import AppLoading from '../../components/common/AppLoading'
import coursesApi from '../../services/coursesApi'
import { GetCourseProps } from '../../services/coursesApi/types'
import { COURSE_STATUS } from '../../utils/constants'
import { CourseCardInLine } from './CourseCardInline'
import SortDropDown from './SortDropDown'
import { useAppSelector } from '../../hooks/redux'
const { Search } = Input

const Discover = () => {
  const [sortBy, setSortBy] = useState<string>('createdAt')
  const [isGrid, setIsGrid] = useState<boolean>(true)
  const [keyword, setKeyword] = useState<string>('')
  const [page, setPage] = useState<number>(1)
  const [status, setStatus] = useState<COURSE_STATUS>(COURSE_STATUS.all)

  const currentLevel = useAppSelector((state) => state.app.currentLevel)

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
      default:
        setSortBy('createdAt')
        break
    }
  }
  const getNewCoursesParams: GetCourseProps = {
    status: COURSE_STATUS.all,
    sortBy: 'createdAt',
    limit: 5,
    page: 1,
  }
  const getAllCoursesParams: GetCourseProps = {
    status: status,
    sortBy: sortBy,
    keyword: keyword,
    limit: 8,
    page: page - 1,
  }
  const getFreeCoursesParams: GetCourseProps = {
    status: COURSE_STATUS.all,
    priceMin: 0,
    priceMax: 1,
  }
  const { data: rawSuggestedList } = useQuery({
    queryKey: ['suggestedCourses', { levels: currentLevel }],
    queryFn: () =>
      coursesApi.getCourses({ status, levels: currentLevel?.CEFRLevel }),
  })
  const { data: rawNewCourseList, isLoading } = useQuery({
    queryKey: ['courses', getNewCoursesParams],
    queryFn: () => coursesApi.getCourses(getNewCoursesParams),
  })
  const { data: rawAllCourseList } = useQuery({
    queryKey: ['courses', getAllCoursesParams],
    queryFn: () => coursesApi.getCourses(getAllCoursesParams),
  })
  const { data: rawFreeCourseList } = useQuery({
    queryKey: ['courses', getFreeCoursesParams],
    queryFn: () => coursesApi.getCourses(getFreeCoursesParams),
  })
  return (
    <>
      {isLoading ? (
        <AppLoading />
      ) : (
        <>
          <div className="flex flex-col gap-12 mx-10">
            {/* {Array.isArray(rawSuggestedList?.data) &&
              rawSuggestedList?.data.length &&
              rawSuggestedList?.data.length > 0 && (
                <div className="">
                  <p className="font-bold text-2xl text-primary mb-6">
                    Featured Course
                  </p>

                  <FeaturedCourse course={rawSuggestedList.data[0]} />
                  <div className="grid grid-cols-fill-40 gap-x-8 gap-y-6">
                    {rawSuggestedList.data.map((course) => (
                      <CourseCard course={course} key={course.id} />
                    ))}
                  </div>
                </div>
              )} */}
            {rawSuggestedList && (
              <div className="m-6">
                <p className="font-bold text-3xl text-primary mb-6">
                  Recommended
                </p>
                <div className="grid grid-cols-fill-40 gap-x-8 gap-y-6">
                  {rawSuggestedList?.data.length ? (
                    rawSuggestedList?.data.map((course) => (
                      <CourseCard course={course} key={course.id} />
                    ))
                  ) : (
                    <div className="col-span-4 text-center italic text-textSubtle">
                      <p className="text-lg">No courses found</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {rawAllCourseList && (
              <div className="">
                <div className="flex justify-between items-center">
                  <p className="font-bold text-3xl text-primary mb-6">
                    New Courses
                  </p>
                </div>

                <div className="grid grid-cols-fill-40 gap-x-8 gap-y-6">
                  {rawNewCourseList?.data.length ? (
                    rawNewCourseList.data.map((course) => (
                      <CourseCard course={course} key={course.id} />
                    ))
                  ) : (
                    <div className="col-span-4 text-center italic text-textSubtle">
                      <p className="text-lg">No courses found</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="">
              <div className="flex justify-between">
                <div className="font-bold text-3xl text-primary mb-10">
                  All Courses
                </div>
                <div className="flex gap-4">
                  <Search
                    className="rounded-md"
                    placeholder="Search course..."
                    allowClear
                    enterButton
                    size="middle"
                    onSearch={onSearch}
                  />
                  <SortDropDown onSort={handleSort} />
                  <div className="flex gap-2">
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
              {isGrid ? (
                <div className="grid grid-cols-fill-40 gap-x-8 gap-y-6">
                  {rawAllCourseList?.data.length ? (
                    rawAllCourseList.data.map((course) => (
                      <CourseCard course={course} key={course.id} />
                    ))
                  ) : (
                    <div className="col-span-4 text-center italic text-textSubtle">
                      <p className="text-lg">No courses found</p>
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
                      <p className="text-lg">No courses found</p>
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
              {rawFreeCourseList?.data &&
                rawFreeCourseList?.data.length &&
                rawFreeCourseList?.data.length > 0 && (
                  <div>
                    <div className="font-bold text-3xl text-primary mb-10">
                      Free Courses
                    </div>
                    <div className="grid grid-cols-fill-40 gap-x-8 gap-y-6">
                      {rawFreeCourseList?.data.length ? (
                        rawFreeCourseList.data.map((course) => (
                          <CourseCard course={course} key={course.id} />
                        ))
                      ) : (
                        <div className="col-span-4 text-center italic text-textSubtle">
                          <p className="text-lg">No courses found</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Discover
