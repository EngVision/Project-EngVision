import React from 'react'

import AssignmentsTable from './AssignmentsTable'
import YourCourses from './YourCourses'

const Courses: React.FC = () => {
  return (
    <div>
      <AssignmentsTable />
      <YourCourses />
    </div>
  )
}

export default Courses
