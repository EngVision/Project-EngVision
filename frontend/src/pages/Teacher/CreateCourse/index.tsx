import { Button, Form, Input, Select, Upload } from 'antd'
import { Link } from 'react-router-dom'
import coursesApi from '../../../services/coursesApi'
import { CEFRLevel, TEACHER_ROUTES } from '../../../utils/constants'
import { PlusIcon } from '../../../components/Icons'

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
  const handleSave = async (values: FieldType) => {
    const newCourse = {
      ...values,
      price: parseFloat(values.price),
      thumbnail: values.thumbnail,
    }
    await coursesApi.create(newCourse)
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
          className="flex flex-col gap-4"
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

          <div>
            <span className="mb-2 inline-block">Addition info</span>

            <div className="flex gap-4">
              <Form.Item<FieldType>
                name="price"
                rules={[
                  {
                    pattern: /^[0-9.]+$/,
                    message: 'Price can only numbers.',
                  },
                  { required: true, message: 'Please input price!' },
                ]}
                className="flex-1"
              >
                <Input
                  placeholder="$29.00"
                  size="middle"
                  className="rounded-[8px] h-[40px]"
                />
              </Form.Item>

              <Form.Item<FieldType>
                name="level"
                className="flex-1"
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
            </div>
          </div>

          <Form.Item
            name="thumbnail"
            rules={[{ required: true, message: 'Please upload thumbnail!' }]}
            getValueFromEvent={(e: any) => e?.file?.response?.data?.fileId || e}
          >
            <Upload
              action={`${import.meta.env.VITE_BASE_URL}files`}
              withCredentials
              listType="picture-card"
            >
              <div>
                <PlusIcon />
                <div style={{ marginTop: 8 }}>Upload thumbnail</div>
              </div>
            </Upload>
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
