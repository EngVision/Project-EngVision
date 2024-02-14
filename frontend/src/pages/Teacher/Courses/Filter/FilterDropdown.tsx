import { Button, Popover } from 'antd'
import SearchFilter from './SearchFilter'
import { useTranslation } from 'react-i18next'

const FilterDropdown = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'MyCourses' })

  const renderContent = () => {
    return (
      <div className="flex gap-4 p-4">
        <SearchFilter />

        {/* Support later */}
        {/* <LevelsDropdown /> */}
      </div>
    )
  }

  return (
    <Popover content={renderContent()} trigger="click" placement="bottom">
      <Button
        className="border-primary text-primary"
        onClick={(e) => e.preventDefault()}
      >
        {t('Filter')}
      </Button>
    </Popover>
  )
}

export default FilterDropdown
