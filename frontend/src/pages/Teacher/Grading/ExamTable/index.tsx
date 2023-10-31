import React from 'react'
import { Space, Table, Tag } from 'antd'
import { useNavigate } from 'react-router-dom'
import type { ColumnsType } from 'antd/es/table'
import { LEVELS } from '../../../../utils/constants'
interface DataType {
  id: string
  key: string
  exam: string
  level: string
  pending: string
  submitted: string
  createDate: string
}
const ExamTable = () => {
  const navigate = useNavigate()

  const columns: ColumnsType<DataType> = [
    {
      title: 'Exam',
      dataIndex: 'exam',
      key: 'exam',
    },
    {
      title: 'Level',
      dataIndex: 'level',
      key: 'level',
      render: (level) => {
        const levelObj = LEVELS.find((l) => l.level === level)
        return (
          <Tag className={`${levelObj?.color} text-white px-4`} key={level}>
            {level}
          </Tag>
        )
      },
    },
    {
      title: 'Create Date',
      dataIndex: 'createDate',
      key: 'createDate',
    },
    {
      title: 'Pending',
      dataIndex: 'pending',
      key: 'pending',
      render: (pending) => {
        return (
          <Tag
            className="w-[50%] flex justify-center"
            color="red"
            key={pending}
          >
            {pending}
          </Tag>
        )
      },
    },
    {
      title: 'Submitted',
      dataIndex: 'submitted',
      key: 'submitted',
      render: (submitted) => {
        return (
          <Tag
            color="green"
            className="w-[50%] flex justify-center"
            key={submitted}
          >
            {submitted}
          </Tag>
        )
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Tag
            className="cursor-pointer bg-alternative text-white"
            onClick={(e) => {
              e.preventDefault()
              navigate(`./exam/${record.id}`)
            }}
          >
            Grade
          </Tag>
        </Space>
      ),
    },
  ]
  const data: DataType[] = [
    {
      id: '1',
      key: '1',
      exam: 'IELTS Exam Strategies and Practice',
      level: 'A1',
      pending: '47',
      submitted: '123',
      createDate: '2021-09-01',
    },
    {
      id: '2',
      key: '2',
      exam: 'IELTS Exam Strategies and Practice',
      level: 'A2',
      pending: '47',
      submitted: '123',
      createDate: '2021-09-01',
    },
    {
      id: '3',
      key: '3',
      exam: 'IELTS Exam Strategies and Practice',
      level: 'C1',
      pending: '47',
      submitted: '123',
      createDate: '2021-09-01',
    },
  ]

  return <Table columns={columns} dataSource={data} />
}

export default ExamTable
