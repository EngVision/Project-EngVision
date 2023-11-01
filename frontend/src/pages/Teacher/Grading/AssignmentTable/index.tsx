import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Table, Tag, Space, Avatar } from 'antd'
import type { ColumnsType } from 'antd/es/table'
interface DataType {
  id: string
  key: string
  name: string
  section: string
  lesson: string
  index: string
  type: string
  submitDate: string
  grade: number | null
  status: boolean
  createDate: string
}
const AssignmentTable = () => {
  const navigate = useNavigate()
  const params = useParams()

  if (params.courseID) {
    console.log('course')
  } else {
    console.log('exam')
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => (
        <Space size="middle">
          <Avatar size="large" className="bg-primary">
            {text.charAt(0)}
          </Avatar>
          <span>{text}</span>
        </Space>
      ),
    },
    { title: 'Section', dataIndex: 'section', key: 'section', align: 'center' },
    { title: 'Lesson', dataIndex: 'lesson', key: 'lesson', align: 'center' },
    { title: 'Index', dataIndex: 'index', key: 'index', align: 'center' },
    { title: 'Type', dataIndex: 'type', key: 'type' },
    {
      title: 'Submit Date',
      dataIndex: 'submitDate',
      key: 'submitDate',
      align: 'center',
    },
    {
      title: 'Grade',
      dataIndex: 'grade',
      key: 'grade',
      align: 'center',
      render: (grade) =>
        grade ? (
          <Tag className="bg-alternative text-white text-base px-4">
            {grade}/10
          </Tag>
        ) : (
          <Tag className="bg-[#D3D3D3] text-white text-base px-4">.../10</Tag>
        ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) =>
        status ? (
          <Tag
            color="blue"
            className="text-base px-4 w-1/2 flex justify-center"
          >
            Submitted
          </Tag>
        ) : (
          <Tag
            color="green"
            className="text-base px-4 w-1/2 flex justify-center"
          >
            Pending
          </Tag>
        ),
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Tag
          className="cursor-pointer bg-alternative text-white px-4 py-1"
          onClick={(e) => {
            e.preventDefault()
            navigate(`./${record.id}`)
          }}
        >
          Grade
        </Tag>
      ),
    },
  ]
  const data: DataType[] = [
    {
      id: '1',
      key: '1',
      name: 'John Brown',
      section: '1',
      lesson: '1',
      index: '1',
      type: 'Exam',
      submitDate: '2021-09-01',
      grade: 9.33,
      status: true,
      createDate: '2021-09-01',
    },
    {
      id: '2',
      key: '2',
      name: 'Jim Green',
      section: '1',
      lesson: '1',
      index: '1',
      type: 'Exam',
      submitDate: '2021-09-01',
      grade: 9.33,
      status: true,
      createDate: '2021-09-01',
    },
    {
      id: '3',
      key: '3',
      name: 'Joe Black',
      section: '1',
      lesson: '1',
      index: '1',
      type: 'Exam',
      submitDate: '2021-09-01',
      grade: null,
      status: false,
      createDate: '2021-09-01',
    },
  ]

  return (
    <>
      <h3 className="text-primary text-2xl mb-4">
        Grading Assignment for IELTS Exam Strategies and Practice
      </h3>
      <Table columns={columns} dataSource={data} />
    </>
  )
}

export default AssignmentTable
