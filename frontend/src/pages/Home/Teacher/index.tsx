import { useQuery } from '@tanstack/react-query'
import TeacherLearn from '../../../components/Icons/TeacherLearn'
import { useAppSelector } from '../../../hooks/redux'
import coursesApi from '../../../services/coursesApi'
import { COURSE_STATUS } from '../../../utils/constants'
import { useTranslation } from 'react-i18next'
import AppLoading from '../../../components/common/AppLoading'
import { formatCurrency } from '../../../utils/currency'

const Teacher = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'Home' })
  const user = useAppSelector((state) => state.app.user)

  const { data: rawCourseList } = useQuery({
    queryKey: ['courses'],
    queryFn: () =>
      coursesApi.getCourses({ status: COURSE_STATUS.all, limit: -1 }),
  })

  const DashboardNoti = () => {
    return (
      <div
        className={`bg-[#41AB3F] flex flex-row px-5 justify-between rounded-xl items-center`}
      >
        <div className="basis-1/2 text-xl text-white">
          {t('Hi')},{' '}
          {`${user?.firstName ?? ''}${
            user?.lastName ? ' ' + user?.lastName : ''
          }`}
          ! <br />
          {t(
            'Thank you for choosing to share your knowledge and inspire others on our platform!',
          )}
        </div>
        <div>
          <TeacherLearn height={241} width={240} />
        </div>
      </div>
    )
  }
  const DashboardCard = (title: string, value: any) => {
    return (
      <div className="w-[100%/4] h-56 p-2 my-4 flex flex-col rounded-xl bg-surface items-center justify-center text-xl">
        <div className="text-blue-600 text-center">{title}</div>
        <div className="text-blue-700 font-bold">{value}</div>
      </div>
    )
  }

  if (!rawCourseList) return <AppLoading />

  let totalStudents = 0
  let totalRevenue = 0
  let totalRating = 0
  rawCourseList.data?.forEach((course) => {
    totalStudents += course.attendance
    totalRevenue += course.attendance * course.price
    totalRating += course.avgStar ? +course.avgStar : 0
  })

  return (
    <div className="flex flex-col">
      <div className="mb-8">
        <DashboardNoti />
      </div>
      {rawCourseList && (
        <div className="grid grid-cols-fill-40 gap-x-6 gap-y-4">
          {DashboardCard(t('TOTAL YOUR COURSES'), rawCourseList.total)}
          {DashboardCard(t('TOTAL YOUR STUDENTS'), totalStudents)}
          {DashboardCard(t('TOTAL YOUR REVENUE'), formatCurrency(totalRevenue))}
          {DashboardCard(
            t('AVERAGE RATING YOUR COURSES'),
            totalRating ??
              0 /
                rawCourseList.data?.filter((course) => course.avgStar > 0)
                  .length ??
              1,
          )}
        </div>
      )}
    </div>
  )
}

export default Teacher
