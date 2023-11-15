import React, { useState } from 'react'
import { Button, Popover, Select } from 'antd'
import { Order } from '../../../services/types'

interface SortProps {
  setRole: (role: string) => void
}

const Sort = ({ setRole }: SortProps) => {
  const [open, setOpen] = useState(false)

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
  }

  const handleChange = (value: string) => {
    setRole(value)
  }

  const content = (
    <div>
      <div className="flex p-3 items-center">
        <p className="mr-4">Created Date:</p>
        <Select
          defaultValue={Order.asc}
          style={{ width: 250 }}
          onChange={handleChange}
          options={[
            { value: Order.asc, label: 'Old to new of created date' },
            { value: Order.desc, label: 'New to old of created date' },
          ]}
        />
      </div>
    </div>
  )

  return (
    <Popover
      trigger="click"
      content={content}
      open={open}
      onOpenChange={handleOpenChange}
      placement="bottomRight"
    >
      <Button type="primary" ghost>
        Sort
      </Button>
    </Popover>
  )
}

export default Sort
