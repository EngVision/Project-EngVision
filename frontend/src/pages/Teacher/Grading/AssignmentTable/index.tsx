import { useQuery } from '@tanstack/react-query'
import { Avatar, Space, Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useNavigate, useParams } from 'react-router-dom'
import AppLoading from '../../../../components/common/AppLoading'
import submissionApi from '../../../../services/submissionApi'
import { SubmissionResponse } from '../../../../services/submissionApi/types'
import { UPLOAD_FILE_URL } from '../../../../utils/constants'
import { useTranslation } from 'react-i18next'
const AssignmentTable = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'Grading' })
  const navigate = useNavigate()
  const params = useParams()
  const { data: rawSubmissionList, isLoading } = useQuery({
    queryKey: ['courseSubmissions'],
    queryFn: async () =>
      submissionApi.getSubmissionList({ course: params.courseID }),
  })
  const columns: ColumnsType<SubmissionResponse> = [
    {
      title: t('Name'),
      dataIndex: 'user',
      key: 'user',
      render: (user) => {
        return (
          <Space size="middle">
            <Avatar
              size="large"
              className="bg-primary"
              src={`${UPLOAD_FILE_URL}${user?.avatar}`}
            ></Avatar>
            <span>{`${user.firstName} ${user.lastName}`}</span>
          </Space>
        )
      },
    },
    {
      title: t('Section'),
      dataIndex: 'section',
      key: 'section',
      align: 'center',
      render: (section) => section?.title,
    },
    {
      title: t('Lesson'),
      dataIndex: 'lesson',
      key: 'lesson',
      align: 'center',
      render: (lesson) => lesson?.title,
    },
    {
      title: t('Exercise'),
      dataIndex: 'exercise',
      key: 'exercise',
      align: 'center',
      render: (exercise) => exercise?.title,
    },
    { title: t('Type'), dataIndex: 'exerciseType', key: 'exerciseType' },
    {
      title: t('Submit Date'),
      dataIndex: 'updatedAt',
      key: 'updatedAr',
      align: 'center',
      render: (updatedAt) => new Date(updatedAt).toLocaleDateString(),
    },
    {
      title: t('Grade'),
      dataIndex: 'grade',
      key: 'grade',
      align: 'center',
      render: (_, record) =>
        record.grade !== null && record.status === 'graded' ? (
          <Tag className="bg-alternative text-white text-base px-4">
            {record.grade}/10
          </Tag>
        ) : (
          <Tag className="bg-[#D3D3D3] text-white text-base px-4">.../10</Tag>
        ),
    },
    {
      title: t('Status'),
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (status) =>
        status === 'graded' ? (
          <Tag color="blue" className="text-base px-4 flex justify-center">
            Graded
          </Tag>
        ) : (
          <Tag color="green" className="text-base px-4 flex justify-center">
            Pending
          </Tag>
        ),
    },
    {
      title: t('Action'),
      key: 'action',
      align: 'center',
      fixed: 'right',
      width: 100,
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
            {rawSubmissionList?.data
              ? rawSubmissionList?.data[0]?.course?.title
              : ''}
          </h3>
          {rawSubmissionList?.data && (
            <Table
              columns={columns}
              dataSource={rawSubmissionList.data}
              scroll={{ x: '80vw' }}
              loading={isLoading}
            />
          )}
        </>
      )}
    </>
  )
}

export default AssignmentTable
