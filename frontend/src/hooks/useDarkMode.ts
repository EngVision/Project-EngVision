import { useEffect, useState } from 'react'

const updateThemeInDocument = () => {
  if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

const useDarkMode = () => {
  const [isDarkMode, setDarkMode] = useState(false)

  const handleTheme = (preferDarkMode: boolean) => {
    localStorage.setItem('theme', preferDarkMode ? 'dark' : 'light')

    updateThemeInDocument()

    setDarkMode(preferDarkMode)
  }

  useEffect(() => {
    const osPref = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (!localStorage.getItem('theme')) {
      localStorage.setItem('theme', osPref ? 'dark' : 'light')
      setDarkMode(osPref)
    } else {
      setDarkMode(localStorage.getItem('theme') === 'dark' ? true : false)
    }

    updateThemeInDocument()
  }, [])

  return { isDarkMode, handleTheme }
}

export default useDarkMode
