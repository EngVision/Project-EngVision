import { Button, Tooltip } from 'antd'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { toggleDarkMode } from '../../redux/app/slice'
import Moon from '../Icons/Moon'
import Sun from '../Icons/Sun'

const DarkModeButton = () => {
  const dispatch = useAppDispatch()
  const theme = useAppSelector((state) => state.app.darkMode)

  const handleChangeTheme = () => {
    dispatch(toggleDarkMode())
  }

  const ButtonDarkMode = () => {
    return (
      <Tooltip title="Dark Mode">
        <Button
          type={theme ? 'primary' : 'text'}
          shape="circle"
          icon={theme ? <Moon /> : <Sun />}
          onClick={() => handleChangeTheme()}
        />
      </Tooltip>
    )
  }

  return <ButtonDarkMode />
}
export default DarkModeButton
