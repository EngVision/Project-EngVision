import React from 'react'
import { NoNotificationIcon, NotificationIcon } from '../Icons'
import { Popover } from 'antd'

const Notification = () => {
  const renderContent = (
    <div className="p-8 flex flex-col items-center gap-4">
      <NoNotificationIcon width={80} height={80} />
      <p>No notification yet</p>
    </div>
  )

  return (
    <Popover content={renderContent} placement="bottomRight">
      <div id="notification" className="flex">
        <NotificationIcon width={40} height={40} className="cursor-pointer" />
      </div>
    </Popover>
  )
}

export default Notification
