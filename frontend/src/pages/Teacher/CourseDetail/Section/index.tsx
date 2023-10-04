import React from 'react'
import { Button, Collapse } from 'antd'
import Lesson from './Lesson'
import {
  MenuIcon,
  PencilLineIcon,
  PlusIcon,
  TrashIcon,
} from '../../../../components/Icons'
import CustomInput from '../../../../components/common/CustomInput'
import { Section as SectionType } from '../../../../services/coursesApi/types'

interface SectionProps {
  sections: SectionType[]
  setCourse: any
}

const Section = ({ sections, setCourse }: SectionProps) => {
  const handleAddSection = () => {
    const newSection = {
      title: 'New section',
      lessons: [],
    }
    setCourse((prev: any) => ({
      ...prev,
      sections: [...prev.sections, newSection],
    }))
  }

  const handleAdd = (
    e: React.MouseEvent<HTMLOrSVGElement, MouseEvent>,
    id: string | undefined,
  ) => {
    e.stopPropagation()
    const newLesson = {
      title: 'New lesson',
      exercises: [],
    }
    setCourse((prev: any) => ({
      ...prev,
      sections: prev.sections.map((section: any) =>
        section.id === id
          ? { ...section, lessons: [...section.lessons, newLesson] }
          : section,
      ),
    }))
  }

  const handleDelete = (
    e: React.MouseEvent<HTMLOrSVGElement, MouseEvent>,
    id: string | undefined,
  ) => {
    e.stopPropagation()
    setCourse((prev: any) => ({
      ...prev,
      sections: prev.sections.filter((section: any) => section.id !== id),
    }))
  }

  const items = sections.map((section) => ({
    key: section.id,
    label: (
      <div className="flex justify-between">
        <CustomInput defaultValue={section.title} />

        <div className="flex gap-4">
          <PlusIcon
            onClick={(e: React.MouseEvent<HTMLOrSVGElement, MouseEvent>) =>
              handleAdd(e, section.id)
            }
          />
          <PencilLineIcon />
          <TrashIcon
            onClick={(e: React.MouseEvent<HTMLOrSVGElement, MouseEvent>) =>
              handleDelete(e, section.id)
            }
          />
        </div>
      </div>
    ),
    children: <Lesson lessons={section.lessons} />,
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

      <Button
        type="primary"
        className="w-full my-4 h-10"
        onClick={handleAddSection}
      >
        Add section
      </Button>
    </div>
  )
}

export default Section
