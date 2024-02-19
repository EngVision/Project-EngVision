import { DeleteOutlined } from '@ant-design/icons'
import { Button, Divider, Form, Input, InputNumber, Select } from 'antd'
import { FormSubmit } from '../..'
import {
  ExerciseSchema,
  QuestionPayload,
} from '../../../../../services/exerciseApi/types'
import { CEFRLevel, ExerciseTag } from '../../../../../utils/constants'
import enumToSelectOptions from '../../../../../utils/enumsToSelectOptions'
import ExerciseTagInput, { getTagList } from '../ExerciseTagInput'

interface ContentFormProps {
  index: number
  remove: ((index: number) => void) | null
}

const ContentForm = ({ index, remove }: ContentFormProps) => {
  return (
    <div className="flex flex-col ">
      <div className="flex gap-10 justify-between items-center">
        <div className="flex-1 flex gap-4 w-full">
          <Form.Item
            className="flex-1 m-0"
            name={[index]}
            rules={[{ required: true }]}
          >
            <Input placeholder="Word" />
          </Form.Item>
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

      <div className="flex gap-4 justify-between">
        <Form.Item
          name={[index, 'num_col']}
          label="Number of column"
          className="flex-1"
        >
          <InputNumber
            className="w-full"
            placeholder="Number of column (optional)"
          />
        </Form.Item>

        <Form.Item
          name={[index, 'num_row']}
          label="Number of row"
          className="flex-1"
        >
          <InputNumber
            className="w-full"
            placeholder="Number of row (optional)"
          />
        </Form.Item>
      </div>

      <p className="my-2 flex items-center gap-1">
        <span className="text-[#ff4d4f] flex items-center h-1">*</span> Words to
        find
      </p>
      <Form.List name={[index, 'answers']}>
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
                Add word
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

interface QuestionFormSchema {
  questionText: string
  questionTags: ExerciseTag[]
  questionLevel: CEFRLevel
  explanation?: string
  answers: string[]
  num_row: number
  num_col: number
  firstColumnUseImage?: boolean
  secondColumnUseImage?: boolean
  id?: string
}

interface WordSearchPayload extends QuestionPayload {
  question: {
    text: string
    words: string[]
    col?: number
    row?: number
    rows?: string[][]
  }
}

const transformSubmitData = (exercise: any) => {
  const { content } = exercise

  exercise.content = content.map((question: QuestionFormSchema) => {
    const transformQuestion: WordSearchPayload = {
      id: question.id,
      tags: getTagList(question.questionTags as any),
      level: question.questionLevel,
      question: {
        text: question.questionText,
        words: question.answers,
        col: question.num_col,
        row: question.num_row,
      },
    }

    return transformQuestion
  })
}

function setInitialContent(this: FormSubmit, exercise: ExerciseSchema) {
  const { content } = exercise

  const transformedContent = content.map((q: WordSearchPayload) => {
    const questionForm: QuestionFormSchema = {
      id: q.id,
      questionText: q.question.text,
      questionTags: q.tags,
      questionLevel: q.level,
      explanation: q.correctAnswer?.explanation,
      answers: q.question.words,
      num_row: q.question.rows?.length || 0,
      num_col: q.question.rows?.[0]?.length || 0,
    }

    return questionForm
  })

  this.setFieldValue('content', transformedContent)
}

function WordSearchForm({ form }: { form: FormSubmit }) {
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

export default WordSearchForm
