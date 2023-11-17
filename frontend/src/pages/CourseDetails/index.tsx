import { Button, Tabs } from 'antd'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Star from '../../components/Icons/Star'
import AppLoading from '../../components/common/AppLoading'
import coursesApi from '../../services/coursesApi'
import { UPLOAD_FILE_URL } from '../../utils/constants'
import CourseContent from './CourseContent'
import Overview from './Overview'
import Reviews from './Reviews'
import React from 'react'
import CustomImage from '../../components/common/CustomImage'
const { TabPane } = Tabs

const CourseDetailsPage = () => {
  const { courseId = '' } = useParams<{ courseId: string }>()
  const [activeKey, setActiveKey] = useState<string>('1')
  const queryClient = useQueryClient()

  const { data: courseDetail, isLoading } = useQuery({
    queryKey: ['courseDetail', courseId],
    queryFn: async () => coursesApi.getCourseDetails(courseId),
  })

  const attendCourseMutation = useMutation({
    mutationFn: (courseId: string) => coursesApi.postAttend(courseId),
  })

  const handleTabChange = (key: string) => {
    setActiveKey(key)
  }

  const handleAttendCourse = async () => {
    attendCourseMutation.mutate(courseId, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['courseDetail'] })
      },
    })
  }

  if (isLoading) return <AppLoading />

  return (
    courseDetail && (
      <div className="flex flex-col bg-surface p-5 rounded-md shadow-lg">
        <div className="flex h-60 mb-8">
          <div className="h-full w-[18.75rem] mr-8 rounded-lg overflow-hidden">
            <CustomImage
              className="object-cover w-full h-full"
              src={`${UPLOAD_FILE_URL}${courseDetail.thumbnail}`}
            ></CustomImage>
          </div>
          <div className="flex flex-col h-full justify-between">
            <div className="flex text-sm">
              <div>
                Last Update:{' '}
                <span className="font-bold">
                  {courseDetail.updatedAt.substring(0, 10)}
                </span>
              </div>
            </div>
            <h2 className="text-4xl text-primary">{courseDetail.title}</h2>
            <p>{courseDetail.about}</p>
            <div className="flex items-center leading-6">
              <Star className="text-secondary mr-1.5" />
              <span className="mr-1.5 font-bold">{courseDetail.avgStar}</span>
              <div className="mr-1.5 text-wolfGrey">{`(${courseDetail.reviews.length} Rating)`}</div>
            </div>
            {!courseDetail.isAttended && (
              <div>
                <Button
                  className="flex items-center text-lg px-10 py-5"
                  type="primary"
                  onClick={handleAttendCourse}
                >
                  Enroll with ${courseDetail.price}
                </Button>
              </div>
            )}
          </div>
        </div>
        <Tabs
          className="w-full "
          onChange={handleTabChange}
          activeKey={activeKey}
        >
          <TabPane
            tab={
              <Button
                className={`flex font-light items-center text-lg px-10 py-5 rounded-xl ${
                  activeKey === '1' ? '' : 'text-primary border-primary'
                }`}
                type={activeKey === '1' ? 'primary' : 'default'}
              >
                Overview
              </Button>
            }
            key="1"
          >
            <Overview {...courseDetail} />
          </TabPane>
          <TabPane
            tab={
              <Button
                className={`flex font-light items-center text-lg px-10 py-5 rounded-xl ${
                  activeKey === '2' ? '' : 'text-primary border-primary'
                }`}
                type={activeKey === '2' ? 'primary' : 'default'}
              >
                Course
              </Button>
            }
            key="2"
          >
            <CourseContent {...courseDetail} />
          </TabPane>
          <TabPane
            tab={
              <Button
                className={`flex font-light items-center text-lg px-10 py-5 rounded-xl ${
                  activeKey === '3' ? '' : 'text-primary border-primary'
                }`}
                type={activeKey === '3' ? 'primary' : 'default'}
              >
                Reviews
              </Button>
            }
            key="3"
          >
            <Reviews course={courseDetail} />
          </TabPane>
        </Tabs>
      </div>
    )
  )
}

export default CourseDetailsPage
