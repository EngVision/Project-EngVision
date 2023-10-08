import React from 'react'
import { Form, Input, Select, Upload } from 'antd'
import { CEFRLevel } from '../../../utils/constants'
import { PlusIcon } from '../../../components/Icons'

type FieldType = {
  title: string
  about: string
  price: number
  level: string
  thumbnail: string
}

const Overview = () => {
  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-primary text-2xl mb-4 font-semibold">General</h4>

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
      </div>

      <Form.Item
        name="thumbnail"
        getValueFromEvent={(e: any) => e?.file?.response?.data?.fileId || e}
      >
        <Upload
          action={`${import.meta.env.VITE_BASE_URL}files`}
          withCredentials
          listType="picture-card"
        >
          <div>
            <PlusIcon />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        </Upload>
      </Form.Item>
    </div>
  )
}

export default Overview
