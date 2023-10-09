import {
  Button,
  DatePicker,
  Form,
  FormInstance,
  Input,
  Select,
  message,
} from 'antd'
import exerciseApi from '../../services/exerciseApi'
import { CEFRLevel, ExerciseTag, ExerciseType } from '../../utils/constants'
import enumToSelectOptions from '../../utils/enumsToSelectOptions'
import MultipleChoiceForm from './components/MultipleChoiceForm'

interface GeneralInfo {
  type: ExerciseType
  title: string
  description?: string
  deadline?: Date
  tags?: ExerciseTag[]
  level?: CEFRLevel
}

const GeneralInfoForm = () => {
  return (
    <>
      <Form.Item<GeneralInfo>
        label="Title"
        name="title"
        rules={[{ required: true }]}
      >
        <Input placeholder="Title" />
      </Form.Item>
      <Form.Item<GeneralInfo> label="Description" name="description">
        <Input.TextArea placeholder="Description (optional)" />
      </Form.Item>
      <div className="grid grid-cols-2 gap-4">
        <Form.Item<GeneralInfo>
          label="Exercise type"
          name="type"
          rules={[{ required: true }]}
        >
          <Select
            placeholder="Exercise type"
            options={enumToSelectOptions(ExerciseType)}
          />
        </Form.Item>
        <Form.Item<GeneralInfo> label="Deadline" name="deadline">
          <DatePicker placeholder="Deadline (optional)" className="w-full" />
        </Form.Item>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Form.Item<GeneralInfo>
          label="Exercise tags"
          name="tags"
          rules={[{ required: true }]}
        >
          <Select
            mode="multiple"
            allowClear
            placeholder="Exercise tags"
            maxTagCount="responsive"
            options={enumToSelectOptions(ExerciseTag)}
          />
        </Form.Item>
        <Form.Item<GeneralInfo>
          label="Exercise level"
          name="level"
          rules={[{ required: true }]}
        >
          <Select
            placeholder="Exercise level"
            options={enumToSelectOptions(CEFRLevel)}
          />
        </Form.Item>
      </div>
    </>
  )
}

interface ExerciseFormProps {
  type: ExerciseType
  form: FormSubmit
}

const ExerciseForm = ({ type, form }: ExerciseFormProps) => {
  switch (type) {
    case ExerciseType.MultipleChoice:
      return <MultipleChoiceForm form={form} />
    case ExerciseType.FillBlank:
      return <></>
    default:
      return <></>
  }
}

export interface FormSubmit extends FormInstance {
  transform: (values: any) => void
}

function ManageExercise() {
  const [form] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()

  const type = Form.useWatch('type', form)

  const onSubmit = async (values: any, formSubmit: FormSubmit) => {
    console.log(values)
    // formSubmit.transform(values)
    // try {
    //   messageApi.open({
    //     key: 'submitMessage',
    //     content: 'loading',
    //     type: 'loading',
    //   })

    //   await exerciseApi.createExercise(values)

    //   messageApi.open({
    //     key: 'submitMessage',
    //     content: 'done',
    //     type: 'success',
    //   })
    // } catch (error) {
    //   console.log(error)
    //   messageApi.open({
    //     key: 'submitMessage',
    //     content: error.response?.data?.message,
    //     type: 'error',
    //   })
    // }
  }

  return (
    <>
      {contextHolder}
      <Form
        form={form}
        onFinish={async (v) => onSubmit(v, form as FormSubmit)}
        layout="vertical"
      >
        <div className="flex items-center justify-between my-4">
          <p className="text-2xl font-bold">General</p>
        </div>
        <GeneralInfoForm />
        <p className="text-2xl font-bold my-5">Exercise content</p>
        <ExerciseForm type={type} form={form as FormSubmit} />
        <div className="sticky bottom-0 my-6">
          <Form.Item noStyle>
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>
    </>
  )
}

export default ManageExercise
