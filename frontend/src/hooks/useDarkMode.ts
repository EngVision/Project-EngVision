// import { useEffect, useState } from 'react'
// import { useAppDispatch, useAppSelector } from './redux'
// import { toggleDarkMode } from '../redux/app/slice'

// const updateThemeInDocument = (theme: boolean) => {
//   if (
//     theme === true &&
//     window.matchMedia('(prefers-color-scheme: dark)').matches
//   ) {
//     document.documentElement.classList.add('dark')
//   } else {
//     document.documentElement.classList.remove('dark')
//   }
// }

// const useDarkMode = () => {
//   const dispatch = useAppDispatch()
//   const theme = useAppSelector((state) => state.app.darkMode)

//   useEffect(() => {
//     const osPref = window.matchMedia('(prefers-color-scheme: dark)').matches

//     if (!theme) {
//       if (osPref) dispatch(toggleDarkMode())
//     }

//     updateThemeInDocument(theme)
//   }, [])

//   return { isDarkMode }
// }

// export default useDarkMode
