import { Button, Dropdown, Form, Modal, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MoreVertical from '../../../components/Icons/MoreVertical'
import PencilLine from '../../../components/Icons/PencilLine'
import Trash from '../../../components/Icons/Trash'
import { examApi } from '../../../services/examApi'
import exerciseApi from '../../../services/exerciseApi'
import { ExerciseSchema } from '../../../services/exerciseApi/types'
import { ADMIN_ROUTES } from '../../../utils/constants'

interface TestInfo {
  id: string
  title: string
  description: string
}

const ManageExam = () => {
  const navigate = useNavigate()
  const [tests, setTests] = useState<TestInfo[]>([])
  const [parts, setParts] = useState<ExerciseSchema[]>([])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentTest, setCurrentTest] = useState<TestInfo | null>(null)

  const items = [
    {
      icon: <PencilLine />,
      key: 'edit',
      label: 'Edit',
    },
    {
      icon: <Trash />,
      key: 'remove',
      label: 'Remove',
    },
  ]

  const fetchExams = async () => {
    try {
      const data: any = await examApi.getExam()
      setTests(data.data)

      const allDataParts: ExerciseSchema[] = []
      for (let i = 0; i < data.data.length; i++) {
        for (let j = 0; j < data.data[i].parts.length; j++) {
          const dataPart = await exerciseApi.getExercise(data.data[i].parts[j])
          allDataParts.push(dataPart)
        }
      }

      setParts(allDataParts)
    } catch (error) {
      console.error('Error fetching courses:', error)
    }
  }

  useEffect(() => {
    fetchExams()
  }, [])

  const columnsTest: ColumnsType<TestInfo> = [
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
      title: (
        <Link to="./edit-test">
          <Button type="primary">Add new</Button>
        </Link>
      ),
      key: 'action',
      render: (record) => (
        <a className="flex justify-end">
          <Dropdown
            menu={{ items, onClick: (e) => handleTestMenuClick(e, record) }}
            className=" text-textColor hover:cursor-pointer hover:text-primary rounded-[12px]"
          >
            <span onClick={(e) => e.preventDefault()} role="presentation">
              <MoreVertical />
            </span>
          </Dropdown>
        </a>
      ),
      width: '5%',
    },
  ]

  const columnsPart: ColumnsType<ExerciseSchema> = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Part Format',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: (
        <Link to={ADMIN_ROUTES.createPart}>
          <Button type="primary">Add new</Button>
        </Link>
      ),
      key: 'action',
      render: (record) => (
        <a className="flex justify-end">
          <Dropdown
            menu={{ items, onClick: (e) => handlePartMenuClick(e, record) }}
            className=" text-textColor hover:cursor-pointer hover:text-primary rounded-[12px]"
          >
            <span onClick={(e) => e.preventDefault()} role="presentation">
              <MoreVertical />
            </span>
          </Dropdown>
        </a>
      ),
      width: '5%',
    },
  ]

  const renderTable = (data: ExerciseSchema[] | TestInfo[]) => {
    if (Array.isArray(data) && data.length > 0 && 'type' in data[0]) {
      return (
        <Table
          columns={columnsPart}
          dataSource={data as ExerciseSchema[]}
          pagination={{ pageSize: 5 }}
        />
      )
    } else {
      return (
        <Table
          columns={columnsTest}
          dataSource={data as TestInfo[]}
          pagination={{ pageSize: 5 }}
        />
      )
    }
  }

  const showModal = (record: any) => {
    setIsModalOpen(true)
    setCurrentTest(record)
  }

  const handleOk = async () => {
    await examApi.deleteExam(currentTest?.id as string)
    fetchExams()
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleTestMenuClick = (e: any, record: TestInfo) => {
    if (e.key === 'edit') {
      console.log(record)
      navigate(ADMIN_ROUTES.editTest, { state: { record: record } })
    }
    if (e.key === 'remove') {
      showModal(record)
    }
  }

  const handlePartMenuClick = (e: any, exercise: ExerciseSchema) => {
    if (e.key === 'edit') {
      navigate(ADMIN_ROUTES.editPart, { state: { record: tests } })
    }
    if (e.key === 'remove') {
      showModal(exercise)
    }
  }

  return (
    <>
      <Form>
        <div>
          <h1 className="text-2xl font-bold my-2">Part</h1>
          <div>{renderTable(parts)}</div>
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-2">Test</h1>
          <div>{renderTable(tests)}</div>
        </div>
      </Form>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Do you really want to delete this test ?</p>
      </Modal>
    </>
  )
}

export default ManageExam
