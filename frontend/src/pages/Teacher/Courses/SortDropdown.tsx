import { Button, Dropdown, MenuProps } from 'antd'
import React, { useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { clearSortOption, setSortOption } from '../../../redux/course/slice'
import { SortByEnum } from '../../../utils/constants'

const SortDropdown = () => {
  const dispatch = useAppDispatch()
  const sortOption = useAppSelector((state) => state.course.sortOption)

  const sortOptions = [
    {
      label: 'Price ascending',
      sortBy: SortByEnum.price,
      order: 'asc',
    },
    {
      label: 'Price descending',
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
              className={`py-2 px-4 rounded-lg hover:bg-alternative cursor-pointer 
      ${isActive ? '!bg-alternative font-bold' : ''}`}
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
        Sort
      </Button>
    </Dropdown>
  )
}

export default SortDropdown
