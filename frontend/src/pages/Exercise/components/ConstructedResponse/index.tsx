import { Form, Input } from 'antd'
import {
  QuestionPayload,
  SubmitAnswerResponse,
} from '../../../../services/exerciseApi/types'
import { useEffect } from 'react'

interface ConstructedResponseProps extends QuestionPayload {
  question: {
    text: string
    multipleCorrectAnswers: boolean
  }
  result: ConstructedResponseRes | undefined
  title: string
  description?: string
  setIsSubmittable: (value: boolean) => void
}

interface ConstructedResponseRes extends SubmitAnswerResponse {
  answer: number[]
  correctAnswer: number[]
}

export default function ConstructedResponse(props: ConstructedResponseProps) {
  const form = Form.useFormInstance()
  const answer = Form.useWatch<string>('answer')

  const {
    question,
    result,
    title: exerciseTitle,
    description: exerciseDescription,
    setIsSubmittable,
  } = props

  useEffect(() => {
    setIsSubmittable(answer?.length > 0 || false)
  }, [answer])

  useEffect(() => {
    form.setFieldValue('answer', null)
    if (result) {
      form.setFieldValue('answer', result.correctAnswer || result.answer)
    }
  }, [result])

  return (
    <div>
      <p className="mb-5 text-primary text-2xl font-semibold">
        {exerciseTitle}
      </p>
      <p className="text-xl mb-10">{exerciseDescription}</p>
      <p
        className="text-xl font-bold"
        dangerouslySetInnerHTML={{ __html: question.text }}
      />
      <div className="mt-5">
        <Form.Item name="answer">
          <Input.TextArea showCount autoSize={{ minRows: 4, maxRows: 15 }} />
        </Form.Item>
      </div>
    </div>
  )
}
