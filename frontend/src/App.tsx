import React, { useEffect } from 'react'

import { notification } from 'antd'
import { useTranslation } from 'next-i18next'
import { NotificationContext } from './contexts/notification'
import { useAppSelector } from './hooks/redux'
import AppRoutes from './routes'

const App: React.FC = () => {
  const { i18n } = useTranslation()
  const [apiNotification, contextHolder] = notification.useNotification()
  const locales = useAppSelector((state) => state.app.locales)

  useEffect(() => {
    i18n.changeLanguage(locales)
  }, [])

  return (
    <NotificationContext.Provider value={apiNotification}>
      {contextHolder}
      <AppRoutes />
    </NotificationContext.Provider>
  )
}

export default App
