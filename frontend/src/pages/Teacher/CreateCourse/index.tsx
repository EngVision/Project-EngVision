import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, Form, Input, Select } from 'antd'
import { useContext } from 'react'
import CustomUpload from '../../../components/CustomUpload'
import { NotificationContext } from '../../../contexts/notification'
import { useAppSelector } from '../../../hooks/redux'
import coursesApi from '../../../services/coursesApi'
import { CEFRLevel } from '../../../utils/constants'
import { formatCurrency } from '../../../utils/currency'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation('translation', { keyPrefix: 'CreateCourse' })
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
        apiNotification.success({ message: t('Create successfully.') })
        onClose()
      },
    })
  }

  return (
    <div className="flex flex-col p-[1.5rem] rounded-md h-full">
      <div>
        <h4 className="text-primary text-2xl mb-4 font-semibold">
          {t('Create new course')}
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
            label={t('Title')}
            rules={[{ required: true, message: t('Please input title!') }]}
          >
            <Input
              placeholder={t(
                'Public Speaking and Presentation Skills in English',
              )}
              size="middle"
              className="rounded-[8px] h-[40px]"
            />
          </Form.Item>

          <Form.Item<FieldType>
            name="about"
            label={t('About')}
            rules={[{ required: true, message: t('Please input about!') }]}
          >
            <Input
              placeholder={t(
                'Boost your English public speaking and presentation skills with confidence.',
              )}
              size="middle"
              className="rounded-[8px] h-[40px]"
            />
          </Form.Item>

          <Form.Item<FieldType>
            name="price"
            label={t('Price')}
            rules={[
              { required: true, message: '' },
              {
                async validator(_, value) {
                  if (!value || value.length === 0)
                    return Promise.reject(new Error(t('Please input price!')))

                  if (!/^[0-9.]+$/.test(value)) {
                    return Promise.reject(
                      new Error(t('Price can only contain numbers.')),
                    )
                  }

                  const price = parseFloat(value)
                  if (price === 0 || price >= 2000) {
                    return Promise.resolve()
                  }
                  return Promise.reject(
                    new Error(
                      t('Price must be 0 for free or must be at least 2000!'),
                    ),
                  )
                },
              },
            ]}
          >
            <Input
              placeholder={formatCurrency(0)}
              size="middle"
              className="rounded-[8px] h-[40px]"
            />
          </Form.Item>

          <Form.Item<FieldType>
            name="level"
            label={t('Level')}
            rules={[{ required: true, message: t('Please input level!') }]}
          >
            <Select
              placeholder={t('Select level')}
              options={Object.values(CEFRLevel).map((level) => ({
                value: level,
                label: level,
              }))}
              className="rounded-[8px] !h-[40px]"
              size="large"
            />
          </Form.Item>

          <Form.Item name="thumbnail" label={t('Thumbnail')}>
            <CustomUpload type="picture" />
          </Form.Item>

          <div className="flex gap-4 mt-8 justify-end">
            <Button className="text-primary border-primary" onClick={onClose}>
              {t('Cancel')}
            </Button>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={createTeacherCourseMutation.isPending}
              >
                {t('Create')}
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default TeacherCreateCourse
