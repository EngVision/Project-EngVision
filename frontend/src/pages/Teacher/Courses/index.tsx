import { Button, Modal } from 'antd'
import React, { useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import Course from '../../../components/Course'
import { PlusIcon } from '../../../components/Icons'
import AppLoading from '../../../components/common/AppLoading'
import { useAppSelector } from '../../../hooks/redux'
import coursesApi from '../../../services/coursesApi'
import TeacherCreateCourse from '../CreateCourse'
import FilterDropdown from './Filter/FilterDropdown'
import SortDropdown from './SortDropdown'
import StatusMode from './StatusMode'
import { useTranslation } from 'react-i18next'
const Courses: React.FC = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'MyCourses' })
  const status = useAppSelector((state) => state.course.status)
  const sortOption = useAppSelector((state) => state.course.sortOption)
  const filterOptions = useAppSelector((state) => state.course.filterOptions)

  const [isModalOpen, setIsModalOpen] = useState(false)

  const { data: rawCourseList, isLoading } = useQuery({
    queryKey: ['courses', { status, ...filterOptions, ...sortOption }],
    queryFn: async () =>
      coursesApi.getCourses({ status, ...filterOptions, ...sortOption }),
  })

  return (
    <div>
      <h3 className="text-primary text-3xl mb-8">{t('My courses')}</h3>

      <div className="flex justify-between mb-8">
        <StatusMode />

        <div className="flex gap-4">
          <FilterDropdown />
          <SortDropdown />

          <div>
            <Button
              icon={<PlusIcon width={16} height={16} className="text-white" />}
              type="primary"
              className="flex items-center"
              onClick={() => setIsModalOpen(true)}
            >
              {t('New course')}
            </Button>

            <Modal
              open={isModalOpen}
              onOk={() => setIsModalOpen(false)}
              onCancel={() => setIsModalOpen(false)}
              footer={null}
              width={800}
              destroyOnClose
            >
              <TeacherCreateCourse onClose={() => setIsModalOpen(false)} />
            </Modal>
          </div>
        </div>
      </div>

      {isLoading ? (
        <AppLoading />
      ) : (
        <div className="grid grid-cols-fill-40 gap-6">
          {rawCourseList?.data && rawCourseList.data.length > 0 ? (
            rawCourseList.data.map((course) => (
              <Course key={course.id} course={course} />
            ))
          ) : (
            <div className="col-span-4 text-center italic text-textSubtle">
              <p className="text-lg">{t('No courses found')}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Courses
