import React from 'react'
import { DownOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Button, Dropdown } from 'antd'
import { MenuItemType } from 'antd/es/menu/hooks/useItems'
import { useTranslation } from 'react-i18next'
const SortDropDown = ({ onSort }: any) => {
  const { t } = useTranslation('translation', { keyPrefix: 'Discover' })
  const [selected, setSelected] = React.useState(1)
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    setSelected(Number(e.key))
    onSort(Number(e.key))
  }
  const items: MenuItemType[] = [
    {
      label: t('Newly Created'),
      key: '1',
    },
    {
      label: t('My Progress'),
      key: '2',
    },
  ]
  const menuProps = {
    items,
    onClick: handleMenuClick,
  }
  return (
    <Dropdown className="w-60 text-sm text-wolfGrey" menu={menuProps}>
      <Button className="flex justify-between items-center">
        {items[selected - 1]?.label ? items[selected - 1]?.label : 'Sort'}
        <DownOutlined />
      </Button>
    </Dropdown>
  )
}

export default SortDropDown
