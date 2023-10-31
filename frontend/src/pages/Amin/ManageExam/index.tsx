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

interface ExamInfo {
  id: string
  title: string
  description: string
}

const ManageExam = () => {
  const navigate = useNavigate()
  const [titleNotiModal, setTitleNotiModal] = useState('')
  const [descriptionNotiModal, setDescriptionNotiModal] = useState('')
  const [exams, setExams] = useState<ExamInfo[]>([])
  const [parts, setParts] = useState<ExerciseSchema[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentExam, setCurrentExam] = useState<ExamInfo | null>(null)
  const [currentExercise, setCurrentExercise] = useState<ExerciseSchema | null>(
    null,
  )

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

  useEffect(() => {
    fetchExams()
    fetchExercises()
  }, [])

  const fetchExams = async () => {
    try {
      const data: any = await examApi.getExam()
      setExams(data.data)
    } catch (error) {
      console.error('Error fetching exams:', error)
    }
  }

  const fetchExercises = async () => {
    try {
      const allDataParts: ExerciseSchema[] = await exerciseApi.getAllExercise()
      setParts(allDataParts)
      console.log(allDataParts)
    } catch (error) {
      console.error('Error fetching exercises:', error)
    }
  }

  const columnsExam: ColumnsType<ExamInfo> = [
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
        <Link to="./edit-exam">
          <Button type="primary">Add new</Button>
        </Link>
      ),
      key: 'action',
      render: (record) => (
        <a className="flex justify-end">
          <Dropdown
            menu={{ items, onClick: (e) => handleExamMenuClick(e, record) }}
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

  const renderTable = (data: ExerciseSchema[] | ExamInfo[]) => {
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
          columns={columnsExam}
          dataSource={data as ExamInfo[]}
          pagination={{ pageSize: 5 }}
        />
      )
    }
  }

  const NotiModal = (title: any, description: any) => {
    return (
      <Modal
        title={title}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>{description}</p>
      </Modal>
    )
  }

  const showModalExam = (exam: ExamInfo) => {
    setIsModalOpen(true)
    setTitleNotiModal('Delete Exam')
    setDescriptionNotiModal('Are you sure you want to delete this exam?')
    setCurrentExam(exam)
  }

  const showModalPart = (part: ExerciseSchema) => {
    setIsModalOpen(true)
    setTitleNotiModal('Delete Part')
    setDescriptionNotiModal('Are you sure you want to delete this exercise?')
    setCurrentExercise(part)
  }

  const handleOk = async () => {
    if (titleNotiModal === 'Delete Exam') {
      await examApi.deleteExam(currentExam?.id as string)
      fetchExams()
    } else if (titleNotiModal === 'Delete Part') {
      await exerciseApi.deleteExercise(currentExercise?.id as string)
      fetchExercises()
    }

    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleExamMenuClick = (e: any, record: ExamInfo) => {
    if (e.key === 'edit') {
      navigate(ADMIN_ROUTES.editExam, { state: { record: record } })
    }
    if (e.key === 'remove') {
      showModalExam(record)
    }
  }

  const handlePartMenuClick = (e: any, exercise: ExerciseSchema) => {
    if (e.key === 'edit') {
      navigate(ADMIN_ROUTES.editPart, { state: { record: exams } })
    }
    if (e.key === 'remove') {
      showModalPart(exercise)
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
          <h1 className="text-2xl font-bold mb-2">Exam</h1>
          <div>{renderTable(exams)}</div>
        </div>
      </Form>
      <NotiModal title={titleNotiModal} description={descriptionNotiModal} />
    </>
  )
}

export default ManageExam
