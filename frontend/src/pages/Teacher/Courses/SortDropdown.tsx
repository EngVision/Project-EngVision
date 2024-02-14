import { Button, Dropdown, MenuProps } from 'antd'
import React, { useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { clearSortOption, setSortOption } from '../../../redux/course/slice'
import { SortByEnum } from '../../../utils/constants'
import { useTranslation } from 'react-i18next'
const SortDropdown = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'MyCourses' })
  const dispatch = useAppDispatch()
  const sortOption = useAppSelector((state) => state.course.sortOption)

  const sortOptions = [
    {
      label: t('Price ascending'),
      sortBy: SortByEnum.price,
      order: 'asc',
    },
    {
      label: t('Price descending'),
      sortBy: SortByEnum.price,
      order: 'desc',
    },
  ]

  const items: MenuProps['items'] = useMemo(
    () =>
      sortOptions.map((option, index) => {
        const isActive =
          option.sortBy === sortOption.sortBy &&
          option.order === sortOption.order

        return {
          key: `${option.sortBy}-${option.order}`,
          label: (
            <div
              key={index}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()

                if (isActive) {
                  dispatch(clearSortOption())
                } else {
                  dispatch(
                    setSortOption({
                      sortBy: option.sortBy,
                      order: option.order,
                    }),
                  )
                }
              }}
              className={`py-2 px-4 rounded-lg hover:bg-neutral cursor-pointer 
                    ${isActive ? '!bg-neutral font-bold' : ''}`}
              role="presentation"
            >
              {option.label}
            </div>
          ),
        }
      }),
    [sortOption],
  )

  return (
    <Dropdown menu={{ items }} placement="bottomRight">
      <Button
        className="border-primary text-primary"
        onClick={(e) => e.preventDefault()}
      >
        {t('Sort by')}
      </Button>
    </Dropdown>
  )
}

export default SortDropdown
