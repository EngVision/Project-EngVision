import { Button } from 'antd'
import React, { useEffect, useState } from 'react'

import Course from '../../../components/Course'
import { PlusIcon } from '../../../components/Icons'
import coursesApi from '../../../services/coursesApi'

const Courses: React.FC = () => {
  const [courses, setCourses] = useState([])

  const getCourses = async () => {
    try {
      const {
        data: { results },
      } = await coursesApi.getCourses()
      setCourses(results)
    } catch (error) {
      console.log('error: ', error)
    }
  }

  useEffect(() => {
    getCourses()
  }, [])

  return (
    <div>
      <h3 className="text-primary text-4xl mb-8">My courses</h3>

      <div className="flex justify-between mb-8">
        <div className="flex gap-4">
          <Button type="primary">Published</Button>
          <Button className="border-primary text-primary">Draft (2)</Button>
        </div>

        <div className="flex gap-4">
          <Button className="border-primary text-primary">Filter</Button>
          <Button className="border-primary text-primary">Sort</Button>
          <Button
            icon={<PlusIcon width={16} height={16} className="text-white" />}
            type="primary"
            className="flex items-center"
          >
            New course
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-x-8 gap-y-6">
        {courses.map((course: any) => (
          <Course key={course.id} course={course} />
        ))}
      </div>
    </div>
  )
}

export default Courses
