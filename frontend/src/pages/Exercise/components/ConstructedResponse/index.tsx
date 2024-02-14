import { Form, Input } from 'antd'
import { useEffect } from 'react'
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer'
import { useAppSelector } from '../../../../hooks/redux'
import {
  QuestionPayload,
  SubmitAnswerResponse,
} from '../../../../services/exerciseApi/types'

interface ConstructedResponseProps extends QuestionPayload {
  question: {
    text: string
    multipleCorrectAnswers: boolean
  }
  result: ConstructedResponseRes | undefined
  title: string
  description?: string
  isGrading?: boolean
  setIsSubmittable: (value: boolean) => void
}

interface ConstructedResponseRes extends SubmitAnswerResponse {
  answer: string
  correctAnswer: string
  teacherCorrection?: string
}

export default function ConstructedResponse(props: ConstructedResponseProps) {
  const {
    question,
    result,
    title: exerciseTitle,
    description: exerciseDescription,
    isGrading,
    setIsSubmittable,
  } = props

  const form = Form.useFormInstance()
  const answer = Form.useWatch<string>('answer')
  const teacherCorrection = Form.useWatch<string>('teacherCorrection')
  const darkMode = useAppSelector((state) => state.app.darkMode)

  useEffect(() => {
    setIsSubmittable(answer?.length > 0 || false)
  }, [answer])

  useEffect(() => {
    form.setFieldValue('answer', null)
    if (result) {
      form.setFieldValue('answer', result.correctAnswer || result.answer)
    }
  }, [result])

  console.log(isGrading)

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
        {result && (
          <ReactDiffViewer
            useDarkTheme={darkMode}
            leftTitle={'Student answer'}
            rightTitle={`Teacher's correction`}
            oldValue={result.answer || ''}
            newValue={
              (isGrading ? teacherCorrection : result.teacherCorrection) || ''
            }
            splitView={true}
            showDiffOnly={false}
            compareMethod={DiffMethod.WORDS}
          />
        )}
        {isGrading ? (
          <Form.Item name="teacherCorrection">
            <Input.TextArea showCount autoSize={{ minRows: 4, maxRows: 15 }} />
          </Form.Item>
        ) : (
          <Form.Item name="answer">
            <Input.TextArea
              disabled={!!result}
              showCount
              autoSize={{ minRows: 4, maxRows: 15 }}
            />
          </Form.Item>
        )}
      </div>
    </div>
  )
}
