import { Button, Form, Table } from 'antd'

import { ColumnsType } from 'antd/es/table'
import MoreVertical from '../../../../../components/Icons/MoreVertical'
import { ExerciseType } from '../../../../../utils/constants'

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
      <a className="flex justify-end">
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
const EditPart = () => {
  const generalIn4 = () => {
    return (
      <div className="flex flex-col">
        <div className=" flex flex-row gap-6">
          <Form.Item className="flex-1">
            <Input
              size="large"
              placeholder="Title"
              className="w-[100%] shadow-sm border-slate-300 hover:border-slate-40 rounded-md"
            />
          </Form.Item>
          <Form.Item className="flex-1">
            <Input
              size="large"
              placeholder="Description"
              className="w-[100%] shadow-sm border-slate-300 hover:border-slate-40 rounded-md"
            />
          </Form.Item>
        </div>
        <div className=" flex flex-row gap-6">
          <Form.Item className="flex-1">
            <Select
              className="shadow-sm"
              size="large"
              placeholder="Default Tag"
              options={enumToSelectOptions(ExerciseTag)}
            />
          </Form.Item>
          <Form.Item className="flex-1">
            <Select
              className="shadow-sm"
              size="large"
              placeholder="Default Level"
              options={enumToSelectOptions(CEFRLevel)}
            />
          </Form.Item>
        </div>
      </div>
    )
  }

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
      </Form>
    </>
  )
}

export default EditPart
