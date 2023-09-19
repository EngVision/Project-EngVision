import { Table } from 'antd'
import React from 'react'

interface DataType {
  key: React.Key
  name: string
  category: string
  level: string
  attendants: number
  lessons: number
  homework: number
}

const YourCourses = () => {
  const data: DataType[] = [
    {
      key: '1',
      name: 'Thanh Luc',
      category: 'Listening',
      level: 'A2',
      attendants: 32,
      lessons: 25,
      homework: 1,
    },
    {
      key: '2',
      name: 'Thanh Luc',
      category: 'Listening',
      level: 'A2',
      attendants: 32,
      lessons: 25,
      homework: 1,
    },
    {
      key: '3',
      name: 'Thanh Luc',
      category: 'Listening',
      level: 'A2',
      attendants: 32,
      lessons: 25,
      homework: 1,
    },
  ]

  const COLUMNS: any = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 100,
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
      title: 'Attendants',
      dataIndex: 'attendants',
      key: 'attendants',
      width: 100,
    },
    {
      title: 'Lessons',
      dataIndex: 'lessons',
      key: 'lessons',
      width: 100,
      render: (item: number) => (
        <div>{`${item} lesson${item > 1 ? 's' : ''}`}</div>
      ),
    },
    {
      title: 'Homework',
      dataIndex: 'homework',
      key: 'homework',
      width: 100,
      render: (item: number) => (
        <div>{item > 0 ? `${item} incoming` : 'None'}</div>
      ),
    },
  ]

  return (
    <div className="py-5">
      <h5 className="text-[24px] mb-6">Your courses</h5>
      <Table
        dataSource={data}
        columns={COLUMNS}
        className="w-full"
        pagination={false}
      />
    </div>
  )
}

export default YourCourses
