import { Table, Tag, Avatar } from 'antd'
import React from 'react'

const GeneralTable = () => {
  const data: any[] = [
    {
      key: '1',
      homeworkTitle: 'Grammar exercise',
      homeworkDescription: 'Homework grammar and composition',
      duedate: '20/5/2023',
      section: 3,
      unit: 1,
      no: 2,
      skill: 'Speaking',
      type: 'Multiple choice',
    },
    {
      key: '2',
      homeworkTitle: 'Grammar exercise',
      homeworkDescription: 'Homework grammar and composition',
      duedate: '20/5/2023',
      section: 3,
      unit: 1,
      no: 2,
      skill: 'Speaking',
      type: 'Multiple choice',
    },
    {
      key: '3',
      homeworkTitle: 'Grammar exercise',
      homeworkDescription: 'Homework grammar and composition',
      duedate: '20/5/2023',
      section: 3,
      unit: 1,
      no: 2,
      skill: 'Speaking',
      type: 'Multiple choice',
    },
  ]

  const COLUMNS: any = [
    {
      title: 'Homework title',
      dataIndex: 'homeworkTitle',
      key: 'homeworkTitle',
      width: 400,
      render: (_: any, { homeworkTitle, homeworkDescription }: any) => (
        <div className="flex gap-2 items-center">
          <Avatar size="default">Kiet</Avatar>

          <div className="flex flex-col">
            <h4>{homeworkTitle}</h4>
            <span>{homeworkDescription}</span>
          </div>
        </div>
      ),
    },
    {
      title: 'Due date',
      dataIndex: 'duedate',
      key: 'duedate',
      width: 100,
    },
    {
      title: 'Section',
      dataIndex: 'section',
      key: 'section',
      width: 100,
    },
    {
      title: 'Unit',
      dataIndex: 'unit',
      key: 'unit',
      width: 100,
    },
    {
      title: 'No.',
      dataIndex: 'no',
      key: 'no',
      width: 100,
    },
    {
      title: 'Skill',
      dataIndex: 'skill',
      key: 'skill',
      width: 100,
      render: (_: any, { skill }: any) => <Tag color="processing">{skill}</Tag>,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: 100,
      render: (_: any, { type }: any) => <Tag color="processing">{type}</Tag>,
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

export default GeneralTable
