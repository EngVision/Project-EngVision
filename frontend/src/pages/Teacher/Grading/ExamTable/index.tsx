import React from 'react'
import { Table, Tag } from 'antd'
import { useNavigate } from 'react-router-dom'
import type { ColumnsType } from 'antd/es/table'
import { LEVELS } from '../../../../utils/constants'
import { ExamParams } from '../../../../services/examApi/type'

interface ExamProps {
  exams: ExamParams[]
}
const ExamTable = ({ exams }: ExamProps) => {
  const navigate = useNavigate()

  const columns: ColumnsType<ExamParams> = [
    {
      title: 'Exam',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Level',
      dataIndex: 'level',
      key: 'level',
      align: 'center',
      render: (level) => {
        const levelObj = LEVELS.find((l) => l.level === level)
        return (
          <Tag
            className={`${levelObj?.color} text-white px-6 py-1`}
            key={level}
          >
            {level}
          </Tag>
        )
      },
    },
    {
      title: 'Create Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center',
      render: (createdAt) => {
        const date = new Date(createdAt)
        const formattedDate = date.toLocaleDateString('en-GB')
        return <span>{formattedDate}</span>
      },
    },
    {
      title: 'Pending',
      dataIndex: 'pending',
      key: 'pending',
      align: 'center',
      render: (pending) => {
        return (
          <Tag
            className="px-4 py-1 text-sm font-bold"
            color="red"
            key={pending}
          >
            17
          </Tag>
        )
      },
    },
    {
      title: 'Submitted',
      dataIndex: 'submitted',
      key: 'submitted',
      align: 'center',
      render: (submitted) => {
        return (
          <Tag
            color="green"
            className="px-4 py-1 text-sm font-bold"
            key={submitted}
          >
            123
          </Tag>
        )
      },
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'action',
      align: 'center',
      render: (id) => {
        return (
          <Tag
            className="cursor-pointer bg-alternative font-bold text-white px-4 py-1 hover:bg-alternativeHover"
            // onClick={(e) => {
            //   e.preventDefault()
            //   navigate(`./exam/${id}`)
            // }}
          >
            Grade Now
          </Tag>
        )
      },
    },
  ]

  return <Table columns={columns} dataSource={exams} />
}

export default ExamTable
