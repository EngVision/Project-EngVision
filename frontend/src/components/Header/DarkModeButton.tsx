import { Button, Tooltip } from 'antd'
import { useState } from 'react'
import { useAppDispatch } from '../../hooks/redux'
import { toggleDarkMode } from '../../redux/app/slice'
import Moon from '../Icons/Moon'
import Sun from '../Icons/Sun'
import useDarkMode from '../../hooks/useDarkMode'

const DarkModeButton = () => {
  const dispatch = useAppDispatch()
  const [theme, setTheme] = useState(localStorage.getItem('theme'))
  const { handleTheme } = useDarkMode()

  const handleChangeTheme = () => {
    const value = theme === 'dark' ? 'light' : 'dark'
    dispatch(toggleDarkMode(value))
    setTheme(localStorage.getItem('theme'))
    handleTheme(value === 'dark' ? true : false)
  }

  const ButtonDarkMode = () => {
    return (
      <Tooltip title="Dark Mode">
        <Button
          type={theme === 'dark' ? 'primary' : 'text'}
          shape="circle"
          icon={theme === 'dark' ? <Moon /> : <Sun />}
          onClick={() => handleChangeTheme()}
        />
      </Tooltip>
    )
  }

  return <ButtonDarkMode />
}
export default DarkModeButton
