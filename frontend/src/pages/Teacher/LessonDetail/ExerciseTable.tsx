import { Button, Popover, Table, message } from 'antd'
import React from 'react'
import { BarsIcon } from '../../../components/Icons'
import { LessonType } from '../../../services/lessonApi/type'
import { Link, useParams } from 'react-router-dom'
import coursesApi from '../../../services/coursesApi'

interface ExerciseType {
  key: React.Key
  id: string
  title: string
  description: string
}

interface ExerciseTableProps {
  exerciseList: ExerciseType[]
}

const ExerciseTable = ({ exerciseList }: ExerciseTableProps) => {
  const { lessonId } = useParams()

  const handleDeleteExercise = async (id: string) => {
    try {
      await coursesApi.removeExercise(lessonId as string, id)
      message.success(`Delete successfully.`)
    } catch (error) {
      console.log('error: ', error)
    }
  }

  const columns: any[] = [
    {
      title: 'Title',
      dataIndex: 'title',
      width: '30%',
      className: '!px-6 !py-6',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      className: '!px-6 !py-6',
    },
    {
      title: (
        <Link to="exercises">
          <Button type="primary" className="float-right">
            Add new
          </Button>
        </Link>
      ),
      dataIndex: '',
      width: '140px',
      className: '!px-6 !py-6',
      render: (_: any, { id }: LessonType) => (
        <Popover
          content={
            <div className="flex flex-col gap-1">
              <Link to={`exercises/${id}`}>
                <Button type="text" className="w-full text-left">
                  Edit
                </Button>
              </Link>
              <Button
                type="text"
                onClick={async () => handleDeleteExercise(id)}
              >
                Delete
              </Button>
            </div>
          }
          trigger="click"
          placement="bottom"
        >
          <BarsIcon className="float-right hover:cursor-pointer" />
        </Popover>
      ),
    },
  ]

  return (
    <div>
      <h4 className="mb-4 text-2xl">Exercises</h4>
      <Table
        dataSource={[
          ...exerciseList,
          { key: 1, id: 1, title: 'test', description: 'test' },
        ]}
        columns={columns}
        pagination={false}
        className="rounded-lg overflow-hidden"
      />
    </div>
  )
}

export default ExerciseTable
