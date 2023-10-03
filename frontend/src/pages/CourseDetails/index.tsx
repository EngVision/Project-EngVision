import { Button, Spin, Tabs } from 'antd'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Star from '../../components/Icons/Star'
import coursesApi from '../../services/coursesApi'
import type { CourseDetails } from '../../services/coursesApi/types'
import Overview from './Overview'
import CourseContent from './CourseContent'
import Reviews from './Reviews'
const { TabPane } = Tabs

const CourseDetailsPage = () => {
  const { courseId } = useParams()
  const [courseDetails, setCourseDetails] = useState<CourseDetails | null>(null)

  const [activeKey, setActiveKey] = useState<string>('1')
  const handleTabChange = (key: string) => {
    setActiveKey(key)
  }

  const fetchCourseDetails = async () => {
    try {
      if (courseId) {
        const response = await coursesApi.getCourseDetails(courseId)
        setCourseDetails(response.data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchCourseDetails()
  }, [])
  return courseDetails ? (
    <div className="flex flex-col bg-white p-5 rounded-md shadow-lg">
      <div className="flex h-60 mb-8">
        <div className="h-full w-[18.75rem] mr-8">
          <img
            className="object-cover w-full h-full"
            src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
            alt="thumbnail"
          />
        </div>
        <div className="flex flex-col h-full justify-between">
          <div className="flex text-sm">
            <div className="mr-6">
              Publish: <span className="font-bold">10/12/2021</span>
            </div>
            <div>
              Last Update: <span className="font-bold">10/12/2021</span>
            </div>
          </div>
          <h2 className="text-4xl text-[#2769E7]">
            Public Speaking and Presentation Skills in English
          </h2>
          <p>
            Boost your English public speaking and presentation skills with
            confidence.
          </p>
          <div className="flex items-center leading-6">
            <Star className="text-[#FD6267] mr-1.5" />
            <span className="mr-1.5 font-bold">3.8</span>
            <div className="mr-1.5 text-[#706E68]">(451,444 Rating)</div>
          </div>
          <div>
            <Button
              className="flex items-center text-lg px-10 py-5"
              type="primary"
            >
              Enroll with $29.00
            </Button>
          </div>
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
                activeKey === '1' ? '' : 'text-[#2769E7] border-[#2769E7]'
              }`}
              type={activeKey === '1' ? 'primary' : 'default'}
            >
              Overview
            </Button>
          }
          key="1"
        >
          <Overview />
        </TabPane>
        <TabPane
          tab={
            <Button
              className={`flex font-light items-center text-lg px-10 py-5 rounded-xl ${
                activeKey === '2' ? '' : 'text-[#2769E7] border-[#2769E7]'
              }`}
              type={activeKey === '2' ? 'primary' : 'default'}
            >
              Course
            </Button>
          }
          key="2"
        >
          <CourseContent />
        </TabPane>
        <TabPane
          tab={
            <Button
              className={`flex font-light items-center text-lg px-10 py-5 rounded-xl ${
                activeKey === '3' ? '' : 'text-[#2769E7] border-[#2769E7]'
              }`}
              type={activeKey === '3' ? 'primary' : 'default'}
            >
              Reviews
            </Button>
          }
          key="3"
        >
          <Reviews />
        </TabPane>
      </Tabs>
    </div>
  ) : (
    <div className="h-[100vh] w-full flex justify-center items-center ">
      <Spin></Spin>
    </div>
  )
}

export default CourseDetailsPage
