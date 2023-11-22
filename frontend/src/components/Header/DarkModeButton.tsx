import { Button, Tooltip } from 'antd'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { toggleDarkMode } from '../../redux/app/slice'
import Moon from '../Icons/Moon'
import Sun from '../Icons/Sun'

const DarkModeButton = () => {
  const dispatch = useAppDispatch()
  const isDarkMode = useAppSelector((state) => state.app.darkMode)

  const handleChangeTheme = () => {
    dispatch(toggleDarkMode())
  }

  const ButtonDarkMode = () => {
    return (
      <Tooltip title={isDarkMode ? 'Dark Mode' : 'Light Mode'}>
        <Button
          type={isDarkMode ? 'primary' : 'text'}
          shape="circle"
          icon={isDarkMode ? <Moon /> : <Sun />}
          onClick={() => handleChangeTheme()}
        />
      </Tooltip>
    )
  }

  return <ButtonDarkMode />
}
export default DarkModeButton
