import { CloseOutlined } from '@ant-design/icons'
import { Switch } from 'antd'
import { useAppDispatch } from '../../hooks/redux'
import { toggleDarkMode } from '../../redux/app/slice'
import Moon from '../Icons/Moon'
import Sun from '../Icons/Sun'

const DarkModeButton = () => {
  const dispatch = useAppDispatch()
  const handleChangeTheme = (checked: boolean) => {
    if (checked) {
      dispatch(toggleDarkMode())
    }
  }
  return (
    <Switch
      size="default"
      checkedChildren={<Sun width={20} height={20} />}
      unCheckedChildren={<Moon width={20} height={20} />}
      defaultChecked
      autoFocus
      onChange={(checked) => handleChangeTheme(checked)}
    />
  )
}
export default DarkModeButton
