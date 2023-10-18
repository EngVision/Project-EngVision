import {
  Button,
  DatePicker,
  Form,
  FormInstance,
  Input,
  Select,
  message,
} from 'antd'
import { useEffect, useRef } from 'react'
import ConstructedResponseForm from './components/ConstructedResponseForm'
import MultipleChoiceForm from './components/MultipleChoiceForm'
import { useNavigate, useParams } from 'react-router-dom'
import { CEFRLevel, ExerciseTag, ExerciseType } from '../../../utils/constants'
import enumToSelectOptions from '../../../utils/enumsToSelectOptions'
import { ExerciseSchema } from '../../../services/exerciseApi/types'
import exerciseApi from '../../../services/exerciseApi'
import coursesApi from '../../../services/coursesApi'
import FillBlankForm from './components/FillBlankForm'
import dayjs, { Dayjs } from 'dayjs'

interface GeneralInfo {
  type: ExerciseType
  title: string
  description?: string
  deadline?: Dayjs
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
          <DatePicker
            showTime
            placeholder="Deadline (optional)"
            className="w-full"
          />
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
      return <FillBlankForm form={form} />
    case ExerciseType.ConstructedResponse:
      return <ConstructedResponseForm form={form} />
    default:
      return <></>
  }
}

export interface FormSubmit extends FormInstance {
  transform: (values: ExerciseSchema) => void
  setInitialContent: (values: ExerciseSchema) => void
  addQuestion: () => void
}

interface FormSchema extends GeneralInfo {
  content: any[]
}

function ManageExercise() {
  const bottomDivRef = useRef<null | HTMLDivElement>(null)
  const [form] = Form.useForm<FormSchema>()
  const type = Form.useWatch('type', form)

  const navigate = useNavigate()

  const { lessonId, exerciseId } = useParams()

  useEffect(() => {
    getExercise()
  }, [])

  const getExercise = async () => {
    if (exerciseId) {
      const res = await exerciseApi.getExercise(exerciseId)

      setInitialValues(form as FormSubmit, res)
    }
  }

  const setInitialValues = (formSubmit: FormSubmit, value: ExerciseSchema) => {
    const valueForm = {
      ...value,
      deadline: value.deadline ? dayjs(value.deadline) : undefined,
    }
    formSubmit.setFieldsValue(valueForm)

    setTimeout(() => {
      formSubmit.setInitialContent(valueForm)
    }, 100)
  }

  const onSubmit = async (values: ExerciseSchema, formSubmit: FormSubmit) => {
    formSubmit.transform(values)

    try {
      message.open({
        key: 'submitMessage',
        content: 'loading',
        type: 'loading',
      })

      if (exerciseId) {
        const res = await exerciseApi.updateExercise(exerciseId, values)

        setInitialValues(form as FormSubmit, res)
      } else {
        const { id } = await exerciseApi.createExercise(values)

        if (lessonId && id) {
          await coursesApi.addExercise(lessonId, id)

          navigate('..', { relative: 'path' })
        }
      }

      message.open({
        key: 'submitMessage',
        content: exerciseId ? 'Saved' : 'Created',
        type: 'success',
      })
    } catch (error) {
      console.log(error)
      message.open({
        key: 'submitMessage',
        content: error.response?.data?.message,
        type: 'error',
      })
    }
  }

  const addQuestion = (formSubmit: FormSubmit) => {
    formSubmit.addQuestion()
    setTimeout(() => {
      bottomDivRef?.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      })
    }, 0)
  }

  return (
    <Form
      className="flex flex-col h-full"
      form={form}
      onFinish={async (v) => onSubmit(v, form as FormSubmit)}
      layout="vertical"
      scrollToFirstError
    >
      <div className="overflow-y-scroll px-8 pb-4">
        <div className="flex items-center justify-between my-4">
          <p className="text-2xl font-bold">General</p>
        </div>
        <GeneralInfoForm />
        <p className="text-2xl font-bold my-5">Exercise content</p>
        <ExerciseForm type={type} form={form as FormSubmit} />
        <div style={{ float: 'left', clear: 'both' }} ref={bottomDivRef}></div>
      </div>
      <div
        className="flex flex-col gap-4 pt-4 px-8 mr-4 z-10"
        style={{ boxShadow: '0px -15px 10px -20px' }}
      >
        {type && (
          <Form.Item noStyle>
            <Button
              type="dashed"
              block
              icon={'+'}
              onClick={() => addQuestion(form as FormSubmit)}
            >
              Add question
            </Button>
          </Form.Item>
        )}
        <Form.Item noStyle>
          <Button type="primary" htmlType="submit" block>
            {exerciseId ? 'Save' : 'Create'}
          </Button>
        </Form.Item>
      </div>
    </Form>
  )
}

export default ManageExercise
