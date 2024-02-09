import { Button, Divider, Form, Input, Select } from 'antd'
import { FormSubmit } from '../..'
import CustomImage from '../../../../../components/common/CustomImage'
import PreviewInput from '../../../../../components/common/PreviewInput'
import {
  ExerciseSchema,
  QuestionPayload,
} from '../../../../../services/exerciseApi/types'
import {
  CEFRLevel,
  ExerciseCardType,
  ExerciseTag,
  UPLOAD_FILE_URL,
} from '../../../../../utils/constants'
import enumToSelectOptions from '../../../../../utils/enumsToSelectOptions'
import ExerciseTagInput, {
  getTagList,
  transformToExerciseTagInputValue,
} from '../ExerciseTagInput'
import NewQuestionForm from './NewQuestionForm'

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
            <ExerciseTagInput />
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
  items: string[]
  questionTags: ExerciseTag[]
  questionLevel: CEFRLevel
  explanation: string
  id?: string
  exerciseType?: ExerciseCardType
}

interface UnscramblePayload extends QuestionPayload {
  question: {
    items: string[]
    isUnscrambleByText: boolean
  }
}

const transformSubmitData = (exercise: any) => {
  const { content } = exercise

  exercise.content = content.map((question: QuestionFormSchema) => {
    const transformQuestion: UnscramblePayload = {
      id: question.id,
      tags: getTagList(question.questionTags as any),
      level: question.questionLevel,
      question: {
        items: question.items,
        isUnscrambleByText:
          !question.exerciseType ||
          question.exerciseType === ExerciseCardType.Text,
      },
      correctAnswer: null,
    }

    return transformQuestion
  })
}

function setInitialContent(this: FormSubmit, exercise: ExerciseSchema) {
  const { content } = exercise

  const transformedContent = content.map((q: UnscramblePayload) => {
    const {
      question: { items, isUnscrambleByText },
    } = q

    const questionForm: QuestionFormSchema = {
      id: q.id,
      questionTags: transformToExerciseTagInputValue(q.tags),
      questionLevel: q.level,
      explanation: q.correctAnswer?.explanation,
      items: q.correctAnswer?.detail || items,
      exerciseType: isUnscrambleByText
        ? ExerciseCardType.Text
        : ExerciseCardType.Image,
    }

    return questionForm
  })

  this.setFieldValue('content', transformedContent)
}

function UnscrambleForm({ form }: { form: FormSubmit }) {
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

export default UnscrambleForm
