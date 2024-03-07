import { ConfigProvider, notification, theme as themeAntd } from 'antd'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import GetStartedModal from './components/GetStartedModal'
import { NotificationContext } from './contexts/notification'
import { useAppSelector } from './hooks/redux'
import AppRoutes from './routes'
import MessengerCustomerChat from 'react-messenger-customer-chat'
import {
  FACEBOOK_APP_ID,
  FACEBOOK_PAGE_ID,
  PUBLIC_ROUTES,
} from './utils/constants'
import { useLocation } from 'react-router'

const App: React.FC = () => {
  const { i18n } = useTranslation()
  const [apiNotification, contextHolder] = notification.useNotification()
  const { pathname } = useLocation()

  const locales = useAppSelector((state) => state.app.locales)
  const darkMode = useAppSelector((state) => state.app.darkMode)
  const showingGetStarted = useAppSelector(
    (state) => state.app.showingGetStarted,
  )

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
        {showingGetStarted && <GetStartedModal />}
        {!Object.values(PUBLIC_ROUTES).includes(pathname) && (
          <MessengerCustomerChat
            pageId={FACEBOOK_PAGE_ID}
            appId={FACEBOOK_APP_ID}
          />
        )}
      </NotificationContext.Provider>
    </ConfigProvider>
  )
}

export default App
