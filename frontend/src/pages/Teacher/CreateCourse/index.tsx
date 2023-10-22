import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, Form, Input, Select } from 'antd'
import { Link } from 'react-router-dom'
import CustomUpload from '../../../components/CustomUpload'
import { useAppSelector } from '../../../hooks/redux'
import coursesApi from '../../../services/coursesApi'
import { CEFRLevel, TEACHER_ROUTES } from '../../../utils/constants'
import { useContext } from 'react'
import { NotificationContext } from '../../../contexts/notification'

type FieldType = {
  title: string
  about: string
  price: string
  level: CEFRLevel
  thumbnail: string
}

interface TeacherCreateCourseProps {
  onClose: () => void
}

const TeacherCreateCourse: React.FC<TeacherCreateCourseProps> = ({
  onClose,
}) => {
  const status = useAppSelector((state) => state.course.status)
  const queryClient = useQueryClient()
  const apiNotification = useContext(NotificationContext)

  const createTeacherCourseMutation = useMutation({
    mutationFn: coursesApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses', { status }] })
    },
  })

  const handleSave = async (values: FieldType) => {
    const newCourse: any = {
      ...values,
      price: parseFloat(values.price),
      thumbnail: values.thumbnail,
    }
    createTeacherCourseMutation.mutate(newCourse, {
      onSuccess: () => {
        apiNotification.success({ message: 'Create successfully.' })
      },
    })
    onClose()
  }

  return (
    <div className="flex flex-col bg-[#FFFCF7] p-[1.5rem] rounded-md h-full">
      <div>
        <h4 className="text-primary text-2xl mb-4 font-semibold">
          Create new course
        </h4>

        <Form
          name="teacher_course_overview"
          initialValues={{ remember: true }}
          onFinish={handleSave}
          autoComplete="off"
          layout="vertical"
          className="flex flex-col"
        >
          <Form.Item<FieldType>
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please input title!' }]}
          >
            <Input
              placeholder="Public Speaking and Presentation Skills in English"
              size="middle"
              className="rounded-[8px] h-[40px]"
            />
          </Form.Item>

          <Form.Item<FieldType>
            name="about"
            label="About"
            rules={[{ required: true, message: 'Please input about!' }]}
          >
            <Input
              placeholder="Boost your English public speaking and presentation skills with confidence."
              size="middle"
              className="rounded-[8px] h-[40px]"
            />
          </Form.Item>

          <Form.Item<FieldType>
            name="price"
            label="Price"
            rules={[
              {
                pattern: /^[0-9.]+$/,
                message: 'Price can only numbers.',
              },
              { required: true, message: 'Please input price!' },
            ]}
          >
            <Input
              placeholder="$29.00"
              size="middle"
              className="rounded-[8px] h-[40px]"
            />
          </Form.Item>

          <Form.Item<FieldType>
            name="level"
            label="Level"
            rules={[{ required: true, message: 'Please input level!' }]}
          >
            <Select
              placeholder="Select level"
              options={Object.values(CEFRLevel).map((level) => ({
                value: level,
                label: level,
              }))}
              className="rounded-[8px] !h-[40px]"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="thumbnail"
            label="Thumbnail"
            rules={[{ required: true, message: 'Please upload thumbnail!' }]}
            getValueFromEvent={(e: any) => e?.file?.response?.data?.fileId || e}
          >
            <CustomUpload type="picture" />
          </Form.Item>

          <div className="flex gap-4 mt-8 justify-end">
            <Button className="text-primary border-primary">
              <Link to={TEACHER_ROUTES.courses}>Cancel</Link>
            </Button>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default TeacherCreateCourse
