import React from 'react'
import {
  MenuIcon,
  PencilLineIcon,
  TrashIcon,
} from '../../../../components/Icons'
import { Collapse } from 'antd'
import CustomInput from '../../../../components/common/CustomInput'
import { Lesson as LessonType } from '../../../../services/coursesApi/types'

interface LessonProps {
  lessons: LessonType[]
}

const Lesson = ({ lessons }: LessonProps) => {
  const handleDelete = (e: React.MouseEvent<HTMLOrSVGElement, MouseEvent>) => {
    e.stopPropagation()
    console.log('click add')
  }

  const items = lessons.map((lesson) => ({
    key: lesson.id,
    label: (
      <div className="flex justify-between">
        <CustomInput defaultValue={lesson.title} />

        <div className="flex gap-4">
          <PencilLineIcon />
          <TrashIcon onClick={handleDelete} />
        </div>
      </div>
    ),
    children: 'Description',
  }))

  return (
    <div>
      <Collapse
        bordered={false}
        expandIcon={({ isActive }) => (
          <MenuIcon className={isActive ? '' : 'opacity-50'} />
        )}
        items={items}
      />
    </div>
  )
}

export default Lesson
