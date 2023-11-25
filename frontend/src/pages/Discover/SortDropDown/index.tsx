import React from 'react'
import { DownOutlined, UserOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Button, Dropdown } from 'antd'
import { MenuItemType } from 'antd/es/menu/hooks/useItems'
// const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
//   message.info('Click on left button.')
//   console.log('click left button', e)
// }

const SortDropDown = ({ onSort }: any) => {
  const [selected, setSelected] = React.useState(1)
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    setSelected(Number(e.key))
    onSort(Number(e.key))
  }
  const items: MenuItemType[] = [
    {
      label: 'Newly Created',
      key: '1',
    },
    {
      label: 'My Progress',
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
