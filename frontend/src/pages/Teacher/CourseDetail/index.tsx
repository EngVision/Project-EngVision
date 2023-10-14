import { Button, Form, Tabs, Tooltip, message } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import coursesApi from '../../../services/coursesApi'

import { TEACHER_ROUTES } from '../../../utils/constants'
import Overview from './Overview'
import Preview from './Preview'
import Section from './Section'
import { useWatch } from 'antd/es/form/Form'
const { TabPane } = Tabs

const TeacherCourseDetail = () => {
  const { courseId } = useParams()
  const [form] = Form.useForm()
  const isPublished = useWatch('isPublished', form)
  const navigate = useNavigate()

  const handleSave = async () => {
    const formValues = form.getFieldsValue()
    const newCourse = {
      ...formValues,
      price: parseFloat(formValues.price),
    }

    try {
      const { data } = await coursesApi.update(courseId || '', newCourse)
      form.setFieldsValue(data)
      message.success(`Update successfully.`)
    } catch (error) {
      console.log('error: ', error)
    }
  }

  const handlePublish = async () => {
    try {
      await coursesApi.publish(courseId || '')
      form.setFieldValue('isPublished', true)
      message.success(`Publish successfully.`)
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
      const { data } = await coursesApi.getCourseDetails(courseId || '')
      form.setFieldsValue(data)
    } catch (error) {
      console.log('error: ', error)
    }
  }

  useEffect(() => {
    fetchCourseDetails()
  }, [])

  return (
    <div className="flex flex-col bg-[#FFFCF7] p-[1.5rem] rounded-md h-full">
      <Form
        name="teacher_course_overview"
        autoComplete="off"
        layout="vertical"
        form={form}
        className="h-full flex flex-col gap-2"
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
          {/* <TabPane
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
          </TabPane> */}
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

            <Form.Item name="isPublished">
              <Tooltip title={isPublished ? 'This course published' : ''}>
                <Button
                  type="primary"
                  onClick={handlePublish}
                  disabled={isPublished}
                >
                  Publish
                </Button>
              </Tooltip>
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  )
}

export default TeacherCourseDetail
