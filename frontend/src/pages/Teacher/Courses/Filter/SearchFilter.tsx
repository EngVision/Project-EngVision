import { Input } from 'antd'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import { setFilterOptions } from '../../../../redux/course/slice'
import { useTranslation } from 'react-i18next'

const { Search } = Input

const SearchFilter = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'MyCourses' })
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
      placeholder={t('SearchCourse')}
      allowClear
      enterButton
      onSearch={onSearch}
    />
  )
}

export default SearchFilter
