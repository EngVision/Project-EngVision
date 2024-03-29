import { Form } from 'antd'
import { useWatch } from 'antd/lib/form/Form'
import { useTranslation } from 'react-i18next'
import { StarIcon } from '../../../components/Icons'
import CustomImage from '../../../components/common/CustomImage'
import PreviewInput from '../../../components/common/PreviewInput'
import { getFormattedDate } from '../../../utils/common'
import { UPLOAD_FILE_URL } from '../../../utils/constants'
import { formatCurrency } from '../../../utils/currency'

const Preview = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'common' })
  const form = Form.useFormInstance()
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
              {t('Last Updated')}: <b>{getFormattedDate(updatedAt)}</b>
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
            {form.getFieldValue('avgStar') || 0}
          </span>
          <Form.Item name="reviews" noStyle>
            <div className="mr-1.5 text-[#706E68]">
              ({reviews?.length || 0} {t('ratings')})
            </div>
          </Form.Item>
        </div>

        <div className="flex items-center gap-8">
          <Form.Item name="price" noStyle>
            <div className="flex flex-col items-center">
              <PreviewInput
                className="text-3xl text-primary text-center"
                value={formatCurrency(price)}
              />
              <span className="text-xs text-textSubtle text-center">
                {t('Course price')}
              </span>
            </div>
          </Form.Item>

          <div className="w-[2px] h-5 bg-slate-400"></div>

          <Form.Item name="attendance" noStyle>
            <div className="flex flex-col items-center">
              <PreviewInput
                className="text-3xl text-primary text-center"
                value={formatCurrency(price * attendance)}
              />
              <span className="text-xs text-textSubtle text-center">
                {t('Revenue')}
              </span>
            </div>
          </Form.Item>
        </div>
      </div>
    </div>
  )
}

export default Preview
