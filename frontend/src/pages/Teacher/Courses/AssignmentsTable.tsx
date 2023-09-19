import { Avatar, Table } from 'antd'
import React from 'react'

interface DataType {
  key: React.Key
  name: string
  avatar: string
  status: string
  category: string
  level: string
  homework: string
  submitAt: string
  score: number | string
}

const AssignmentsTable = () => {
  const data: DataType[] = [
    {
      key: '1',
      name: 'Thanh Luc',
      avatar:
        'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80',
      status: 'CEFR',
      category: 'Listening',
      level: 'A2',
      homework: 'Introduction to Listening',
      submitAt: 'A minute ago',
      score: 10,
    },
    {
      key: '2',
      name: 'Thanh Luc',
      avatar:
        'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80',
      status: 'CEFR',
      category: 'Listening',
      level: 'A2',
      homework: 'Introduction to Listening',
      submitAt: 'A minute ago',
      score: 10,
    },
    {
      key: '3',
      name: 'Thanh Luc',
      avatar:
        'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80',
      status: 'CEFR',
      category: 'Listening',
      level: 'A2',
      homework: 'Introduction to Listening',
      submitAt: 'A minute ago',
      score: 10,
    },
  ]

  const COLUMNS: any = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 100,
      render: (_: any, { name, avatar, status }: DataType) => {
        return (
          <div className="flex gap-2 items-center">
            <Avatar size="default" src={avatar} />
            <div className="flex flex-col">
              <span className="font-semibold">{name}</span>
              <span className="text-[12px] text-textSubtle">{status}</span>
            </div>
          </div>
        )
      },
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      width: 100,
    },
    {
      title: 'Level',
      dataIndex: 'level',
      key: 'level',
      width: 100,
    },
    {
      title: 'Homework',
      dataIndex: 'homework',
      key: 'homework',
      width: 100,
    },
    {
      title: 'Submit at',
      dataIndex: 'submitAt',
      key: 'submitAt',
      width: 100,
    },
    {
      title: 'Score',
      dataIndex: 'score',
      key: 'score',
      width: 100,
    },
  ]

  return (
    <div className="py-5">
      <h5 className="text-[24px] mb-6">Assignments</h5>
      <Table
        dataSource={data}
        columns={COLUMNS}
        className="w-full"
        pagination={false}
      />
    </div>
  )
}

export default AssignmentsTable
