import { useAppSelector } from '../../hooks/redux'
import DarkModeButton from './DarkModeButton'
import HelpMenu from './HelpMenu'
import LocalesButton from './LocalesButton'
import UserSettings from './UserSettings'

const Header = () => {
  const user = useAppSelector((state) => state.app.user)

  return (
    <div className="flex items-center pt-9 relative z-[1] bg-bgDefault">
      <div className="flex-1 flex justify-end">
        <div className="flex items-center gap-4">
          <HelpMenu />
          <LocalesButton />
          <DarkModeButton />
          <UserSettings user={user} />
        </div>
      </div>
    </div>
  )
}

export default Header
