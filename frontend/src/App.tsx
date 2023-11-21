import React, { useEffect } from 'react'
import { ConfigProvider, theme as themeAntd } from 'antd'
import { notification } from 'antd'
import { useTranslation } from 'react-i18next'
import { NotificationContext } from './contexts/notification'
import { useAppSelector } from './hooks/redux'
import AppRoutes from './routes'
import GetStartedModal from './components/GetStartedModal'

const App: React.FC = () => {
  const { i18n } = useTranslation()
  const [apiNotification, contextHolder] = notification.useNotification()
  const locales = useAppSelector((state) => state.app.locales)
  const darkMode = useAppSelector((state) => state.app.darkMode)

  useEffect(() => {
    i18n.changeLanguage(locales)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('theme-light', !darkMode)
    document.body.classList.toggle('theme-dark', darkMode)
  }, [darkMode])

  return (
    <ConfigProvider
      theme={{
        algorithm: darkMode
          ? themeAntd.darkAlgorithm
          : themeAntd.defaultAlgorithm,
        token: {
          fontFamily: 'Poppins, sans-serif',
        },
      }}
    >
      <NotificationContext.Provider value={apiNotification}>
        {contextHolder}
        <AppRoutes />
        <GetStartedModal />
      </NotificationContext.Provider>
    </ConfigProvider>
  )
}

export default App
