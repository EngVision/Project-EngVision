import { Button, Checkbox, Divider, Form, Input, Select } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { FormSubmit } from '../..'
import CustomUpload from '../../../../../components/CustomUpload'
import {
  ExerciseSchema,
  QuestionPayload,
} from '../../../../../services/exerciseApi/types'
import { CEFRLevel, ExerciseTag } from '../../../../../utils/constants'
import enumToSelectOptions from '../../../../../utils/enumsToSelectOptions'

interface QuestionFormProps {
  needGrade: boolean
  index: number
  remove: ((index: number) => void) | null
}

const QuestionForm = ({ needGrade, index, remove }: QuestionFormProps) => {
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
      <Form.Item
        className="flex-1"
        label="Question"
        name={[index, 'questionText']}
        rules={[{ required: true }]}
      >
        <Input.TextArea
          autoSize={{ minRows: 2, maxRows: 4 }}
          placeholder="Question"
        />
      </Form.Item>
      <div className="flex gap-4 w-full">
        <div className="flex-1">
          <Form.Item
            label="Question image"
            className="max-w-[200px]"
            name={[index, 'questionImage']}
            valuePropName="fileList"
          >
            <CustomUpload />
          </Form.Item>
        </div>
        <div className="flex-1">
          <Form.Item
            label="Question audio"
            className="max-w-[200px]"
            name={[index, 'questionAudio']}
            valuePropName="fileList"
          >
            <CustomUpload accept="audio" />
          </Form.Item>
        </div>
      </div>
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
      <div className="flex gap-8 w-full">
        <Form.Item
          label="Answer"
          name={[index, 'answer']}
          className="flex-1"
          rules={[{ required: !needGrade }]}
        >
          <TextArea
            placeholder="Answer"
            autoSize={{ minRows: 2, maxRows: 4 }}
            disabled={needGrade}
          />
        </Form.Item>
      </div>
      <Form.Item label="Explanation" name={[index, 'explanation']}>
        <Input.TextArea
          autoSize={{ minRows: 2, maxRows: 4 }}
          placeholder="Explanation (optional)"
        />
      </Form.Item>
    </>
  )
}

interface QuestionFormSchema {
  questionText: string
  questionImage: string
  questionAudio: string
  questionTags: ExerciseTag[]
  questionLevel: CEFRLevel
  explanation: string
  answer: string
  id?: string
}

interface ConstructedResponsePayload extends QuestionPayload {
  question: {
    text: string
    image: string
    audio: string
  }
  correctAnswer: {
    detail: string | null
    explanation: string
  }
  tags: ExerciseTag[]
  level: CEFRLevel
}

const transformSubmitData = (exercise: any) => {
  const { content, needGrade } = exercise

  exercise.content = content.map((question: QuestionFormSchema) => {
    const transformQuestion: ConstructedResponsePayload = {
      tags: question.questionTags,
      level: question.questionLevel,
      question: {
        text: question.questionText,
        image: question.questionImage,
        audio: question.questionAudio,
      },
      correctAnswer: {
        detail: needGrade ? null : question.answer,
        explanation: question.explanation,
      },
    }

    return transformQuestion
  })
}

function setInitialContent(this: FormSubmit, exercise: ExerciseSchema) {
  const { content } = exercise

  const transformedContent = content.map((q: ConstructedResponsePayload) => {
    const questionForm: QuestionFormSchema = {
      id: q.id,
      questionText: q.question.text,
      questionImage: q.question.image,
      questionAudio: q.question.audio,
      questionTags: q.tags,
      questionLevel: q.level,
      explanation: q.correctAnswer?.explanation,
      answer: q.correctAnswer?.detail ? q.correctAnswer?.detail : '',
    }
    return questionForm
  })

  this.setFieldValue('content', transformedContent)
}

function ConstructedResponseForm({ form }: { form: FormSubmit }) {
  const needGrade = Form.useWatch('needGrade', form)

  form.transform = transformSubmitData
  form.setInitialContent = setInitialContent

  return (
    <>
      <Form.Item name="needGrade" valuePropName="checked">
        <Checkbox>Need grade</Checkbox>
      </Form.Item>
      <Form.List name="content" initialValue={[{}]}>
        {(fields, { add, remove }) => {
          form.addQuestion = add

          return fields.map(({ key, name }) => (
            <div key={key}>
              <QuestionForm
                needGrade={needGrade}
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
export default ConstructedResponseForm
