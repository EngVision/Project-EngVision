import { useTranslation } from 'react-i18next'
import AppLoading from '../../../components/common/AppLoading'
import { useQuery } from '@tanstack/react-query'
import submissionApi from '../../../services/submissionApi'
import Table, { ColumnsType } from 'antd/es/table'
import { SubmissionResponse } from '../../../services/submissionApi/types'
import { Button, Input, InputRef, Progress, Space } from 'antd'
import { UPLOAD_FILE_URL } from '../../../utils/constants'
import CustomImage from '../../../components/common/CustomImage'
import { useRef, useState } from 'react'
import { ColumnType, FilterConfirmProps } from 'antd/es/table/interface'
import { Highlighter } from '../../../components/common/Highlighter'
import { useNavigate } from 'react-router-dom'

import './index.css'

const InProgressAndDoneExercise = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'MyHub' })
  const [searchText, setSearchText] = useState('')
  const searchInput = useRef<InputRef>(null)

  const navigate = useNavigate()

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
  ) => {
    confirm()
    setSearchText(selectedKeys[0])
  }

  const handleReset = (
    clearFilters: () => void,
    confirm: (param?: FilterConfirmProps) => void,
  ) => {
    clearFilters()
    handleSearch([], confirm)
    setSearchText('')
  }

  const courseExercisesSearch = (): ColumnType<SubmissionResponse> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={t('Search by exercise or course name')}
          value={selectedKeys[0]}
          onChange={(e) => {
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm)}
            size="small"
            style={{ width: 90 }}
          >
            {t('Filter')}
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters, confirm)}
            size="small"
            style={{ width: 90 }}
          >
            {t('Reset')}
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close()
            }}
          >
            {t('Close')}
          </Button>
        </Space>
      </div>
    ),
    onFilter: (value, record) => {
      return (
        record?.course?.title
          ?.toString()
          .toLowerCase()
          .includes((value as string).toLowerCase()) ||
        record?.exercise?.title
          ?.toString()
          .toLowerCase()
          .includes((value as string).toLowerCase())
      )
    },
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100)
      }
    },
  })

  const columns: ColumnsType<SubmissionResponse> = [
    {
      title: t('Title'),
      dataIndex: 'course',
      key: 'title',
      render: (course, record) => (
        <div className="flex gap-2">
          <CustomImage
            src={`${UPLOAD_FILE_URL}${course?.thumbnail}`}
            fallback={
              'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
            }
            className="w-14 h-11 rounded"
          />
          <div>
            <p className="text-[15px] font-semibold">
              <Highlighter text={record.exercise.title} match={searchText} />
            </p>
            <p>
              <Highlighter text={course?.title} match={searchText} />
            </p>
          </div>
        </div>
      ),
      ...courseExercisesSearch(),
    },
    {
      title: t('Section'),
      dataIndex: ['section', 'title'],
      key: 'section',
    },
    {
      title: t('Lesson'),
      dataIndex: ['lesson', 'title'],
      key: 'lesson',
    },
    {
      title: t('Skills'),
      dataIndex: ['exercise', 'tags'],
      key: 'skill',
      render: (tags) => (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag: string, index: number) => (
            <div key={index} className="flex justify-start align-middle">
              <div
                className={
                  'border-[1px] border-solid py-[4px] px-[8px] rounded-[5px] border-primary text-primary'
                }
              >
                {tag}
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: t('Type'),
      dataIndex: 'exerciseType',
      key: 'type',
      render: (type: string) => {
        return (
          <div className="flex justify-start align-middle">
            <div
              className={
                'border-[1px] border-solid py-[4px] px-[8px] rounded-[5px] border-primary text-primary'
              }
            >
              {type}
            </div>
          </div>
        )
      },
    },
    {
      title: t('Progress'),
      dataIndex: 'progress',
      key: 'progress',
      render: (percent: number) => {
        return <Progress percent={percent * 100} className="min-w-[100px]" />
      },
      sorter: (a, b) => a.progress - b.progress,
      sortDirections: ['ascend', 'descend'],
      defaultSortOrder: 'ascend',
    },
  ]

  const { data: submissions, isLoading } = useQuery({
    queryKey: ['mySubmissions'],
    queryFn: () => submissionApi.getSubmissionList({ limit: -1 }),
  })

  if (isLoading) return <AppLoading />

  return (
    <div className="hidden lg:block">
      <div className="my-6 flex justify-between align-middle">
        <p className="font-bold text-3xl text-primary">
          {t('inProgressAndDoneExercises')}
        </p>
      </div>
      <Table
        rowKey="id"
        onRow={(record) => {
          return {
            onClick: () => {
              navigate(
                `./${record?.course?.id}/exercise/${record?.exercise?.id}`,
              )
            },
          }
        }}
        dataSource={submissions?.data}
        columns={columns}
        scroll={{ x: 'calc(100%)' }}
      />
    </div>
  )
}

export default InProgressAndDoneExercise
