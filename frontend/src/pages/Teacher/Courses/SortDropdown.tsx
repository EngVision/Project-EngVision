import { Button, Popover } from 'antd'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { setSortOption } from '../../../redux/course/slice'

const SortDropdown = () => {
  const dispatch = useAppDispatch()
  const sortOption = useAppSelector((state) => state.course.sortOption)

  const sortOptions = [
    {
      label: 'Price ascending',
      sortBy: 'price',
      order: 'asc',
    },
    {
      label: 'Price descending',
      sortBy: 'price',
      order: 'desc',
    },
  ]

  const renderContent = () => {
    return (
      <div className="py-2">
        {sortOptions.map((option, index) => {
          const isActive =
            option.sortBy === sortOption.sortBy &&
            option.order === sortOption.order

          return (
            <div
              key={index}
              onClick={() => {
                if (isActive) {
                  setSortOption({
                    sortBy: '',
                    order: '',
                  })
                }

                dispatch(setSortOption(option))
              }}
              className={`py-2 px-4 rounded-lg hover:bg-grey-100 cursor-pointer 
              ${isActive ? 'bg-grey-100 font-semibold' : ''}`}
              role="presentation"
            >
              {option.label}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <Popover content={renderContent()} trigger="click" placement="bottom">
      <Button
        className="border-primary text-primary"
        onClick={(e) => e.preventDefault()}
      >
        Sort
      </Button>
    </Popover>
  )
}

export default SortDropdown
