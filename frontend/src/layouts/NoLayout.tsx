import { Outlet } from 'react-router-dom'
import { LogoIcon } from '../components/Icons'

const NoLayout = () => {
  return (
    <div className="h-screen overflow-y-hidden bg-bgDefault flex flex-col">
      <div className="m-4">
        <LogoIcon className="hidden lg:block" />
      </div>
      <div className="flex flex-1 justify-center items-center py-10 px-20 pt-2">
        <Outlet />
      </div>
    </div>
  )
}

export default NoLayout
