import { Form } from 'antd'
import { useEffect, useState } from 'react'
import {
  QuestionPayload,
  SubmitAnswerResponse,
} from '../../../../services/exerciseApi/types'
import AudioRecorderComponent from './AudioRecordComponent'
import { useTranslation } from 'react-i18next'

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
  answer: string
  correctAnswer: string[]
}

function Speaking(props: SpeakingProps) {
  const { t } = useTranslation('translation', { keyPrefix: 'DoExercise' })
  const { question, result, setIsSubmittable } = props
  const form = Form.useFormInstance()
  const [fileId, setFileId] = useState<string>('')

  useEffect(() => {
    setFileId(result?.answer || '')
  }, [result])

  useEffect(() => {
    form.setFieldValue('answer', fileId)
  }, [question, fileId])

  return (
    <div>
      <h3 className="text-2xl text-primary mb-4">{t('Speaking question')}</h3>

      <div
        className="text-lg mb-20"
        dangerouslySetInnerHTML={{ __html: question.text }}
      ></div>

      <Form.Item name="answer" initialValue="">
        <AudioRecorderComponent
          setIsSubmittable={setIsSubmittable}
          countdown={question.countdown}
          fileId={fileId}
          setFileId={setFileId}
          isDisabled={!!result}
        />
      </Form.Item>
    </div>
  )
}

export default Speaking
