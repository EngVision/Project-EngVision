import { useQuery } from '@tanstack/react-query'
import { Avatar, Space, Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useNavigate, useParams } from 'react-router-dom'
import AppLoading from '../../../../components/common/AppLoading'
import submissionApi from '../../../../services/submissionApi'
import { SubmissionResponse } from '../../../../services/submissionApi/types'
const AssignmentTable = () => {
  const navigate = useNavigate()
  const params = useParams()
  const { data: rawSubmissionList, isLoading } = useQuery({
    queryKey: ['submissions'],
    queryFn: async () => submissionApi.getSubmissionList(),
  })
  const submissionList: SubmissionResponse[] | undefined =
    rawSubmissionList?.data?.filter(
      (submission) => submission.course.id === params.courseID,
    )
  const columns: ColumnsType<SubmissionResponse> = [
    {
      title: 'Name',
      dataIndex: 'user',
      key: 'user',
      render: (user) => {
        return (
          <Space size="middle">
            <Avatar size="large" className="bg-primary">
              {user.firstName.charAt(0)}
            </Avatar>
            <span>{`${user.firstName} ${user.lastName}`}</span>
          </Space>
        )
      },
    },
    {
      title: 'Section',
      dataIndex: 'section',
      key: 'section',
      align: 'center',
      render: (section) => section?.title,
    },
    {
      title: 'Lesson',
      dataIndex: 'lesson',
      key: 'lesson',
      align: 'center',
      render: (lesson) => lesson?.title,
    },
    {
      title: 'Exercise',
      dataIndex: 'exercise',
      key: 'exercise',
      align: 'center',
      render: (exercise) => exercise?.title,
    },
    { title: 'Type', dataIndex: 'exerciseType', key: 'exerciseType' },
    {
      title: 'Submit Date',
      dataIndex: 'updatedAt',
      key: 'updatedAr',
      align: 'center',
      render: (updatedAt) => new Date(updatedAt).toLocaleDateString(),
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
      align: 'center',
      render: (status) =>
        status ? (
          <Tag color="blue" className="text-base px-4 flex justify-center">
            Submitted
          </Tag>
        ) : (
          <Tag color="green" className="text-base px-4 flex justify-center">
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
            navigate(
              `./exercises/${record.exercise.id}/submissions/${record.id}`,
            )
          }}
        >
          Grade
        </Tag>
      ),
    },
  ]

  return (
    <>
      {isLoading ? (
        <AppLoading />
      ) : (
        <>
          <h3 className="text-primary text-2xl mb-4">
            {submissionList ? submissionList[0].course?.title : ''}
          </h3>
          <Table columns={columns} dataSource={submissionList} />
        </>
      )}
    </>
  )
}

export default AssignmentTable
