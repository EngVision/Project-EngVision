import { useAppSelector } from '../../hooks/redux'
import { NotificationIcon } from '../Icons'
import DarkModeButton from './DarkModeButton'
import Search from './Search'
import LocalesButton from './LocalesButton'
import UserSettings from './UserSettings'

const Header = () => {
  const user = useAppSelector((state) => state.app.user)

  return (
    <div className="flex items-center pt-9 pb-6">
      <div className="flex-1 flex justify-end">
        {/* <Search /> */}

        <div className="flex items-center gap-4">
          <NotificationIcon width={40} height={40} />
          <LocalesButton />
          <DarkModeButton />
          <UserSettings user={user} />
        </div>
      </div>
    </div>
  )
}

export default Header
