import { Button, Divider, Form, Input, Select } from 'antd'
import { FormSubmit } from '../..'
import CustomUpload from '../../../../../components/CustomUpload'
import {
  ExerciseSchema,
  QuestionPayload,
} from '../../../../../services/exerciseApi/types'
import { CEFRLevel, ExerciseTag } from '../../../../../utils/constants'
import enumToSelectOptions from '../../../../../utils/enumsToSelectOptions'

interface ContentFormProps {
  index: number
  remove: ((index: number) => void) | null
}

const ContentForm = ({ index, remove }: ContentFormProps) => {
  return (
    <div className="flex gap-32 justify-between">
      <div className="flex gap-4 flex-1">
        <div className="flex-1 flex gap-4">
          <Form.Item
            className="flex-1"
            name={[index, 'content1']}
            rules={[{ required: true }]}
          >
            <Input placeholder="Answer" />
          </Form.Item>
          <Form.Item
            className="max-w-[100px]"
            name={[index, 'content1Image']}
            valuePropName="fileList"
          >
            <CustomUpload />
          </Form.Item>
        </div>
        {remove && (
          <Button danger type="primary" onClick={() => remove(index)}>
            Remove
          </Button>
        )}
      </div>

      <div className="flex gap-4 flex-1">
        <div className="flex-1 flex gap-4">
          <Form.Item
            className="flex-1"
            name={[index, 'content2']}
            rules={[{ required: true }]}
          >
            <Input placeholder="Answer" />
          </Form.Item>
          <Form.Item
            className="max-w-[100px]"
            name={[index, 'content2Image']}
            valuePropName="fileList"
          >
            <CustomUpload />
          </Form.Item>
        </div>
        {remove && (
          <Button danger type="primary" onClick={() => remove(index)}>
            Remove
          </Button>
        )}
      </div>
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
      <p className="my-2">Contents</p>
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
    </>
  )
}

interface QuestionFormSchema {
  questionText: string
  questionTags: ExerciseTag[]
  questionLevel: CEFRLevel
  explanation?: string
  answers: ContentFormSchema[]
  id?: string
}

interface ContentFormSchema {
  id: number
  answerText: string
  answerImage: string | null
  correctAnswer: boolean
}

interface MatchPayload extends QuestionPayload {
  question: {
    text: string
    answers: {
      id: number
      text: string
      image: string | null
    }[]
  }
  correctAnswer: {
    detail: number[]
    explanation?: string
  }
}

const transformSubmitData = (exercise: any) => {
  const { content } = exercise

  content.forEach((question: QuestionFormSchema) => {
    question.answers = question.answers.map((v, i) => ({ ...v, id: i }))
  })

  exercise.content = content.map((question: QuestionFormSchema) => {
    const transformQuestion: MatchPayload = {
      id: question.id,
      tags: question.questionTags,
      level: question.questionLevel,
      question: {
        text: question.questionText,
        answers: question.answers.map((ans) => ({
          id: ans.id,
          text: ans.answerText,
          image: ans.answerImage,
        })),
      },
      correctAnswer: {
        detail: question.answers
          .filter((ans) => ans.correctAnswer)
          .map((ans) => ans.id),
        explanation: question.explanation,
      },
    }

    return transformQuestion
  })
}

function setInitialContent(this: FormSubmit, exercise: ExerciseSchema) {
  const { content } = exercise

  const transformedContent = content.map((q: MatchPayload) => {
    const questionForm: QuestionFormSchema = {
      id: q.id,
      questionText: q.question.text,
      questionTags: q.tags,
      questionLevel: q.level,
      explanation: q.correctAnswer?.explanation,
      answers: q.question.answers.map(
        (ans): ContentFormSchema => ({
          id: ans.id,
          answerText: ans.text,
          answerImage: ans.image,
          correctAnswer: q.correctAnswer.detail.includes(ans.id),
        }),
      ),
    }

    return questionForm
  })

  this.setFieldValue('content', transformedContent)
}

function MatchForm({ form }: { form: FormSubmit }) {
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

export default MatchForm
