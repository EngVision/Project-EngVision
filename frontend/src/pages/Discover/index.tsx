import { useTranslation } from 'react-i18next'
import { useQuery } from '@tanstack/react-query'
import { CourseCard } from '../../components/CourseCard'
import coursesApi from '../../services/coursesApi'
import { COURSE_STATUS } from '../../utils/constants'
import AppLoading from '../../components/common/AppLoading'

const Discover = () => {
  const { t } = useTranslation()
  const status: any = { status: COURSE_STATUS.all }

  const { data: rawSuggestedList } = useQuery({
    queryKey: ['suggestedCourses'],
    queryFn: () => coursesApi.getSuggestedCourses(),
  })

  const { data: rawCourseList, isLoading } = useQuery({
    queryKey: ['courses', status],
    queryFn: () => coursesApi.getCourses(status),
  })

  if (isLoading) return <AppLoading />
  return (
    <>
      {isLoading ? (
        <AppLoading />
      ) : (
        <>
          {rawSuggestedList && (
            <div className="m-6">
              <p className="font-bold text-3xl text-primary mb-6">
                Recommended
              </p>
              <div className="grid grid-cols-fill-40 gap-x-8 gap-y-6">
                {rawSuggestedList.data.map((course) => (
                  <CourseCard course={course} key={course.id} />
                ))}
              </div>
            </div>
          )}
          <div className="m-6">
            <div className="flex justify-between items-center">
              <p className="font-bold text-3xl text-primary mb-6">All Course</p>
            </div>

            <div className="grid grid-cols-fill-40 gap-x-8 gap-y-6">
              {rawCourseList?.data.length ? (
                rawCourseList.data.map((course) => (
                  <CourseCard course={course} key={course.id} />
                ))
              ) : (
                <div className="col-span-4 text-center italic text-textSubtle">
                  <p className="text-lg">No courses found</p>
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
