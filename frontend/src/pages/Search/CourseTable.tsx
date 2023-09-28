import { Avatar, Table, Tag } from 'antd'
import React from 'react'

const CourseTable = () => {
  const data: any[] = [
    {
      key: '1',
      avatar: 'Luc',
      courseTitle: 'Grammar exercise',
      courseDescription: 'Thanh Luc',
      lessons: 3,
      hours: 1,
      students: 2,
      level: 'B1',
      rated: 4.9,
    },
    {
      key: '2',
      avatar: 'Tri',
      courseTitle: 'Grammar exercise',
      courseDescription: 'Minh Tri',
      lessons: 3,
      hours: 1,
      students: 2,
      level: 'C1',
      rated: 4.7,
    },
  ]

  const COLUMNS: any = [
    {
      title: 'Courses',
      dataIndex: 'courses',
      key: 'courses',
      width: 400,
      render: (_: any, { avatar, courseTitle, courseDescription }: any) => (
        <div className="flex gap-2 items-center">
          <Avatar size="default">{avatar}</Avatar>

          <div className="flex flex-col">
            <h4>{courseTitle}</h4>
            <span>{courseDescription}</span>
          </div>
        </div>
      ),
    },
    {
      title: 'Lessons',
      dataIndex: 'lessons',
      key: 'lessons',
      width: 100,
    },
    {
      title: 'Hours',
      dataIndex: 'hours',
      key: 'hours',
      width: 100,
    },
    {
      title: 'Students',
      dataIndex: 'students',
      key: 'students',
      width: 100,
    },
    {
      title: 'Level',
      dataIndex: 'level',
      key: 'level',
      width: 100,
      render: (_: any, { level }: any) => <Tag color="processing">{level}</Tag>,
    },
    {
      title: 'Rated',
      dataIndex: 'rated',
      key: 'rated',
      width: 100,
      render: (_: any, { rated }: any) => <Tag color="processing">{rated}</Tag>,
    },
  ]

  return (
    <Table
      dataSource={data}
      columns={COLUMNS}
      className="w-full"
      pagination={false}
    />
  )
}

export default CourseTable
