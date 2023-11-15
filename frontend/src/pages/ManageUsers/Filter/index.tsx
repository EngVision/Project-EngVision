import React, { useState } from 'react'
import { Button, Popover, Select } from 'antd'
import { Role } from '../../../utils/constants'

interface FilterProps {
  setRole: (role: string) => void
}

const Filter = ({ setRole }: FilterProps) => {
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
        <p className="mr-4">Role:</p>
        <Select
          defaultValue={'All'}
          style={{ width: 120 }}
          onChange={handleChange}
          options={[
            { value: 'All', label: 'All' },
            { value: Role.Student, label: Role.Student },
            { value: Role.Teacher, label: Role.Teacher },
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
        Filter
      </Button>
    </Popover>
  )
}

export default Filter
