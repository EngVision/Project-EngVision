import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, Form, Tabs, Tooltip } from 'antd'
import { useWatch } from 'antd/es/form/Form'
import { useContext, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import AppLoading from '../../../components/common/AppLoading'
import coursesApi from '../../../services/coursesApi'
import { TEACHER_ROUTES } from '../../../utils/constants'
import Overview from './Overview'
import Preview from './Preview'
import Section from './Section'
import { CourseDetails } from '../../../services/coursesApi/types'
import { NotificationContext } from '../../../contexts/notification'
import ConfirmDeleteModal from '../../../components/Modal/ConfirmDeleteModal'
import Materials from './Materials'

const { TabPane } = Tabs

const TeacherCourseDetail = () => {
  const navigate = useNavigate()
  const { courseId = '' } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTab = searchParams.get('tab') || '1'

  const [form] = Form.useForm()
  const isPublished = useWatch('isPublished', form)
  const apiNotification = useContext(NotificationContext)
  const queryClient = useQueryClient()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isFormChange, setIsFormChange] = useState(false)

  const fetchCourseDetail = async () => {
    const courseDetail = await coursesApi.getCourseDetails(courseId)
    return { ...courseDetail, price: courseDetail.price.toString() }
  }

  const { data: courseDetails, isLoading: isLoading } = useQuery({
    queryKey: ['course', courseId],
    queryFn: () => fetchCourseDetail(),
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

  const onFinish = (values: any) => {
    const newCourse = {
      ...values,
      price: parseFloat(values.price),
    }

    updateCourseMutation.mutate(newCourse, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['course'] })
        apiNotification.success({ message: 'Update successfully.' })
        setIsFormChange(false)
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

  const handleTabChange = (key: string) => {
    setSearchParams({ tab: key })
  }

  const handleChangeForm = () => {
    const currentFormValue = form.getFieldsValue()
    const isChange = Object.keys(currentFormValue).some((key) => {
      return (
        key !== 'updatedAt' &&
        JSON.stringify(currentFormValue[key]) !==
          JSON.stringify(courseDetails?.[key as keyof CourseDetails])
      )
    })
    setIsFormChange(isChange)
  }

  const handleChangeThumbnail = () => {
    form.setFieldValue('thumbnail', courseDetails?.thumbnail)
    handleChangeForm()
  }

  if (isLoading) return <AppLoading />

  return (
    <div className="flex flex-col bg-surface p-[1.5rem] rounded-md h-full">
      <Form
        name="teacher_course_overview"
        autoComplete="off"
        layout="vertical"
        onFinish={onFinish}
        form={form}
        initialValues={courseDetails}
        onFieldsChange={() => handleChangeForm()}
        className="h-full flex flex-col gap-2"
      >
        <Preview form={form} />

        <Tabs
          className="w-full flex-1 overflow-auto"
          onChange={handleTabChange}
          activeKey={activeTab}
        >
          <TabPane
            tab={
              <Button
                className={`flex font-light items-center text-lg px-10 py-5 rounded-xl 
              ${activeTab === '1' ? '' : 'text-[#2769E7] border-[#2769E7]'}`}
                type={activeTab === '1' ? 'primary' : 'default'}
              >
                Overview
              </Button>
            }
            key="1"
          >
            <Overview handleChangeThumbnail={handleChangeThumbnail} />
          </TabPane>
          <TabPane
            tab={
              <Button
                className={`flex font-light items-center text-lg px-10 py-5 rounded-xl 
              ${activeTab === '2' ? '' : 'text-[#2769E7] border-[#2769E7]'}`}
                type={activeTab === '2' ? 'primary' : 'default'}
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
                ${activeTab === '3' ? '' : 'text-[#2769E7] border-[#2769E7]'}`}
                type={activeTab === '3' ? 'primary' : 'default'}
              >
                Materials
              </Button>
            }
            key="3"
          >
            <Materials
              materials={courseDetails?.materials}
              courseId={courseId}
            />
          </TabPane>
        </Tabs>

        <div className="flex justify-between mt-8">
          <div className="flex gap-4">
            <div>
              <Button
                type="primary"
                danger
                onClick={() => setIsModalOpen(true)}
                loading={deleteCourseMutation.isPending}
                disabled={
                  updateCourseMutation.isPending ||
                  publishCourseMutation.isPending
                }
              >
                Delete
              </Button>
              <ConfirmDeleteModal
                isOpen={isModalOpen}
                type="course"
                isLoading={deleteCourseMutation.isPending}
                onClose={() => setIsModalOpen(false)}
                onDelete={handleDelete}
              />
            </div>

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
              htmlType="submit"
              loading={updateCourseMutation.isPending}
              disabled={
                publishCourseMutation.isPending ||
                deleteCourseMutation.isPending ||
                !isFormChange
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
