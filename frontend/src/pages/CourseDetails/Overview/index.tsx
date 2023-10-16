import React from 'react'
import VideoPlay from '../../../components/Icons/VideoPlay'
import { Tag } from 'antd'
import { Level } from '../../../utils/constants'
import type { CourseDetails, Section } from '../../../services/coursesApi/types'
const Overview = (course: CourseDetails) => {
  return (
    <div>
      <div className="mb-6">
        <h3 className="text-2xl text-primary mb-6">General</h3>
        <div className="flex text-base font-light">
          <div className="flex items-center  mr-12">
            <VideoPlay className="mr-3" />
            <div>
              {`${course.sections.reduce((sum: number, section: Section) => {
                return sum + section.lessons.length
              }, 0)} Lessons`}
            </div>
          </div>
        </div>
      </div>
      <div className="mb-6">
        <h4 className="text-base mb-2">Description</h4>
        <div
          className="bg-white border-solid border-[1px] border-wolfGrey
         py-2 px-4 rounded-lg"
        >
          {course.about}
        </div>
      </div>

      <div className="mb-6 text-base">
        <h4 className="mb-2">Level</h4>
        <Tag
          className={`${Level.find((level) => level.level === course.level)
            ?.color}  text-white px-8 py-2 font-bold`}
        >
          {course.level}
        </Tag>
      </div>
    </div>
  )
}

export default Overview
