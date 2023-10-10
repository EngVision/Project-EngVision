import { Button, Modal } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'

import Course from '../../../components/Course'
import { PlusIcon } from '../../../components/Icons'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { setCourseList, setCourseStatus } from '../../../redux/course/slice'
import coursesApi from '../../../services/coursesApi'
import { sortCoursesByTitle } from '../../../utils/common'
import { COURSE_STATUS } from '../../../utils/constants'
import TeacherCreateCourse from '../CreateCourse'

const Courses: React.FC = () => {
  const dispatch = useAppDispatch()
  const courses = useAppSelector((state) => state.course.list)
  const status = useAppSelector((state) => state.course.status)
  const sortOption = useAppSelector((state) => state.course.sortOption)

  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredCourses = useMemo(
    () => sortCoursesByTitle(courses, sortOption),
    [courses, sortOption],
  )

  const getCourses = async () => {
    try {
      // TODO: Improve get all courses of current teacher
      if (status === COURSE_STATUS.all) {
        const [publishedCourses, draftCourses] = await Promise.all([
          coursesApi.getCourses({ status: COURSE_STATUS.published }),
          coursesApi.getCourses({ status: COURSE_STATUS.draft }),
        ])
        dispatch(
          setCourseList([...publishedCourses.data, ...draftCourses.data]),
        )
      } else {
        const { data } = await coursesApi.getCourses({ status })
        dispatch(setCourseList(data))
      }
    } catch (error) {
      console.log('error: ', error)
    }
  }

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleCancelCreateForm = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    getCourses()
  }, [status])

  return (
    <div>
      <h3 className="text-primary text-4xl mb-8">My courses</h3>

      <div className="flex justify-between mb-8">
        <div className="flex gap-4">
          <Button
            type={status === COURSE_STATUS.all ? 'primary' : 'default'}
            className={
              status === COURSE_STATUS.all ? '' : 'border-primary text-primary'
            }
            onClick={() => {
              dispatch(setCourseStatus(COURSE_STATUS.all))
            }}
          >
            All
          </Button>
          <Button
            type={status === COURSE_STATUS.published ? 'primary' : 'default'}
            className={
              status === COURSE_STATUS.published
                ? ''
                : 'border-primary text-primary'
            }
            onClick={() => {
              dispatch(setCourseStatus(COURSE_STATUS.published))
            }}
          >
            Published
          </Button>
          <Button
            type={status === COURSE_STATUS.draft ? 'primary' : 'default'}
            className={
              status === COURSE_STATUS.draft
                ? ''
                : 'border-primary text-primary'
            }
            onClick={() => {
              dispatch(setCourseStatus(COURSE_STATUS.draft))
            }}
          >
            Draft
          </Button>
        </div>

        <div className="flex gap-4">
          {/* This feature not supported yet */}
          {/* <FilterDropdown />
          <SortDropdown /> */}

          <div>
            <Button
              icon={<PlusIcon width={16} height={16} className="text-white" />}
              type="primary"
              className="flex items-center"
              onClick={showModal}
            >
              New course
            </Button>

            <Modal
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={null}
              width={800}
              destroyOnClose
            >
              <TeacherCreateCourse onClose={handleCancelCreateForm} />
            </Modal>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-x-8 gap-y-6">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <Course key={course.id} course={course} />
          ))
        ) : (
          <div className="col-span-4 text-center italic text-textSubtle">
            <p className="text-lg">No courses found</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Courses
