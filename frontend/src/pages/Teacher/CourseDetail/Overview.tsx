import { Form, Input, Select } from 'antd'
import CustomUpload from '../../../components/CustomUpload'
import { CEFRLevel } from '../../../utils/constants'

type FieldType = {
  title: string
  about: string
  price: number
  level: string
  thumbnail: string
}

interface OverviewProps {
  handleChangeThumbnail: () => void
}

const Overview = ({ handleChangeThumbnail }: OverviewProps) => {
  return (
    <div className="flex flex-col">
      <h4 className="text-primary text-2xl font-semibold">General</h4>

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

      <div className="flex flex-col gap-4 lg:flex-row">
        <Form.Item<FieldType>
          name="price"
          label="Price"
          rules={[
            { required: true, message: 'Please input price!' },
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

        <Form.Item<FieldType>
          name="level"
          label="Level"
          rules={[{ required: true, message: 'Please input level!' }]}
          className="flex-1"
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

      <Form.Item name="thumbnail" label="Thumbnail">
        <CustomUpload type="picture" onRemove={handleChangeThumbnail} />
      </Form.Item>
    </div>
  )
}

export default Overview
