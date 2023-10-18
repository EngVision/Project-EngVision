import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from './redux'
import { toggleDarkMode } from '../redux/app/slice'

const updateThemeInDocument = (theme: boolean) => {
  if (
    theme === true &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

const useDarkMode = () => {
  const [isDarkMode, setDarkMode] = useState(false)
  const dispatch = useAppDispatch()
  const theme = useAppSelector((state) => state.app.darkMode)

  useEffect(() => {
    const osPref = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (!theme) {
      if (osPref) dispatch(toggleDarkMode())
      setDarkMode(osPref)
    } else {
      setDarkMode(theme)
    }

    updateThemeInDocument(theme)
  }, [])

  return { isDarkMode }
}

export default useDarkMode
