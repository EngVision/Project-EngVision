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

import { useQuery } from '@tanstack/react-query'
import { ColumnsType } from 'antd/es/table'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import More from '../../../../../components/Icons/More'
import MoreVertical from '../../../../../components/Icons/MoreVertical'
import PencilLine from '../../../../../components/Icons/PencilLine'
import Trash from '../../../../../components/Icons/Trash'
import AppLoading from '../../../../../components/common/AppLoading'
import { examApi } from '../../../../../services/examApi'
import { ExamParams } from '../../../../../services/examApi/type'
import exerciseApi from '../../../../../services/exerciseApi'
import { ExerciseSchema } from '../../../../../services/exerciseApi/types'
import { ADMIN_ROUTES, CEFRLevel } from '../../../../../utils/constants'
import enumToSelectOptions from '../../../../../utils/enumsToSelectOptions'

type NotificationType = 'success' | 'info' | 'warning' | 'error'

const ExamDetail = () => {
  const { examId = '' } = useParams<{ examId: string }>()
  const { TextArea } = Input
  const navigate = useNavigate()

  const [useExamDetail, setExamDetail] = useState<ExamParams | null>(null)
  const [isReuseModalOpen, setIsReuseModalOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [api, contextHolder] = notification.useNotification()
  const [currentPart, setCurrentPart] = useState<ExerciseSchema | null>(null)
  const [currentExam, setCurrentExam] = useState<ExamParams | null>(null)
  const [dataPart, setDataPart] = useState<ExerciseSchema[] | null>(null)
  const [dataPartModal, setDataPartModal] = useState<ExerciseSchema[] | null>(
    null,
  )
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([])

  const { isLoading } = useQuery({
    queryKey: ['examDetail', examId],
  })

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const examData = await examApi.getExamById(examId)
        console.log(examData, 'examData')
        setExamDetail(examData)
        setDataPart(examData?.parts as ExerciseSchema[])

        const data: any = await exerciseApi.getAllExercise()
        data.forEach((part: any) => {
          part.key = part.id
          part._id = part.id
        })
        setDataPartModal(data)
      } catch (error) {
        console.error('Error fetching exercises:', error)
      }
    }
    fetchExercises()
  }, [])

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

  const showModal = (record: any, type: string) => {
    setIsModalOpen(true)
    if (type === 'part') {
      setCurrentPart(record)
      setCurrentExam(null)
    } else if (type === 'exam') {
      setCurrentExam(record)
      setCurrentPart(null)
    }
  }

  const showModalReuse = async () => {
    setIsReuseModalOpen(true)
  }

  const columnsPart: ColumnsType<ExerciseSchema> = [
    {
      title: 'Id',
      dataIndex: '_id',
      key: '_id',
    },
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

  const columnsPartModal: ColumnsType<ExerciseSchema> = [
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
  ]

  const generalIn4 = () => {
    return (
      useExamDetail && (
        <div className="flex flex-col">
          <div className=" flex flex-row gap-6">
            <Form.Item<ExamParams> name="title" className="flex-1">
              <Input
                size="large"
                placeholder="Title"
                defaultValue={useExamDetail.title as string}
                className="w-[100%] shadow-sm border-slate-300 hover:border-slate-40 rounded-md"
              />
            </Form.Item>
            <Form.Item<ExamParams> name="level" className="flex-1">
              <Select
                className="shadow-sm"
                size="large"
                placeholder="Default Level"
                defaultValue={useExamDetail.level as string}
                options={enumToSelectOptions(CEFRLevel)}
              />
            </Form.Item>
          </div>
          <div className=" flex flex-row gap-6">
            <Form.Item<ExamParams> name="description" className="flex-1">
              <TextArea
                size="large"
                placeholder="Description"
                defaultValue={useExamDetail.description as string}
                className="w-[100%] shadow-sm border-slate-300 hover:border-slate-40 rounded-md"
              />
            </Form.Item>
          </div>
        </div>
      )
    )
  }

  const renderTable = (data: any) => {
    return (
      <Table
        columns={columnsPart}
        dataSource={data as ExerciseSchema[]}
        pagination={{ pageSize: 5 }}
      />
    )
  }

  const onSelectChange = (newSelectedRowKeys: any) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }

  const renderTableModal = (data: any) => {
    return (
      <Table
        rowSelection={rowSelection}
        columns={columnsPartModal}
        dataSource={data as ExerciseSchema[]}
        pagination={{ pageSize: 5 }}
      />
    )
  }

  const handleOk = async (data: any) => {
    if (currentExam) {
      await examApi.deleteExam(currentExam?.id as string)
      openNotificationWithIcon('success', 'Delete exam successfully.')
      navigate(ADMIN_ROUTES.exams)
    } else if (currentPart && dataPart) {
      try {
        const index = dataPart.findIndex((item) => item.id === currentPart?.id)
        if (index !== -1) {
          const updatedDataPart = [...dataPart]
          updatedDataPart.splice(index, 1)
          setDataPart(updatedDataPart)
        }
        openNotificationWithIcon('success', 'Delete part successfully.')
      } catch (error) {
        openNotificationWithIcon(
          'error',
          "Delete fail. You can't delete this exercise",
        )
      }
    }
    setIsModalOpen(false)
  }

  const handleOkReuse = () => {
    const reuse = selectedRowKeys.map(
      (id) => dataPartModal?.find((e) => e.id === id),
    )

    let currentDataPart = reuse as ExerciseSchema[]
    if (dataPart) {
      currentDataPart = [
        ...(dataPart as ExerciseSchema[]),
        ...(reuse as ExerciseSchema[]),
      ]
    }
    console.log(currentDataPart, 'currentDataPart')
    setDataPart(currentDataPart)
    handleCancel()
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleCancelReuse = () => {
    setIsReuseModalOpen(false)
  }

  const handlePartMenuClick = (e: any, exercise: ExerciseSchema) => {
    if (e.key === 'edit') {
      navigate(ADMIN_ROUTES.partDetail + '/' + exercise._id)
    }
    if (e.key === 'remove') {
      showModal(exercise, 'part')
    }
  }

  const handleMoreMenuClick = (e: any) => {
    if (e.key === 'addnew') {
      navigate(ADMIN_ROUTES.createPart)
    }
    if (e.key === 'reuse') {
      showModalReuse()
    }
  }

  const onFinish = async (values: any) => {
    const newPartId = dataPart?.map((part) => part.id)
    const partId = newPartId as string[]
    if (partId) {
      values.parts = partId
    }

    try {
      if (examId) {
        await examApi.updateExam(examId as string, values)
        openNotificationWithIcon('success', 'Update exam successfully.')
      } else {
        await examApi.createExam(values)
        openNotificationWithIcon('success', 'Create new exam successfully.')
        navigate(ADMIN_ROUTES.exams)
      }
    } catch (error) {
      openNotificationWithIcon('error', 'Create new exam fail.')
    }
  }

  const handleDelTest = async () => {
    showModal(useExamDetail, 'exam')
  }

  if (isLoading) return <AppLoading />

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
          <div>{renderTable(dataPart)}</div>
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
            Save
          </Button>
        </div>
      </Form>
      <Modal
        title="Notification Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Do you really want to delete this ?</p>
      </Modal>
      <Modal
        title="Reuse-Parts Modal"
        open={isReuseModalOpen}
        onOk={handleOkReuse}
        onCancel={handleCancelReuse}
      >
        {renderTableModal(dataPartModal)}
      </Modal>
    </>
  )
}

export default ExamDetail
