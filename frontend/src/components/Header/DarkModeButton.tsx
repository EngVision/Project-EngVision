import { Button, Tooltip } from 'antd'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { toggleDarkMode } from '../../redux/app/slice'
import Moon from '../Icons/Moon'
import Sun from '../Icons/Sun'
import { useTranslation } from 'react-i18next'
const DarkModeButton = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'Header' })
  const dispatch = useAppDispatch()
  const isDarkMode = useAppSelector((state) => state.app.darkMode)

  const handleChangeTheme = () => {
    dispatch(toggleDarkMode())
  }

  const ButtonDarkMode = () => {
    return (
      <Tooltip title={isDarkMode ? t('DarkMode') : t('LightMode')}>
        <Button
          id="dark-mode"
          type="text"
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
