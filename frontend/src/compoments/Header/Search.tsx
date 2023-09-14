import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Input } from 'antd'
import React from 'react'

const Search = () => {
  return (
    <Input
      prefix={<FontAwesomeIcon icon={faMagnifyingGlass} />}
      placeholder="Search or type"
      allowClear
      className="max-w-[480px] px-4 py-2 rounded-[999px] border-none shadow-none bg-[#F4F4F4] [&>input]:bg-[#F4F4F4] [&>input]:ml-2"
    />
  )
}

export default Search
