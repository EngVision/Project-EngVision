import { Input } from 'antd'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import { setFilterOptions } from '../../../../redux/course/slice'

const { Search } = Input

const SearchFilter = () => {
  const dispatch = useAppDispatch()
  const searchValue = useAppSelector(
    (state) => state.course.filterOptions.searchValue,
  )

  const onSearch = (value: string) => {
    if (!value && !searchValue) return

    dispatch(
      setFilterOptions({
        searchValue: value,
      }),
    )
  }

  return (
    <Search
      placeholder="Search course"
      allowClear
      enterButton
      onSearch={onSearch}
    />
  )
}

export default SearchFilter
