import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

import { Outlet } from 'react-router-dom'

const DefaultLayout = () => {
  return (
    <div className="flex flex-row bg-[#F3EFE2] h-[100vh]">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <div className="px-8  bg-bgNeutral">
          <Header />
        </div>
        <div className="px-8 pb-8 flex-1 overflow-y-auto bg-bgNeutral">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default DefaultLayout
