import { Button, Form, Table } from 'antd'
import { ExerciseType } from '../../../utils/constants'
import type { ColumnsType } from 'antd/es/table'
import MoreVertical from '../../../components/Icons/MoreVertical'
import { examApi } from '../../../services/examApi'
import { useEffect, useState } from 'react'

interface ExamInfo {
  type?: ExerciseType
  title: string
  description: string
}

const columns: ColumnsType<ExamInfo> = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: <Button type="primary">Add new</Button>,
    key: 'action',
    render: () => (
      <a className="flex justify-center">
        <MoreVertical />
      </a>
    ),
    width: '5%',
  },
]

const data: ExamInfo[] = [
  {
    title: 'Exam 1',
    description: 'This is exam 1',
  },
  {
    title: 'Exam 2',
    description: 'This is exam 2',
  },
  {
    title: 'Exam 3',
    description: 'This is exam 3',
  },
  {
    title: 'Exam 4',
    description: 'This is exam 4',
  },
  {
    title: 'Exam 5',
    description: 'This is exam 5',
  },
  {
    title: 'Exam 6',
    description: 'This is exam 6',
  },
]

const ManageExam = () => {
  const [exams, setExams] = useState<ExamInfo[]>([])

  const fetchExams = async () => {
    try {
      const courses: any = await examApi.getExam()
      setExams(courses.data)
      console.log(courses.data)
    } catch (error) {
      console.error('Error fetching courses:', error)
    }
  }

  useEffect(() => {
    fetchExams()
  }, [])

  const exam = (data?: any) => {
    return (
      <>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 5 }}
        />
      </>
    )
  }

  return (
    <>
      <Form>
        <div>
          <h1 className="text-2xl font-bold my-2">Part</h1>
          <div>{exam(data)}</div>
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-2">Test</h1>
          <div>{exam()}</div>
        </div>
      </Form>
    </>
  )
}

export default ManageExam
