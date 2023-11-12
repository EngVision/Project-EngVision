import { Avatar } from 'antd'
import { useAppSelector } from '../../hooks/redux'
import { getFileUrl } from '../../utils/common'
import { NotificationIcon } from '../Icons'
import DarkModeButton from './DarkModeButton'
import Search from './Search'
import LocalesButton from './LocalesButton'

const Header = () => {
  const user = useAppSelector((state) => state.app.user)

  return (
    <div className="flex items-center py-9">
      <div className="flex-1 flex justify-end">
        {/* <Search /> */}

        <div className="flex items-center gap-4">
          <NotificationIcon width={40} height={40} />
          <LocalesButton />
          <DarkModeButton />
          {user && (
            <Avatar
              className={`${user?.avatar ? '' : 'bg-blue-400 text-white'}`}
              src={getFileUrl(user?.avatar)}
              size="default"
            >
              {user?.avatar ? '' : user?.lastName[0]}
            </Avatar>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
