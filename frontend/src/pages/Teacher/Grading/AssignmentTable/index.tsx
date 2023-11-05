import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Table, Tag, Space, Avatar } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useQuery } from '@tanstack/react-query'
import submissionApi from '../../../../services/submissionApi'
import { SubmissionResponse } from '../../../../services/submissionApi/types'
const AssignmentTable = () => {
  const navigate = useNavigate()
  const params = useParams()
  const { data: rawSubmissionList, isLoading } = useQuery({
    queryKey: ['submissions'],
    queryFn: async () => submissionApi.getSubmissionList(),
  })
  const columns: ColumnsType<SubmissionResponse> = [
    {
      title: 'Name',
      dataIndex: 'user',
      key: 'user',
      render: (text) => {
        return (
          <Space size="middle">
            <Avatar size="large" className="bg-primary">
              {text.charAt(0)}
            </Avatar>
            <span>{text}</span>
          </Space>
        )
      },
    },
    { title: 'Section', dataIndex: 'section', key: 'section', align: 'center' },
    { title: 'Lesson', dataIndex: 'lesson', key: 'lesson', align: 'center' },
    { title: 'Index', dataIndex: 'exercise', key: 'exercise', align: 'center' },
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
      render: (status) =>
        status ? (
          <Tag
            color="blue"
            className="text-base px-4 w-1/2 flex justify-center"
          >
            Submitted
          </Tag>
        ) : (
          <Tag
            color="green"
            className="text-base px-4 w-1/2 flex justify-center"
          >
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
            navigate(`./${record.id}`)
          }}
        >
          Grade
        </Tag>
      ),
    },
  ]

  return (
    <>
      <h3 className="text-primary text-2xl mb-4">
        Grading Assignment for IELTS Exam Strategies and Practice
      </h3>
      <Table columns={columns} dataSource={rawSubmissionList?.data} />
    </>
  )
}

export default AssignmentTable
