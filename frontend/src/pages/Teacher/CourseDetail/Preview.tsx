import { Form } from 'antd'
import { StarIcon } from '../../../components/Icons'
import PreviewInput from '../../../components/common/PreviewInput'
import { FormInstance, useWatch } from 'antd/lib/form/Form'
import CustomImage from '../../../components/common/CustomImage'
import { getFormattedDate, getFormattedPrice } from '../../../utils/common'
import { UPLOAD_FILE_URL } from '../../../utils/constants'

interface PreviewProps {
  form: FormInstance
}

const Preview = ({ form }: PreviewProps) => {
  const thumbnail = useWatch('thumbnail', form)
  const price = useWatch('price', form)
  const reviews = useWatch('reviews', form)
  const updatedAt = useWatch('updatedAt', form)
  const attendance = useWatch('attendance', form)

  return (
    <div className="flex flex-col gap-4 min-h-[12rem] select-none lg:flex-row">
      <CustomImage
        className="hidden lg:block object-cover min-w-[300px] h-[12rem] rounded-md"
        src={`${UPLOAD_FILE_URL}${thumbnail}`}
      />
      <div className="flex flex-col h-full justify-between flex-1 gap-2">
        <div className="flex text-sm justify-between">
          <div className="mr-6">
            {/* Publish: <span className="font-bold">10/12/2021</span> */}
          </div>
          <Form.Item name="updatedAt" noStyle>
            <span>
              Last Update: <b>{getFormattedDate(updatedAt)}</b>
            </span>
          </Form.Item>
        </div>

        <div>
          <Form.Item name="title" noStyle>
            <PreviewInput className="font-semibold text-2xl" />
          </Form.Item>

          <Form.Item name="about" noStyle>
            <PreviewInput className="text-base mb-2" />
          </Form.Item>
        </div>

        <div className="flex items-center leading-6">
          <StarIcon className="text-[#FD6267] mr-1.5" />
          <span className="mr-1.5 font-bold">
            {form.getFieldValue('avgStar')}
          </span>
          <Form.Item name="reviews" noStyle>
            <div className="mr-1.5 text-[#706E68]">
              ({reviews?.length || 0} ratings)
            </div>
          </Form.Item>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex flex-col items-center">
            <PreviewInput
              className="text-3xl text-primary text-center"
              value={getFormattedPrice(price || 0)}
            />
            <span className="text-xs text-textSubtle text-center">
              Course price
            </span>
          </div>

          <div className="w-[2px] h-5 bg-slate-400"></div>

          <Form.Item name="attendance" noStyle>
            <div className="flex flex-col items-center">
              <PreviewInput
                className="text-3xl text-primary text-center"
                value={getFormattedPrice(price * attendance)}
              />
              <span className="text-xs text-textSubtle text-center">
                Revenue
              </span>
            </div>
          </Form.Item>
        </div>
      </div>
    </div>
  )
}

export default Preview
