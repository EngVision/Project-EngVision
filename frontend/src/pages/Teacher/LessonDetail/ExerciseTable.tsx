import { Button, Popover, Table } from 'antd'
import React, { useContext } from 'react'
import { BarsIcon } from '../../../components/Icons'
import { LessonType } from '../../../services/lessonApi/type'
import { Link, useParams } from 'react-router-dom'
import coursesApi from '../../../services/coursesApi'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { NotificationContext } from '../../../contexts/notification'
import { ExerciseSchema } from '../../../services/exerciseApi/types'
import { useTranslation } from 'react-i18next'

interface ExerciseTableProps {
  exerciseList: ExerciseSchema[]
}

const ExerciseTable = ({ exerciseList }: ExerciseTableProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'EditLesson' })
  const { lessonId = '' } = useParams()
  const apiNotification = useContext(NotificationContext)
  const queryClient = useQueryClient()

  const deleteCourseMutation = useMutation({
    mutationFn: (exerciseId: string) =>
      coursesApi.removeExercise(lessonId, exerciseId),
  })

  const handleDeleteExercise = async (id: string) => {
    deleteCourseMutation.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['lesson'] })
        apiNotification.success({ message: 'Delete successfully.' })
      },
    })
  }

  const columns: any[] = [
    {
      title: t('Title'),
      dataIndex: 'title',
      width: '30%',
      className: '!px-6 !py-6',
    },
    {
      title: t('Description'),
      dataIndex: 'description',
      className: '!px-6 !py-6',
    },
    {
      title: (
        <Link to="exercises">
          <Button type="primary" className="float-right">
            {t('Add new')}
          </Button>
        </Link>
      ),
      dataIndex: '',
      width: '140px',
      className: '!px-6 !py-6',
      render: (_: any, { id }: LessonType) => (
        <Popover
          content={
            <div className="flex flex-col gap-1 py-2 min-w-[100px]">
              <Link to={`exercises/${id}`}>
                <Button type="text" className="w-full text-left">
                  {t('Edit')}
                </Button>
              </Link>
              <Button
                type="text"
                className="w-full text-left"
                onClick={async () => handleDeleteExercise(id)}
                loading={deleteCourseMutation.isPending}
              >
                {t('Delete')}
              </Button>
            </div>
          }
          trigger="click"
          placement="bottomRight"
        >
          <BarsIcon
            className="float-right hover:cursor-pointer"
            width={20}
            height={20}
          />
        </Popover>
      ),
    },
  ]

  return (
    <div>
      <h4 className="mb-4 text-2xl">{t('Exercises')}</h4>
      <Table
        dataSource={exerciseList.map((exercise) => ({
          ...exercise,
          key: exercise.id,
        }))}
        columns={columns}
        pagination={false}
        className="rounded-lg overflow-hidden"
      />
    </div>
  )
}

export default ExerciseTable
