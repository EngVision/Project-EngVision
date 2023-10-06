import { Form } from 'antd'
import { StarIcon } from '../../../../components/Icons'
import PreviewInput from '../../../../components/common/PreviewInput'

interface PreviewProps {
  form: any
}

const Preview = ({ form }: PreviewProps) => {
  return (
    <div className="flex h-[12rem] mb-8 select-none">
      <div className="h-full w-[18.75rem] mr-8">
        <img
          className="object-cover w-full h-full rounded-md"
          src={`${import.meta.env.VITE_SERVER_FILES_URL}${form.getFieldValue(
            'thumbnail',
          )}`}
          alt="thumbnail"
        />
      </div>
      <div className="flex flex-col h-full justify-between flex-1">
        <div className="flex text-sm">
          <div className="mr-6">
            Publish: <span className="font-bold">10/12/2021</span>
          </div>
          <div>
            Last Update: <span className="font-bold">10/12/2021</span>
          </div>
        </div>

        <Form.Item name="title">
          <PreviewInput className="font-semibold text-2xl" />
        </Form.Item>

        <Form.Item name="about">
          <PreviewInput />
        </Form.Item>

        <div className="flex items-center leading-6">
          <StarIcon className="text-[#FD6267] mr-1.5" />
          <span className="mr-1.5 font-bold">3.8</span>
          <div className="mr-1.5 text-[#706E68]">(451,444 Rating)</div>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex flex-col items-center">
            <Form.Item name="price">
              <PreviewInput className="text-3xl text-primary text-center" />
            </Form.Item>
            <span className="text-xs text-textSubtle">Course price</span>
          </div>

          <div className="w-[2px] h-5 bg-slate-400"></div>

          <div className="flex flex-col items-center">
            <Form.Item name="price">
              <PreviewInput className="text-3xl text-primary text-center" />
            </Form.Item>
            <span className="text-xs text-textSubtle">Revenue</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Preview
