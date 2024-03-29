import { Form, Input, InputRef } from 'antd'
import { useEffect, useRef } from 'react'
import {
  QuestionPayload,
  SubmitAnswerResponse,
} from '../../../../services/exerciseApi/types'
import { useTranslation } from 'react-i18next'

interface FillBlankProps extends QuestionPayload {
  question: { text: string; image?: string; limits: number[] }
  result?: FillBlankResponse
  setIsSubmittable: (value: boolean) => void
}

interface FillBlankResponse extends SubmitAnswerResponse {
  answer: string[]
  correctAnswer: string[]
}

function FillBlank(props: FillBlankProps) {
  const { t } = useTranslation('translation', { keyPrefix: 'DoExercise' })
  const { question, result, setIsSubmittable } = props
  const answer = Form.useWatch<string[]>('answer')
  const form = Form.useFormInstance()
  const firstInput = useRef<InputRef>(null)

  const questionArr = question.text.replaceAll('<p>', '').split('[]')

  useEffect(() => {
    form.setFieldValue('answer', Array(questionArr.length - 1).fill(''))
    if (result) {
      form.setFieldValue('answer', result.correctAnswer)
    }

    firstInput.current?.focus()
  }, [question])

  useEffect(() => {
    setIsSubmittable(answer?.every((value) => value.length > 0) || false)
  }, [answer])

  return (
    <div>
      <p className="mb-5 text-primary text-2xl font-semibold">
        {t('Fill blank question')}
      </p>
      <Form.List
        name="answer"
        initialValue={Array(questionArr.length - 1).fill('')}
      >
        {(fields) => (
          <>
            {fields.map(({ key }) => {
              return (
                <span key={key}>
                  <span
                    className="text-xl"
                    dangerouslySetInnerHTML={{ __html: questionArr[key] }}
                  ></span>
                  <Form.Item noStyle name={[key]}>
                    <Input
                      ref={key === 0 ? firstInput : null}
                      className={`font-bold text-xl ${
                        result
                          ? result.answer[key] === result.correctAnswer[key]
                            ? '!text-green-500'
                            : '!text-red-500'
                          : ''
                      }`}
                      minLength={question.limits[key]}
                      maxLength={question.limits[key]}
                      disabled={!!result}
                      style={{
                        textAlign: 'center',
                        width: 25 + (answer?.[key]?.length || 0) * 15,
                        padding: '2px 5px',
                        margin: 2,
                      }}
                    />
                  </Form.Item>
                </span>
              )
            })}
            <span
              className="text-xl"
              dangerouslySetInnerHTML={{
                __html: questionArr[questionArr.length - 1],
              }}
            ></span>
          </>
        )}
      </Form.List>
    </div>
  )
}

export default FillBlank
