import { Button } from 'antd'
import React from 'react'

import CourseTable from './CourseTable'
import HomeworkTable from './HomeworkTable'

const Search = () => {
  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-primary text-[32px] font-bold mb-[32px]">
          Results found for "Grammar"
        </h2>

        <div className="flex gap-3">
          <Button className="border-primary text-primary">Filter</Button>
          <Button className="border-primary text-primary">Sort</Button>
          <Button type="primary">Apply</Button>
        </div>
      </div>

      <div>
        <h4 className="mt-[32px] mb-[16px]">Homeworks</h4>
        <HomeworkTable />
      </div>

      <div>
        <h4 className="mt-[32px] mb-[16px]">Courses</h4>
        <CourseTable />
      </div>
    </div>
  )
}

export default Search
