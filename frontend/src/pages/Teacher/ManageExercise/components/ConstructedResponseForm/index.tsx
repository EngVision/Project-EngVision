import { Button, Checkbox, Divider, Form, Input, Select, Upload } from 'antd'
import { FormSubmit } from '../..'
import TextArea from 'antd/es/input/TextArea'
import { useState } from 'react'
import enumToSelectOptions from '../../../../../utils/enumsToSelectOptions'
import { CEFRLevel, ExerciseTag } from '../../../../../utils/constants'

interface QuestionFormProps {
  index: number
  remove: ((index: number) => void) | null
}

const QuestionForm = ({ index, remove }: QuestionFormProps) => {
  const [isStrict, setStrict] = useState<boolean>(false)

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
            className="max-w-[200px]"
            name={[index, 'questionImage']}
            label="Question image"
            valuePropName="file"
            getValueFromEvent={(event) => {
              return event.file.status === 'done'
                ? event.file.response?.data.fileId
                : null
            }}
          >
            <Upload
              action={`${import.meta.env.VITE_BASE_URL}/files`}
              withCredentials
              maxCount={1}
              accept="image/*"
            >
              <Button>Upload image</Button>
            </Upload>
          </Form.Item>
        </div>
        <div className="flex-1">
          <Form.Item
            className="max-w-[200px]"
            name={[index, 'questionAudio']}
            label="Question audio"
            valuePropName="file"
            getValueFromEvent={(event) => {
              return event.file.status === 'done'
                ? event.file.response?.data.fileId
                : null
            }}
          >
            <Upload
              className="flex-1"
              action={`${import.meta.env.VITE_BASE_URL}/files`}
              withCredentials
              maxCount={1}
              accept="audio/*"
            >
              <Button>Upload audio</Button>
            </Upload>
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
          rules={[{ required: !isStrict }]}
        >
          <TextArea
            placeholder="Answer (Optional)"
            autoSize={{ minRows: 2, maxRows: 4 }}
            disabled={isStrict}
          />
        </Form.Item>
        <Form.Item
          name={[index, 'strict']}
          valuePropName="checked"
          rules={[
            ({ setFieldValue }) => ({
              async validator(_, value) {
                if (value) {
                  setFieldValue(['content', index, 'answer'], '')
                  setFieldValue(['content', index, 'explanation'], '')
                }
              },
            }),
          ]}
        >
          <Checkbox onChange={() => setStrict(!isStrict)}>Strict</Checkbox>
        </Form.Item>
      </div>
      <Form.Item label="Explanation" name={[index, 'explanation']}>
        <Input.TextArea
          autoSize={{ minRows: 2, maxRows: 4 }}
          placeholder="Explanation (optional)"
          disabled={isStrict}
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
  strict: boolean
}

interface ConstructedResponsePayload {
  question: {
    text: string
    image: string | null
    audio: string | null
  }
  correctAnswer: {
    detail: string | null
    explanation: string
  }
  tags: ExerciseTag[]
  level: CEFRLevel
}

const transformSubmitData = (exercise: any) => {
  const { content } = exercise

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
        detail: question.strict ? null : question.answer,
        explanation: question.explanation,
      },
    }

    return transformQuestion
  })
}

function ConstructedResponseForm({ form }: { form: FormSubmit }) {
  form.transform = transformSubmitData

  return (
    <>
      <Form.List name="content" initialValue={[{}]}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name }) => (
              <div key={key}>
                <QuestionForm
                  index={name}
                  remove={fields.length > 1 ? remove : null}
                />
                <Divider />
              </div>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => {
                  add()
                }}
                block
                icon={'+'}
              >
                Add question
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </>
  )
}

export default ConstructedResponseForm
