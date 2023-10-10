import { Select } from 'antd'
import { useAppDispatch } from '../../hooks/redux'
import { toggleLocales } from '../../redux/app/slice'
import Gobal from '../Icons/Gobal'

const LocalesButton = () => {
  const dispatch = useAppDispatch()
  const handleChangeLocales = (value: any) => {
    if (value) {
      dispatch(toggleLocales(value.toString().toLowerCase()))
    }
  }

  return (
    <Select
      suffixIcon={<Gobal />}
      defaultValue="en"
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
