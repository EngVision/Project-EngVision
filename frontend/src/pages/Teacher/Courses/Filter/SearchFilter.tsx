import { Input } from 'antd'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import { setFilterOptions } from '../../../../redux/course/slice'

const { Search } = Input

const SearchFilter = () => {
  const dispatch = useAppDispatch()
  const keyword = useAppSelector((state) => state.course.filterOptions.keyword)

  const onSearch = (value: string) => {
    if (!value && !keyword) return

    dispatch(
      setFilterOptions({
        keyword: value,
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
