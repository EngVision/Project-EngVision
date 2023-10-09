import { Button, Dropdown } from 'antd'
import React from 'react'
import { useAppDispatch } from '../../../hooks/redux'
import { setSortOption } from '../../../redux/course/slice'

const SortDropdown = () => {
  const dispatch = useAppDispatch()

  const items: any[] = [
    {
      label: (
        <span
          onClick={() => dispatch(setSortOption('asc'))}
          role="presentation"
        >
          Từ A đến Z
        </span>
      ),
      key: '0',
    },
    {
      label: (
        <span
          onClick={() => dispatch(setSortOption('desc'))}
          role="presentation"
        >
          Từ Z đến A
        </span>
      ),
      key: '1',
    },
  ]

  return (
    <Dropdown menu={{ items }} trigger={['click']}>
      <Button
        className="border-primary text-primary"
        onClick={(e) => e.preventDefault()}
      >
        Sort
      </Button>
    </Dropdown>
  )
}

export default SortDropdown
