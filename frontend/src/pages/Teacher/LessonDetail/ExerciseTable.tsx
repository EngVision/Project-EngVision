import { Button, Table } from 'antd'
import React from 'react'
import { BarsIcon } from '../../../components/Icons'
import { LessonType } from '../../../services/lessonApi/type'
import { Link } from 'react-router-dom'

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
        <BarsIcon
          className="float-right hover:cursor-pointer"
          onClick={() => console.log(id)}
        />
      ),
    },
  ]

  return (
    <div>
      <h4 className="mb-4 text-2xl">Exercises</h4>
      <Table
        dataSource={exerciseList}
        columns={columns}
        pagination={false}
        className="rounded-lg overflow-hidden"
      />
    </div>
  )
}

export default ExerciseTable
