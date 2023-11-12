import { Avatar, Popover } from 'antd'
import { useAppDispatch } from '../../hooks/redux'
import authApi from '../../services/authApi'
import { getFileUrl } from '../../utils/common'
import { setUser } from '../../redux/app/slice'
import { useMutation } from '@tanstack/react-query'

type Props = {
  user: any
}

function UserSettings({ user }: Props) {
  const dispatch = useAppDispatch()

  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      dispatch(setUser(null))
    },
  })

  const handleLogout = async () => {
    logoutMutation.mutate()
  }

  const renderContent = () => {
    return (
      <div className="min-w-[120px] py-2">
        <div
          onClick={handleLogout}
          className="w-full text-left border-none p-2 cursor-pointer hover:bg-grey-200"
        >
          Logout
        </div>
      </div>
    )
  }

  return (
    user && (
      <Popover content={renderContent()} trigger="click" placement="bottomLeft">
        <Avatar
          className={`${
            user?.avatar ? '' : 'bg-blue-400 text-white'
          } cursor-pointer`}
          src={getFileUrl(user?.avatar)}
          size="default"
        >
          {user?.avatar ? '' : user?.lastName[0]}
        </Avatar>
      </Popover>
    )
  )
}

export default UserSettings
