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
  const theme = useAppSelector((state) => state.app.darkMode)

  useEffect(() => {
    i18n.changeLanguage(locales)
  }, [])

  return (
    <div className={`${theme ? 'theme-dark' : 'theme-light'}`}>
      <NotificationContext.Provider value={apiNotification}>
        {contextHolder}
        <AppRoutes />
      </NotificationContext.Provider>
    </div>
  )
}

export default App
