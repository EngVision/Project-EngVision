import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

import { Outlet } from 'react-router-dom'
import { useAppSelector } from '../hooks/redux'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

const DefaultLayout = () => {
  const { i18n } = useTranslation()
  const theme = useAppSelector((state) => state.app.darkMode)
  const locales = useAppSelector((state) => state.app.locales)

  useEffect(() => {
    i18n.changeLanguage(locales)
  }, [locales])

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
