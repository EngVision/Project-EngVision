import { Outlet } from 'react-router-dom'

const MobileLayout = () => {
  return (
    <div className="flex flex-row bg-bgDefault min-h-screen text-textColor">
      <div className="flex flex-1 flex-col min-w-[0px] px-4 py-6 ">
        <div className="flex-1  min-h-[0px]">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default MobileLayout
