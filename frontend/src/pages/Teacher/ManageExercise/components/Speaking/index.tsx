import { Button, Divider, Form, Input, Select } from 'antd'
import { FormSubmit } from '../..'
import {
  CEFRLevel,
  ExerciseCardType,
  ExerciseTag,
  UPLOAD_FILE_URL,
} from '../../../../../utils/constants'
import enumToSelectOptions from '../../../../../utils/enumsToSelectOptions'
import {
  ExerciseSchema,
  QuestionPayload,
} from '../../../../../services/exerciseApi/types'
import NewQuestionForm from './NewQuestionForm'
import PreviewInput from '../../../../../components/common/PreviewInput'
import CustomImage from '../../../../../components/common/CustomImage'

interface QuestionFormProps {
  index: number
  remove: ((index: number) => void) | null
}

const QuestionForm = ({ index, remove }: QuestionFormProps) => {
  const form = Form.useFormInstance()
  const content = Form.useWatch('content', form)
  const exerciseType = content?.[index]?.exerciseType || ExerciseCardType.Text
  const items = content?.[index]?.items || []

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <p className="text-xl font-bold my-2">Question {index + 1}</p>
        {remove && (
          <Button danger type="primary" onClick={() => remove(index)}>
            Remove
          </Button>
        )}
      </div>

      <NewQuestionForm index={index} />
      <Form.Item name={[index, 'exerciseType']} noStyle></Form.Item>

      <Form.List name={[index, 'items']}>
        {(fields) =>
          fields.length > 0 && (
            <div className="flex gap-4 mb-4 flex-wrap border border-primary border-dashed p-3 rounded-lg select-none">
              {fields.map((field) => (
                <div className="border border-primary border-solid p-2 rounded-lg w-40 flex justify-center items-center">
                  <Form.Item name={[field.name]} noStyle>
                    {exerciseType === ExerciseCardType.Text ? (
                      <PreviewInput
                        placeholder="New card"
                        className="w-full text-center"
                      />
                    ) : (
                      <CustomImage
                        className="hidden lg:block object-cover w-20 h-20 rounded-md"
                        src={`${UPLOAD_FILE_URL}${items[field.name]}`}
                      />
                    )}
                  </Form.Item>
                </div>
              ))}
            </div>
          )
        }
      </Form.List>

      <Form.Item label="Explanation" name={[index, 'explanation']}>
        <Input.TextArea
          autoSize={{ minRows: 2, maxRows: 4 }}
          placeholder="Explanation (optional)"
        />
      </Form.Item>
      <div className="flex gap-4">
        <div className="flex-1 grid grid-cols-2 gap-4">
          <Form.Item
            label="Tags"
            name={[index, 'questionTags']}
            rules={[{ required: true }]}
          >
            <Select
              mode="multiple"
              allowClear
              placeholder="Tags"
              maxTagCount="responsive"
              options={enumToSelectOptions(ExerciseTag)}
            />
          </Form.Item>
          <Form.Item
            label="Level"
            name={[index, 'questionLevel']}
            rules={[{ required: true }]}
          >
            <Select
              placeholder="Level"
              options={enumToSelectOptions(CEFRLevel)}
            />
          </Form.Item>
        </div>
      </div>
    </>
  )
}

const Tutorial = () => {
  return <p className="mb-5">Add cards to question</p>
}

interface QuestionFormSchema {
  text: string
  questionTags: ExerciseTag[]
  questionLevel: CEFRLevel
  explanation: string
  id?: string
  countdown: number
}

interface SpeakingPayload extends QuestionPayload {
  question: {
    text: string
    countdown: number
    audio?: string
    image?: string
  }
}

const transformSubmitData = (exercise: any) => {
  const { content } = exercise

  exercise.content = content.map((question: QuestionFormSchema) => {
    const transformQuestion: SpeakingPayload = {
      id: question.id,
      tags: question.questionTags,
      level: question.questionLevel,
      question: {
        text: question.text,
        countdown: question.countdown,
      },
      correctAnswer: null,
    }

    return transformQuestion
  })
}

function setInitialContent(this: FormSubmit, exercise: ExerciseSchema) {
  const { content } = exercise

  const transformedContent = content.map((q: SpeakingPayload) => {
    const {
      question: { text, countdown },
    } = q

    const questionForm: QuestionFormSchema = {
      id: q.id,
      questionTags: q.tags,
      questionLevel: q.level,
      explanation: q.correctAnswer?.explanation,
      text: text,
      countdown: countdown,
    }

    return questionForm
  })

  this.setFieldValue('content', transformedContent)
}

function SpeakingForm({ form }: { form: FormSubmit }) {
  form.transform = transformSubmitData
  form.setInitialContent = setInitialContent

  return (
    <>
      <Tutorial />
      <Form.List name="content" initialValue={[{}]}>
        {(fields, { add, remove }) => {
          form.addQuestion = add

          return fields.map(({ key, name }) => (
            <div key={key}>
              <QuestionForm
                index={name}
                remove={fields.length > 1 ? remove : null}
              />
              <Divider />
            </div>
          ))
        }}
      </Form.List>
    </>
  )
}

export default SpeakingForm