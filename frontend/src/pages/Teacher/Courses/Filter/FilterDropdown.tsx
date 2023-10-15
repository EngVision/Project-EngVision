import { Button, Popover } from 'antd'
import SearchFilter from './SearchFilter'
import LevelsDropdown from './LevelsDropdown'

const FilterDropdown = () => {
  const renderContent = () => {
    return (
      <div className="flex gap-4 p-4">
        <SearchFilter />
        <LevelsDropdown />
      </div>
    )
  }

  return (
    <Popover content={renderContent()} trigger="click" placement="bottom">
      <Button
        className="border-primary text-primary"
        onClick={(e) => e.preventDefault()}
      >
        Filter
      </Button>
    </Popover>
  )
}

export default FilterDropdown
