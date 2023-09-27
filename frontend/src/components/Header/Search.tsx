import { Input } from 'antd'
import React from 'react'

import { SearchIcon } from '../Icons'

import Filter from './Filter'

const Search = () => {
  return (
    <Input
      prefix={<SearchIcon width={20} height={20} />}
      suffix={<Filter />}
      placeholder="Search or type"
      allowClear
      className="max-w-[480px] px-4 py-2 rounded-[999px] border-none shadow-none bg-[#F4F4F4] [&>input]:bg-[#F4F4F4] [&>input]:ml-2"
    />
  )
}

export default Search
