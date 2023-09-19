import {
  faChartSimple,
  faEllipsisVertical,
  faEraser,
  faNoteSticky,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Popover, Space } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import Table from 'antd/es/table'

import type { ExamParams } from '../../services/examApi/types'

export const Exam = () => {
  //   const [data, setData] = useState<ExamParams[]>([])

  //   useEffect(() => {
  //     const fectchExam = async () => {
  //       try {
  //         const exam = await examApi.fetchExam()
  //         setData(exam.data)
  //         console.log(exam.data)
  //       } catch (error) {
  //         console.error('Error fetching exam:', error)
  //       }
  //     }

  //     fectchExam()
  //   })

  const popover = (
    <div className="flex flex-col items-start">
      <Button type="text">
        <FontAwesomeIcon className="mr-1" icon={faChartSimple} />
        Statistics
      </Button>
      <Button href="./exam-edit" type="text">
        <FontAwesomeIcon className="mr-1" icon={faNoteSticky} />
        Edit
      </Button>
      <Button type="text">
        <FontAwesomeIcon className="mr-1" icon={faEraser} />
        Remove
      </Button>
    </div>
  )

  const columns: ColumnsType<ExamParams> = [
    {
      dataIndex: 'title',
      title: 'Title',
    },
    {
      dataIndex: 'description',
      title: 'Description',
    },
    {
      key: 'add new',
      render: () => (
        <Space className="flex flex-row-reverse mr-2">
          <Popover
            content={popover}
            trigger="click"
            className="text-black hover:text-slate-400"
          >
            <Button type="text">
              <FontAwesomeIcon icon={faEllipsisVertical} />
            </Button>
          </Popover>
        </Space>
      ),
      title: (
        <Button type="primary" className="absolute inset-y-3 right-0 mr-6">
          Add new
        </Button>
      ),
    },
  ]

  const Sampledata = [
    {
      description: 'Who would you like to speak to?',
      title: 'Question 1',
    },
    {
      description: 'How about your life?',
      title: 'Question 2',
    },
  ]

  return (
    <>
      <div className="m-12">
        <p className="text-2xl font-bold">
          Your courses / CEFR / Section 1 / Lession 1
        </p>
        <div className="my-6 text-lg font-semibold">
          <p className="mb-3">Homeworks</p>
          <Table columns={columns} dataSource={Sampledata} />
        </div>
        <div className="my-6 text-lg font-semibold">
          <p className="mb-3">Recourse</p>
          <Table columns={columns} />
        </div>
      </div>
    </>
  )
}
