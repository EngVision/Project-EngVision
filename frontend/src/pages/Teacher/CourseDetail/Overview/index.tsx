import React from 'react'
import { Button, Form, Input, Select, Upload } from 'antd'
import { CEFRLevel } from '../../../../utils/constants'

type FieldType = {
  title: string
  about: string
  price: number
  level: string
  thumbnail: string
}

type OverviewProps = {
  form: any
  course: any
}

const Overview = ({ form, course }: OverviewProps) => {
  return (
    <div>
      <h4 className="text-primary text-2xl mb-4 font-semibold">General</h4>

      <Form
        name="teacher_course_overview"
        initialValues={{
          title: course.title,
          about: course.about,
          price: course.price,
          level: course.level,
          thumbnail: course.thumbnail,
        }}
        autoComplete="off"
        layout="vertical"
        form={form}
        className="h-full"
      >
        <Form.Item<FieldType> name="title" label="Title">
          <Input
            placeholder="Public Speaking and Presentation Skills in English"
            size="middle"
            className="rounded-[8px] h-[40px]"
          />
        </Form.Item>

        <Form.Item<FieldType> name="about" label="About">
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
              ]}
              className="flex-1"
            >
              <Input
                placeholder="$29.00"
                size="middle"
                className="rounded-[8px] h-[40px]"
              />
            </Form.Item>

            <Form.Item<FieldType> name="level" className="flex-1">
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

          <Form.Item<FieldType> name="thumbnail">
            <Upload
              action={`${import.meta.env.VITE_BASE_URL}files`}
              withCredentials
            >
              <Button>Upload thumbnail</Button>
            </Upload>
          </Form.Item>
        </div>
      </Form>
    </div>
  )
}

export default Overview
