import { Form } from 'antd'
import { StarIcon } from '../../../components/Icons'
import PreviewInput from '../../../components/common/PreviewInput'
import { FormInstance, useWatch } from 'antd/lib/form/Form'
import CustomImage from '../../../components/common/CustomImage'

interface PreviewProps {
  form: FormInstance
}

const Preview = ({ form }: PreviewProps) => {
  const thumbnail = useWatch('thumbnail', form)
  return (
    <div className="flex flex-col gap-4 min-h-[12rem] select-none lg:flex-row">
      <CustomImage
        className="object-cover min-w-[300px] h-[12rem] rounded-md"
        src={`${import.meta.env.VITE_SERVER_FILES_URL}${thumbnail}`}
      />
      <div className="flex flex-col h-full justify-between flex-1 gap-2">
        <div className="flex text-sm justify-between">
          <div className="mr-6">
            Publish: <span className="font-bold">10/12/2021</span>
          </div>
          <div>
            Last Update: <span className="font-bold">10/12/2021</span>
          </div>
        </div>

        <Form.Item name="title" noStyle>
          <PreviewInput className="font-semibold text-2xl" />
        </Form.Item>

        <Form.Item name="about" noStyle>
          <PreviewInput className="text-base" />
        </Form.Item>

        <div className="flex items-center leading-6">
          <StarIcon className="text-[#FD6267] mr-1.5" />
          <span className="mr-1.5 font-bold">3.8</span>
          <div className="mr-1.5 text-[#706E68]">(451,444 Rating)</div>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex flex-col items-center">
            <Form.Item name="price" noStyle>
              <PreviewInput className="text-3xl text-primary text-center" />
            </Form.Item>
            <span className="text-xs text-textSubtle text-center">
              Course price
            </span>
          </div>

          <div className="w-[2px] h-5 bg-slate-400"></div>

          <div className="flex flex-col items-center">
            <Form.Item name="price" noStyle>
              <PreviewInput className="text-3xl text-primary text-center" />
            </Form.Item>
            <span className="text-xs text-textSubtle text-center">Revenue</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Preview
