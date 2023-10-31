import { Button, Space } from 'antd'
// import { useEffect, useState } from 'react'
import ArrowLeft from '../../../components/Icons/ArrowLeft'
import ArrowRight from '../../../components/Icons/ArrowRight'
import CourseCard from './CourseCard'
import ExamTable from './ExamTable'

const Grading = () => {
  return (
    <div>
      <div className="mb-8">
        <h3 className="text-primary text-2xl">Grading Course</h3>
        <div className="flex justify-between align-middle">
          <p className="font-bold text-3xl text-primary">
            {/* {t('Exercises.exercises')} */}
          </p>
          <Space>
            <Button
              type="primary"
              shape="circle"
              size="middle"
              ghost
              icon={<ArrowLeft width={20} height={20} />}
            ></Button>
            <Button
              type="primary"
              shape="circle"
              size="middle"
              ghost
              icon={<ArrowRight width={20} height={20} />}
            ></Button>
          </Space>
        </div>
        <div
          id="course-list"
          className="flex gap-10 overflow-x-scroll scrollbar-hide scroll-smooth snap-mandatory snap-x"
        >
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
        </div>
      </div>
      <div>
        <h3 className="text-primary text-2xl mb-4">Grading Exam</h3>
        <ExamTable />
      </div>
    </div>
  )
}

export default Grading
