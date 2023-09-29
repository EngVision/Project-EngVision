import React from 'react'

import { useAppSelector } from '../../hooks/redux'
import { SEARCH_OPTIONS } from '../../utils/constants'

import CourseTable from './CourseTable'
import HomeworkTable from './HomeworkTable'

const Search = () => {
  const searchOptions = useAppSelector((state) => state.app.searchOptions)

  return (
    <div>
      <h2 className="text-primary text-[32px] font-bold mt-[40px] mb-[32px]">
        Results found for "Grammar"
      </h2>

      {searchOptions.includes(SEARCH_OPTIONS.homework) && (
        <div>
          <h4 className="mt-[32px] mb-[16px]">Homeworks</h4>
          <HomeworkTable />
        </div>
      )}

      {searchOptions.includes(SEARCH_OPTIONS.course) && (
        <div>
          <h4 className="mt-[32px] mb-[16px]">Courses</h4>
          <CourseTable />
        </div>
      )}
    </div>
  )
}

export default Search
