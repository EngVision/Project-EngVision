import { Form } from 'antd'
import { useEffect } from 'react'
import {
  QuestionPayload,
  SubmitAnswerResponse,
} from '../../../../services/exerciseApi/types'
import AudioRecorderComponent from './AudioRecordComponent'

interface SpeakingProps extends QuestionPayload {
  question: {
    text: string
    image?: string
    audio?: string
    countdown: number
  }
  exerciseId?: string
  result?: SpeakingResponse
  setIsSubmittable: (value: boolean) => void
}

interface SpeakingResponse extends SubmitAnswerResponse {
  answer: string[]
  correctAnswer: string[]
}

function Speaking(props: SpeakingProps) {
  const { question, result, setIsSubmittable } = props
  console.log('🚀 ~ file: index.tsx:28 ~ Speaking ~ result:', result)
  const form = Form.useFormInstance()

  useEffect(() => {
    form.setFieldValue('answer', null)
  }, [question])

  return (
    <div>
      {/* question text */}
      <h3 className="text-2xl text-primary mb-4">
        This is a speaking exercise
      </h3>

      <div
        className="text-lg mb-20"
        dangerouslySetInnerHTML={{ __html: question.text }}
      ></div>

      <AudioRecorderComponent
        setIsSubmittable={setIsSubmittable}
        countdown={question.countdown}
      />
    </div>
  )
}

export default Speaking
