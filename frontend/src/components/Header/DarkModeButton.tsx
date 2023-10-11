import { Button, Tooltip } from 'antd'
import { useAppDispatch } from '../../hooks/redux'
import { toggleDarkMode } from '../../redux/app/slice'
import Moon from '../Icons/Moon'
import Sun from '../Icons/Sun'

const DarkModeButton = () => {
  const dispatch = useAppDispatch()
  var darkMode = localStorage.getItem('darkMode')

  const handleChangeTheme = () => {
    dispatch(toggleDarkMode())
    darkMode = localStorage.getItem('darkMode')
    location.reload()
  }

  return (
    <Tooltip title="Dark Mode">
      <Button
        type="primary"
        shape="circle"
        icon={darkMode === 'false' ? <Sun /> : <Moon />}
        onClick={() => handleChangeTheme()}
      />
    </Tooltip>
  )
}
export default DarkModeButton
