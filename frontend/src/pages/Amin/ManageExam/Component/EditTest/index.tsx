import {
  Button,
  Dropdown,
  Form,
  Input,
  Modal,
  Select,
  Table,
  notification,
} from 'antd'

import { ColumnsType } from 'antd/es/table'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import MoreVertical from '../../../../../components/Icons/MoreVertical'
import PencilLine from '../../../../../components/Icons/PencilLine'
import Trash from '../../../../../components/Icons/Trash'
import { examApi } from '../../../../../services/examApi'
import { ExamParams } from '../../../../../services/examApi/type'
import exerciseApi from '../../../../../services/exerciseApi'
import { ExerciseSchema } from '../../../../../services/exerciseApi/types'
import { ADMIN_ROUTES, CEFRLevel } from '../../../../../utils/constants'
import enumToSelectOptions from '../../../../../utils/enumsToSelectOptions'
import More from '../../../../../components/Icons/More'

interface TestInfo {
  id: string
  title: string
  description: string
}

type NotificationType = 'success' | 'info' | 'warning' | 'error'

const EditTest = () => {
  const { TextArea } = Input
  const location = useLocation()
  const navigate = useNavigate()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [api, contextHolder] = notification.useNotification()
  const [isReuseButton, setIsReuseButton] = useState(false)
  const [tests, setTests] = useState<TestInfo[]>([])
  const [parts, setParts] = useState<ExerciseSchema[]>([])
  const [currentPart, setCurrentPart] = useState<ExerciseSchema | null>(null)

  const { record } = (location.state as { record: ExamParams } | null) ?? {
    record: null,
  }

  const openNotificationWithIcon = (
    type: NotificationType,
    description: string,
  ) => {
    api[type](
      type === 'success'
        ? {
            message: 'Successfully',
            description: [description],
          }
        : {
            message: 'Failed',
            description: [description],
          },
    )
  }

  const itemsAction = [
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

  const itemsMore = [
    {
      label: 'Add new',
      key: 'addnew',
    },
    {
      label: 'Reuse',
      key: 'reuse',
    },
  ]

  const getExercise = async () => {
    if (!record && isReuseButton) {
      try {
        const data: any = await examApi.getExam()
        setTests(data.data)

        const allDataParts: ExerciseSchema[] =
          await exerciseApi.getAllExercise()

        setParts(allDataParts)
      } catch (error) {
        console.error('Error fetching courses:', error)
      }
    } else if (record) {
      const data: any = await examApi.getExamById(record.id as string)
      setTests(data)
      console.log(data)

      const allDataParts: ExerciseSchema[] = []
      for (let i = 0; i < data.parts.length; i++) {
        allDataParts.push(data.parts[i])
      }
      setParts(allDataParts)
      console.log(allDataParts)
    }
  }

  useEffect(() => {
    getExercise()
  }, [isReuseButton])

  const showModal = (record: any) => {
    setIsModalOpen(true)
    if (record.type === 'part') {
      setCurrentPart(record)
    }
  }

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
      title: () => (
        <Dropdown
          menu={{
            items: itemsMore,
            onClick: (e) => handleMoreMenuClick(e),
          }}
          className=" text-textColor hover:cursor-pointer hover:text-primary rounded-[12px]"
        >
          <span onClick={(e) => e.preventDefault()} role="presentation">
            <More />
          </span>
        </Dropdown>
      ),
      key: 'action',
      render: (exercise) => (
        <a className="flex justify-end">
          <Dropdown
            menu={{
              items: itemsAction,
              onClick: (e) => handlePartMenuClick(e, exercise),
            }}
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

  const generalIn4 = () => {
    return (
      <div className="flex flex-col">
        <div className=" flex flex-row gap-6">
          <Form.Item<ExamParams> name="title" className="flex-1">
            <Input
              size="large"
              placeholder="Title"
              defaultValue={record?.title as string}
              className="w-[100%] shadow-sm border-slate-300 hover:border-slate-40 rounded-md"
            />
          </Form.Item>
          <Form.Item<ExamParams> name="level" className="flex-1">
            <Select
              className="shadow-sm"
              size="large"
              placeholder="Default Level"
              defaultValue={record?.level as string}
              options={enumToSelectOptions(CEFRLevel)}
            />
          </Form.Item>
        </div>
        <div className=" flex flex-row gap-6">
          <Form.Item<ExamParams> name="description" className="flex-1">
            <TextArea
              size="large"
              placeholder="Description"
              defaultValue={record?.description as string}
              className="w-[100%] shadow-sm border-slate-300 hover:border-slate-40 rounded-md"
            />
          </Form.Item>
        </div>
      </div>
    )
  }

  const renderTable = (data: ExerciseSchema[]) => {
    return (
      <Table
        columns={columnsPart}
        dataSource={data as ExerciseSchema[]}
        pagination={{ pageSize: 5 }}
      />
    )
  }

  const handleOk = async (data: any) => {
    if (data.type === 'test') {
      await examApi.deleteExam(data?.id as string)
    } else if (data.type === 'part') {
      try {
        await exerciseApi.deleteExercise(currentPart?.id as string)
        getExercise()
        openNotificationWithIcon('success', 'Delete successfully.')
      } catch (error) {
        openNotificationWithIcon(
          'error',
          "Delete fail. You can't delete this exercise",
        )
      }
    }
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handlePartMenuClick = (e: any, exercise: ExerciseSchema) => {
    if (e.key === 'edit') {
      navigate(ADMIN_ROUTES.editPart, { state: { record: tests } })
    }
    if (e.key === 'remove') {
      showModal(exercise)
    }
  }

  const handleMoreMenuClick = (e: any) => {
    if (e.key === 'addnew') {
      navigate(ADMIN_ROUTES.createPart)
    }
    if (e.key === 'reuse') {
      setIsReuseButton(true)
    }
  }

  const onFinish = async (values: ExamParams) => {
    values.parts = parts
      .map((part) => part.id)
      .filter((id) => id !== undefined) as string[]

    console.log(values)
    try {
      if (record) {
        await examApi.updateExam(record.id as string, values)
        openNotificationWithIcon('success', 'Update exam successfully.')
      } else {
        await examApi.createExam(values)
        openNotificationWithIcon('success', 'Create new exam successfully.')
      }
    } catch (error) {
      openNotificationWithIcon('error', 'Create new exam fail.')
    }
  }

  const handleDelTest = async () => {
    showModal(record)
  }

  return (
    <>
      {contextHolder}
      <Form onFinish={onFinish}>
        <div>
          <h1 className="text-2xl font-bold my-2">General</h1>
          <div>{generalIn4()}</div>
        </div>
        <div>
          <h1 className="text-2xl font-bold my-2">Part</h1>
          <div>{renderTable(parts)}</div>
        </div>
        <div className="flex flex-row mt-2">
          <div className="flex flex-1 gap-4">
            <Button
              type="primary"
              danger
              htmlType="button"
              onClick={() => handleDelTest()}
            >
              Delete
            </Button>
            <Link to={ADMIN_ROUTES.exams}>
              <Button type="primary" ghost>
                Cancel
              </Button>
            </Link>
          </div>
          <Button type="primary" htmlType="submit" className="flex">
            Save and Publish
          </Button>
        </div>
      </Form>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Do you really want to delete this ?</p>
      </Modal>
    </>
  )
}

export default EditTest
