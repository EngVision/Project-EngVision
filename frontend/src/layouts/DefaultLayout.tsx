import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

import { Outlet } from 'react-router-dom'
import { useAppSelector } from '../hooks/redux'

const DefaultLayout = () => {
  const theme = useAppSelector((state) => state.app.darkMode)
  return (
    <div
      className={`${
        theme ? 'theme-dark' : 'theme-light'
      } flex flex-row bg-bgDefault h-screen text-textColor`}
    >
      <Sidebar />
      <div className="flex flex-1 flex-col min-w-[0px]">
        <div className="px-8">
          <Header />
        </div>
        <div className="px-8 pb-8 flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default DefaultLayout
