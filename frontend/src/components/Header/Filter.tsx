import { Checkbox, Popover } from 'antd'
import type { CheckboxValueType } from 'antd/es/checkbox/Group'
import React, { useEffect } from 'react'

import { useAppDispatch } from '../../hooks/redux'
import { setSearchOptions } from '../../redux/app/slice'
import { SEARCH_OPTIONS } from '../../utils/constants'
import { FilterIcon } from '../Icons'

const Filter = () => {
  const dispatch = useAppDispatch()

  const onChange = (checkedValues: CheckboxValueType[]) => {
    dispatch(setSearchOptions(checkedValues))
  }

  useEffect(() => {
    dispatch(setSearchOptions(Object.values(SEARCH_OPTIONS)))
  }, [])

  const content = (
    <Checkbox.Group
      options={Object.values(SEARCH_OPTIONS)}
      defaultValue={Object.values(SEARCH_OPTIONS)}
      onChange={onChange}
      className="flex flex-col gap-4 p-1"
    />
  )

  return (
    <Popover content={content} trigger="click" className="flex cursor-pointer">
      <div>
        <FilterIcon width={20} height={20} />
      </div>
    </Popover>
  )
}

export default Filter
