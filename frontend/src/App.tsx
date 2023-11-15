import React, { useEffect } from 'react'
import { ConfigProvider, theme as themeAntd } from 'antd'
import { notification } from 'antd'
import { useTranslation } from 'react-i18next'
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
      <ConfigProvider
        theme={{
          algorithm: theme
            ? themeAntd.darkAlgorithm
            : themeAntd.defaultAlgorithm,
          token: {
            fontFamily: 'Poppins, sans-serif',
          },
          // token: {
          //   colorPrimary: theme ? '#5287ec' : '#2769e7',
          //   colorBgBase: theme ? '#1f1f1f' : '#ffffff',
          //   colorBgBlur: theme ? '#1f1f1f' : '#ffffff',
          //   colorTextPlaceholder: theme ? '#ffffff' : '#000000',
          //   colorText: theme ? '#ffffff' : '#000000',
          // },
        }}
      >
        <NotificationContext.Provider value={apiNotification}>
          {contextHolder}
          <AppRoutes />
        </NotificationContext.Provider>
      </ConfigProvider>
    </div>
  )
}

export default App
