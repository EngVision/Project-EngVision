import { Button, Tabs, Form, message } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import coursesApi from '../../../services/coursesApi'

import Overview from './Overview'
import Section from './Section'
import Preview from './Preview'
import Statistic from './Statistic'
import { CourseDetails } from '../../../services/coursesApi/types'
import { TEACHER_ROUTES } from '../../../utils/constants'
import { removeKeys } from '../../../utils/common'
const { TabPane } = Tabs

const TeacherCourseDetail = () => {
  const { courseId } = useParams()
  const [course, setCourse] = useState<CourseDetails | null>(null)
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const handleSave = async () => {
    const formValues = form.getFieldsValue()
    const newCourse = removeKeys(
      {
        ...course,
        ...formValues,
        price: parseFloat(formValues.price),
      },
      ['teacher'],
    )

    try {
      await coursesApi.update(courseId || '', newCourse)
      message.success(`Update successfully.`)
    } catch (error) {
      console.log('error: ', error)
    }
  }

  const handleSaveAndPublish = async () => {
    try {
      const formValues = form.getFieldsValue()
      const newCourse = removeKeys(
        {
          ...course,
          ...formValues,
          price: parseFloat(formValues.price),
        },
        ['teacher'],
      )

      await coursesApi.update(courseId || '', newCourse)
      await coursesApi.publish(courseId || '')
      message.success(`Update and publish successfully.`)
    } catch (error) {
      console.log('error: ', error)
    }
  }

  const handleDelete = async () => {
    try {
      await coursesApi.delete(courseId || '')
      message.success(`Delete successfully.`)
      navigate(TEACHER_ROUTES.courses)
    } catch (error) {
      console.log('error: ', error)
    }
  }

  const [activeKey, setActiveKey] = useState<string>('1')
  const handleTabChange = (key: string) => {
    setActiveKey(key)
  }

  const fetchCourseDetails = async () => {
    try {
      if (courseId) {
        const { data } = await coursesApi.getCourseDetails(courseId)
        setCourse(data)
      }
    } catch (error) {
      console.log('error: ', error)
    }
  }

  useEffect(() => {
    fetchCourseDetails()
  }, [])

  if (!course) return null

  return (
    <div className="flex flex-col bg-[#FFFCF7] p-[1.5rem] rounded-md h-full">
      <Form
        name="teacher_course_overview"
        initialValues={{
          title: course.title,
          about: course.about,
          price: course.price,
          level: course.level,
          thumbnail: course.thumbnail,
          sections: course.sections,
        }}
        autoComplete="off"
        layout="vertical"
        form={form}
        className="h-full flex flex-col gap-6"
      >
        <Preview form={form} />

        <Tabs
          className="w-full flex-1 overflow-auto"
          onChange={handleTabChange}
          activeKey={activeKey}
        >
          <TabPane
            tab={
              <Button
                className={`flex font-light items-center text-lg px-10 py-5 rounded-xl 
              ${activeKey === '1' ? '' : 'text-[#2769E7] border-[#2769E7]'}`}
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
                className={`flex font-light items-center text-lg px-10 py-5 rounded-xl 
              ${activeKey === '2' ? '' : 'text-[#2769E7] border-[#2769E7]'}`}
                type={activeKey === '2' ? 'primary' : 'default'}
              >
                Course
              </Button>
            }
            key="2"
          >
            <Section form={form} />
          </TabPane>
          <TabPane
            tab={
              <Button
                className={`flex font-light items-center text-lg px-10 py-5 rounded-xl 
                ${activeKey === '3' ? '' : 'text-[#2769E7] border-[#2769E7]'}`}
                type={activeKey === '3' ? 'primary' : 'default'}
              >
                Statistic
              </Button>
            }
            key="3"
          >
            <Statistic />
          </TabPane>
        </Tabs>

        <div className="flex justify-between mt-8">
          <div className="flex gap-4">
            <Button type="primary" danger onClick={handleDelete}>
              Delete
            </Button>

            <Button
              className="text-primary border-primary"
              onClick={() => {
                navigate(TEACHER_ROUTES.courses)
              }}
            >
              Cancel
            </Button>
          </div>

          <div className="flex gap-4">
            <Button type="primary" onClick={handleSave}>
              Save
            </Button>

            <Button type="primary" onClick={handleSaveAndPublish}>
              Save and publish
            </Button>
          </div>
        </div>
      </Form>
    </div>
  )
}

export default TeacherCourseDetail