import { Select } from 'antd'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { toggleLocales } from '../../redux/app/slice'
import Gobal from '../Icons/Gobal'
import { useTranslation } from 'react-i18next'

const LocalesButton = () => {
  const { i18n } = useTranslation()
  const dispatch = useAppDispatch()
  const defaultValue = useAppSelector((state) => state.app.locales)

  const handleChangeLocales = (value: any) => {
    if (value) {
      dispatch(toggleLocales(value))
      i18n.changeLanguage(value)
    }
  }

  return (
    <Select
      suffixIcon={<Gobal />}
      defaultValue={defaultValue}
      style={{ width: 120 }}
      onChange={(value) => handleChangeLocales(value)}
      options={[
        { value: 'en', label: 'English' },
        { value: 'vi', label: 'VietNam' },
      ]}
    />
  )
}
export default LocalesButton
