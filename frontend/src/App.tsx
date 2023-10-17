import React from 'react'

import AppRoutes from './routes'
import { notification } from 'antd'
import { NotificationContext } from './contexts/notification'

const App: React.FC = () => {
  const [apiNotification, contextHolder] = notification.useNotification()
  return (
    <NotificationContext.Provider value={apiNotification}>
      {contextHolder}
      <AppRoutes />
    </NotificationContext.Provider>
  )
}

export default App
