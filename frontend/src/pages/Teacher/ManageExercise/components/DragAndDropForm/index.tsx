import { Button, Divider, Form, Input, Select } from 'antd'
import { FormSubmit } from '../..'
import CustomUpload from '../../../../../components/CustomUpload'
import {
  ExerciseSchema,
  QuestionPayload,
} from '../../../../../services/exerciseApi/types'
import { CEFRLevel, ExerciseTag } from '../../../../../utils/constants'
import enumToSelectOptions from '../../../../../utils/enumsToSelectOptions'
import { DeleteOutlined } from '@ant-design/icons'
import ExerciseTagInput, { getTagList } from '../ExerciseTagInput'

interface ContentFormProps {
  index: number
  remove: ((index: number) => void) | null
}

const ContentForm = ({ index, remove }: ContentFormProps) => {
  return (
    <div className="flex flex-col ">
      <div className="flex gap-10 justify-between items-center">
        <div className="flex flex-col lg:flex-row gap-10 flex-1 items-center">
          <div className="flex-1 flex gap-4 w-full">
            <Form.Item
              className="m-0"
              name={[index, 'image']}
              valuePropName="fileList"
              rules={[{ required: true }]}
            >
              <CustomUpload type="picture-card" />
            </Form.Item>
          </div>

          <div className="flex-1 flex gap-4 w-full">
            <Form.Item
              className="flex-1 m-0"
              name={[index, 'text']}
              rules={[{ required: true }]}
            >
              <Input placeholder="Answer" />
            </Form.Item>
          </div>
        </div>

        {remove && (
          <Button
            danger
            type="primary"
            onClick={() => remove(index)}
            icon={<DeleteOutlined />}
          ></Button>
        )}
      </div>

      <Divider />
    </div>
  )
}

interface QuestionFormProps {
  index: number
  remove: ((index: number) => void) | null
}

const QuestionForm = ({ index, remove }: QuestionFormProps) => {
  const form = Form.useFormInstance()
  const content = Form.useWatch('content', form)
  const answers = content ? content[index].answers : []

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
      <div className="flex">
        <Form.Item
          className="flex-1"
          label="Question"
          name={[index, 'questionText']}
          rules={[{ required: true }]}
        >
          <Input.TextArea
            className="h-full"
            autoSize={{ minRows: 2, maxRows: 4 }}
            placeholder="Question"
          />
        </Form.Item>
      </div>

      <p className="my-2 flex items-center gap-1">
        <span className="text-secondary flex items-center h-1">*</span> Contents
      </p>
      <div
        className="flex justify-between mb-4 gap-10"
        style={{ marginRight: answers?.length > 1 ? 80 : 0 }}
      >
        <div className="flex justify-between gap-4 flex-1">
          <b className="uppercase">Question Image</b>
        </div>

        <div className="flex justify-between gap-4 flex-1">
          <b className="uppercase">Answer</b>
        </div>
      </div>
      <Form.List name={[index, 'answers']} initialValue={[{}]}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name }) => {
              return (
                <ContentForm
                  key={key}
                  index={name}
                  remove={fields.length > 1 ? remove : null}
                />
              )
            })}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={'+'}>
                Add content
              </Button>
            </Form.Item>
          </>
        )}
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

interface AnswerFormSchema {
  image?: string
  text?: string
}

interface QuestionFormSchema {
  questionText: string
  questionTags: ExerciseTag[]
  questionLevel: CEFRLevel
  explanation?: string
  answers: AnswerFormSchema[]
  id?: string
}

interface DragAndDropPayLoad extends QuestionPayload {
  question: {
    text: string
    answers: AnswerFormSchema[]
  }
}

const transformSubmitData = (exercise: any) => {
  const { content } = exercise

  exercise.content = content.map((question: QuestionFormSchema) => {
    const transformQuestion: DragAndDropPayLoad = {
      id: question.id,
      tags: getTagList(question.questionTags as any),
      level: question.questionLevel,
      question: {
        text: question.questionText,
        answers: question.answers.map((ans) => {
          return {
            image: ans.image,
            text: ans.text,
          }
        }),
      },
    }
    return transformQuestion
  })
}

function setInitialContent(this: FormSubmit, exercise: ExerciseSchema) {
  const { content } = exercise

  const transformedContent = content.map((q: DragAndDropPayLoad) => {
    const questionForm: QuestionFormSchema = {
      id: q.id,
      questionText: q.question.text,
      questionTags: q.tags,
      questionLevel: q.level,
      explanation: q.correctAnswer?.explanation,
      answers: q.question.answers.map((ans): AnswerFormSchema => {
        const result: AnswerFormSchema = {}

        result.image = ans.image

        result.text = ans.text

        return result
      }),
    }

    return questionForm
  })

  this.setFieldValue('content', transformedContent)
}

function DragAndDropForm({ form }: { form: FormSubmit }) {
  form.transform = transformSubmitData
  form.setInitialContent = setInitialContent

  return (
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
  )
}

export default DragAndDropForm
