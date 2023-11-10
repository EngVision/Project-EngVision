import { Outlet } from 'react-router-dom'
import { LogoIcon, LogoImageIcon } from '../components/Icons'

const NoLayout = () => {
  return (
    <div className="h-screen overflow-y-hidden">
      <div className="m-5 h-[1vh]">
        <LogoImageIcon
          className="block lg:hidden ml-[6px]"
          width={40}
          height={40}
        />
        <LogoIcon className="hidden lg:block" />
      </div>
      <div className="flex justify-center items-center h-[90vh]">
        <Outlet />
      </div>
    </div>
  )
}

export default NoLayout
