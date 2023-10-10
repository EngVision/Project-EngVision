import { Button } from 'antd'
import React from 'react'

const FilterDropdown = () => {
  return (
    <Button
      className="border-primary text-primary"
      onClick={(e) => e.preventDefault()}
    >
      Filter
    </Button>
  )
}

export default FilterDropdown
