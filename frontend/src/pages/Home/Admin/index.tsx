import { useQuery } from '@tanstack/react-query'
import { useAppSelector } from '../../../hooks/redux'
import coursesApi from '../../../services/coursesApi'
import { Role } from '../../../utils/constants'
import AdminLearn from '../../../components/Icons/AdminLearn'
import { useTranslation } from 'react-i18next'
import AppLoading from '../../../components/common/AppLoading'
import {
  GetAccountParams,
  UserAccount,
} from '../../../services/accountApi/types'
import accountApi from '../../../services/accountApi'

const Admin = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'Home' })
  const user = useAppSelector((state) => state.app.user)

  const getUsersData: () => Promise<UserAccount[]> = async () => {
    const params: GetAccountParams = {
      limit: -1,
    }
    const res = await accountApi.getAccount(params)

    return res.data
  }

  const { data: userList } = useQuery({
    queryKey: ['users'],
    queryFn: () => getUsersData(),
  })

  const { data: totalPublishedCourse } = useQuery({
    queryKey: ['courses'],
    queryFn: () => coursesApi.getTotalCoursePublished(),
  })

  const DashboardNoti = () => {
    return (
      <div
        className={`bg-[#41AB3F] flex flex-row px-5 justify-between rounded-xl items-center`}
      >
        <div className="basis-1/2 text-xl text-white">
          {t('Hi')},{' '}
          {user?.firstName
            ? user?.firstName
            : '' + ' ' + user?.lastName
            ? user?.lastName
            : ''}
          ! <br />
          {t(
            'Thank you for choosing to share your knowledge and inspire others on our platform!',
          )}
        </div>
        <div>
          <AdminLearn height={241} width={240} />
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

  if (!userList || !totalPublishedCourse) return <AppLoading />

  return (
    <div className="flex flex-col">
      <div className="mb-8">
        <DashboardNoti />
      </div>
      <div className="grid grid-cols-fill-40 gap-x-6 gap-y-4">
        {DashboardCard(t('TOTAL ACTIVE COURSES'), totalPublishedCourse.total)}
        {DashboardCard(
          t('TOTAL STUDENTS'),
          userList.filter((user) => user.role === Role.Student).length,
        )}
        {DashboardCard(
          t('TOTAL TEACHERS'),
          userList.filter((user) => user.role === Role.Teacher).length,
        )}
        {DashboardCard(
          t('TOTAL TEACHERS NEED APPROVE'),
          userList.filter(
            (user) => user.role === Role.Teacher && user.status === 'Pending',
          ).length,
        )}
      </div>
    </div>
  )
}

export default Admin
