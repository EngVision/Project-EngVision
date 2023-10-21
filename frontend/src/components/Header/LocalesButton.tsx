import type { MenuProps } from 'antd'
import { Dropdown, Space } from 'antd'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { toggleLocales } from '../../redux/app/slice'

const LocalesButton = () => {
  const { i18n } = useTranslation()
  const dispatch = useAppDispatch()
  const defaultValue = useAppSelector((state) => state.app.locales)

  const onClick: MenuProps['onClick'] = ({ key }) => {
    if (key) {
      dispatch(toggleLocales(key))
      i18n.changeLanguage(key)
    }
  }

  const items: MenuProps['items'] = [
    { key: 'en', label: 'English' },
    { key: 'vi', label: 'VietNam' },
  ]

  return (
    <Dropdown
      menu={{ items, onClick }}
      className=" text-textColor hover:cursor-pointer hover:text-primary rounded-[12px]"
    >
      <span onClick={(e) => e.preventDefault()} role="presentation">
        <Space className="uppercase font-semibold">{defaultValue}</Space>
      </span>
    </Dropdown>
  )
}
export default LocalesButton
