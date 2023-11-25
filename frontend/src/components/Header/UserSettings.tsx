import { Avatar, Dropdown, MenuProps } from 'antd'
import { getFileUrl } from '../../utils/common'
import Logout from '../Logout'
import { useNavigate } from 'react-router-dom'
import { PRIVATE_ROUTES } from '../../utils/constants'
import { LogoutIcon, SettingsIcon } from '../Icons'
import { useAppDispatch } from '../../hooks/redux'
import { setShowLogoutModal } from '../../redux/app/slice'

type Props = {
  user: any
}

function UserSettings({ user }: Props) {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const items: MenuProps['items'] = [
    {
      key: 'account',
      label: (
        <div
          onClick={() => navigate(PRIVATE_ROUTES.settings)}
          className="w-full flex gap-2 items-center text-left border-none cursor-pointer"
        >
          <SettingsIcon width={16} height={16} />
          Account
        </div>
      ),
    },
    {
      key: 'logout',
      label: (
        <div
          className="flex gap-2 items-center"
          onClick={() => dispatch(setShowLogoutModal(true))}
        >
          <LogoutIcon width={22} height={16} />
          <Logout />
        </div>
      ),
    },
  ]

  return (
    user && (
      <Dropdown
        menu={{ items }}
        className="text-textColor hover:cursor-pointer hover:text-primary rounded-[12px]"
        placement="bottomRight"
      >
        <Avatar
          className={`${
            user?.avatar ? '' : 'bg-blue-400 text-white'
          } cursor-pointer`}
          src={getFileUrl(user?.avatar)}
          size="default"
        >
          {user?.avatar ? '' : user?.lastName[0]}
        </Avatar>
      </Dropdown>
    )
  )
}

export default UserSettings
