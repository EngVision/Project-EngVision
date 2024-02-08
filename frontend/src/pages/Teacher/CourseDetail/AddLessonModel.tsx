import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Modal, Tag, TreeSelect, message } from 'antd'
import { TreeSelectProps } from 'antd/lib'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { lessonApi } from '../../../services/lessonApi'
import { AddLessonRequest } from '../../../services/lessonApi/type'

interface Props {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  sectionId: string
}

export default function AddLessonModel(props: Props) {
  const { isOpen, setIsOpen, sectionId } = props
  const { courseId } = useParams()
  const queryClient = useQueryClient()

  const [isTreeSelectOpen, setIsTreeSelectOpen] = useState(false)
  const [value, setValue] = useState<string[]>([])

  useEffect(() => {
    setTimeout(() => {
      setIsTreeSelectOpen(true)
    }, 300)
  }, [])

  const onChange = (newValue: string[]) => {
    setValue(newValue)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const { data: courses, isLoading: isLoading } = useQuery({
    queryKey: ['course'],
    queryFn: () => lessonApi.getAllLesson(),
  })

  const tProps: TreeSelectProps = {
    treeData: courses
      ?.filter((course) => course.id !== courseId)
      ?.map((course) => ({
        title: course.title,
        value: course.id,
        key: course.id,
        selectable: false,
        children: course.sections.map((section) => ({
          title: section.title,
          value: section.id,
          key: section.id,
          selectable: false,
          children: section.lessons.map((lesson) => ({
            title: (
              <div className="flex justify-between pr-5">
                <span>{lesson.title}</span>
                <a
                  href={`${course.id}/lessons/${lesson.id}`}
                  target="_blank"
                  onClick={(e) => e.stopPropagation()}
                >
                  Preview
                </a>
              </div>
            ),
            value: lesson.id,
            key: lesson.id,
          })),
        })),
      })),
    maxTagCount: 'responsive',
    tagRender: (props) => {
      const { closable, onClose } = props
      const label: any = props.label

      return (
        label.props?.children[0]?.props?.children && (
          <Tag closable={closable} onClose={onClose}>
            {label.props.children[0].props.children}
          </Tag>
        )
      )
    },
    value,
    onChange,
    treeCheckable: true,
    placeholder: 'Select lesson',
    allowClear: true,
    className: 'w-full',
    loading: isLoading,
    treeDefaultExpandAll: true,
    open: isTreeSelectOpen,
    showSearch: false,
  }

  const submitLessonMutation = useMutation({
    mutationFn: (data: AddLessonRequest) => lessonApi.addLesson(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['course'] })
      message.success('Add lesson successfully')
    },
    onError: () => {
      message.error('Add lesson failed')
    },
    onSettled: () => {
      closeModal()
    },
  })

  const submitAddLesson = async () => {
    const addedLessons = []

    if (!courses) return

    for (const course of courses) {
      for (const section of course.sections) {
        for (const lesson of section.lessons) {
          if (value.includes(lesson.id)) {
            addedLessons.push({
              title: lesson.title,
              exercises: lesson.exercises,
              materials: lesson.materials,
            })
          }
        }
      }
    }

    const data = {
      courseId: courseId!,
      sectionId: sectionId,
      lessons: addedLessons,
    }

    const hideLoading = message.loading('Adding lesson...', 0)
    submitLessonMutation.mutate(data, { onSettled: hideLoading })
  }

  return (
    <Modal
      title="Add lesson from another course"
      open={isOpen}
      onCancel={closeModal}
      onOk={submitAddLesson}
      confirmLoading={submitLessonMutation.isPending}
      destroyOnClose={true}
    >
      <div className="h-[325px]">
        <TreeSelect {...tProps} />
      </div>
    </Modal>
  )
}
