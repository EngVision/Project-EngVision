import { useMutation, useQuery } from '@tanstack/react-query'
import { Button, Form, Tabs, Tooltip } from 'antd'
import { useWatch } from 'antd/es/form/Form'
import { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AppLoading from '../../../components/common/AppLoading'
import coursesApi from '../../../services/coursesApi'
import { TEACHER_ROUTES } from '../../../utils/constants'
import Overview from './Overview'
import Preview from './Preview'
import Section from './Section'
import { CourseDetails } from '../../../services/coursesApi/types'
import { NotificationContext } from '../../../contexts/notification'

const { TabPane } = Tabs

const TeacherCourseDetail = () => {
  const { courseId = '' } = useParams()
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const isPublished = useWatch('isPublished', form)
  const apiNotification = useContext(NotificationContext)

  const fetchCourseDetail = async () => {
    const courseDetail = await coursesApi.getCourseDetails(courseId)
    form.setFieldsValue(courseDetail)
    return courseDetail
  }

  const { isLoading } = useQuery({
    queryKey: ['course', courseId],
    queryFn: fetchCourseDetail,
  })

  const updateCourseMutation = useMutation({
    mutationFn: (newCourse: CourseDetails) =>
      coursesApi.update(courseId, newCourse),
  })

  const deleteCourseMutation = useMutation({
    mutationFn: () => coursesApi.delete(courseId),
    onSuccess: () => {
      apiNotification.success({ message: 'Delete successfully.' })
      navigate(TEACHER_ROUTES.courses)
    },
  })

  const publishCourseMutation = useMutation({
    mutationFn: () => coursesApi.publish(courseId),
  })

  const handleSave = () => {
    const formValues = form.getFieldsValue()
    const newCourse = {
      ...formValues,
      price: parseFloat(formValues.price),
    }

    updateCourseMutation.mutate(newCourse, {
      onSuccess: (data) => {
        form.setFieldsValue(data.data)
        apiNotification.success({ message: 'Update successfully.' })
      },
      onError: () => {
        apiNotification.error({ message: 'Update fail.' })
      },
    })
  }

  const handlePublish = () => {
    publishCourseMutation.mutate(undefined, {
      onSuccess: () => {
        form.setFieldValue('isPublished', true)
        apiNotification.success({ message: 'Publish successfully.' })
      },
    })
  }

  const handleDelete = () => {
    deleteCourseMutation.mutate()
  }

  const [activeKey, setActiveKey] = useState<string>('1')

  const handleTabChange = (key: string) => {
    setActiveKey(key)
  }

  if (isLoading) return <AppLoading />

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
            <Button
              type="primary"
              danger
              onClick={handleDelete}
              loading={deleteCourseMutation.isPending}
              disabled={
                updateCourseMutation.isPending ||
                publishCourseMutation.isPending
              }
            >
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
            <Button
              type="primary"
              onClick={handleSave}
              loading={updateCourseMutation.isPending}
              disabled={
                publishCourseMutation.isPending ||
                deleteCourseMutation.isPending
              }
            >
              Save
            </Button>

            <Form.Item name="isPublished">
              <Tooltip title={isPublished ? 'This course published' : ''}>
                <Button
                  type="primary"
                  onClick={handlePublish}
                  disabled={
                    isPublished ||
                    updateCourseMutation.isPending ||
                    deleteCourseMutation.isPending
                  }
                  loading={publishCourseMutation.isPending}
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
