import { Form, Input, Select } from 'antd'
import CustomUpload from '../../../components/CustomUpload'
import { CEFRLevel } from '../../../utils/constants'
import { useWatch } from 'antd/es/form/Form'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation('translation', { keyPrefix: 'Course Details' })
  const form = Form.useFormInstance()
  const isAdminCurriculum = useWatch('isAdminCurriculum', form)

  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-primary text-2xl font-semibold">General</h4>

      <Form.Item<FieldType>
        name="title"
        label={t('Title')}
        rules={[{ required: true, message: 'Please input title!' }]}
      >
        <Input
          placeholder="Public Speaking and Presentation Skills in English"
          size="middle"
          className="rounded-[8px] h-[40px]"
          disabled={isAdminCurriculum}
        />
      </Form.Item>

      <Form.Item<FieldType>
        name="about"
        label={t('About')}
        rules={[{ required: true, message: 'Please input about!' }]}
      >
        <Input
          placeholder="Boost your English public speaking and presentation skills with confidence."
          size="middle"
          className="rounded-[8px] h-[40px]"
          disabled={isAdminCurriculum}
        />
      </Form.Item>

      <div className="flex gap-4">
        <Form.Item<FieldType>
          name="price"
          label={t('Price')}
          rules={[
            { required: true, message: '' },
            {
              async validator(_, value) {
                if (value.length === 0)
                  return Promise.reject(new Error('Please input price!'))

                if (!/^[0-9.]+$/.test(value)) {
                  return Promise.reject(
                    new Error('Price can only contain numbers.'),
                  )
                }

                const price = parseFloat(value)
                if (price === 0 || price >= 2000) {
                  return Promise.resolve()
                }
                return Promise.reject(
                  new Error(
                    'Price must be 0 for free or must be at least 2000!',
                  ),
                )
              },
            },
          ]}
          className="flex-1"
        >
          <Input
            placeholder="0 VND"
            size="middle"
            className="rounded-[8px] h-[40px]"
            disabled={isAdminCurriculum}
          />
        </Form.Item>

        <Form.Item<FieldType>
          name="level"
          label={t('Level')}
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
            disabled={isAdminCurriculum}
          />
        </Form.Item>
      </div>

      <Form.Item name="thumbnail" label={t('Thumbnail')}>
        <CustomUpload type="picture" onRemove={handleChangeThumbnail} />
      </Form.Item>
    </div>
  )
}

export default Overview
