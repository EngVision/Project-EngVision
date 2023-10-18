import { Form, Input } from 'antd'
import { useEffect } from 'react'
import {
  QuestionPayload,
  SubmitAnswerResponse,
} from '../../../../services/exerciseApi/types'

interface FillBlankProps extends QuestionPayload {
  question: { text: string; image?: string; limits: number[] }
  exerciseId: string
  result?: FillBlankResponse
}

interface FillBlankResponse extends SubmitAnswerResponse {
  answer: string[]
  correctAnswer: string[]
}

function FillBlank(props: FillBlankProps) {
  const { question, result } = props
  const answer = Form.useWatch('answer')
  const form = Form.useFormInstance()

  const questionArr = question.text.split('[]')

  useEffect(() => {
    form.setFieldValue('answer', Array(questionArr.length - 1).fill(''))
    if (result) {
      form.setFieldValue('answer', result.correctAnswer)
    }
  }, [props])

  return (
    <div>
      <p className="mb-5 text-primary text-2xl font-semibold">
        Fill blank question
      </p>
      <Form.List
        name="answer"
        initialValue={Array(questionArr.length - 1).fill('')}
      >
        {(fields) => (
          <>
            {fields.map(({ key }) => {
              return (
                <>
                  <span className="text-xl">{questionArr[key]}</span>
                  <Form.Item noStyle name={[key]}>
                    <Input
                      className={`font-bold text-xl ${
                        result
                          ? result.correctAnswer[key] === result.answer[key]
                            ? '!text-green-500'
                            : '!text-red-500'
                          : ''
                      }`}
                      minLength={question.limits[key]}
                      maxLength={question.limits[key]}
                      disabled={!!result}
                      // eslint-disable-next-line jsx-a11y/no-autofocus
                      autoFocus
                      style={{
                        textAlign: 'center',
                        width: 15 + (answer?.[key]?.length || 0) * 15,
                        padding: '2px 5px',
                        margin: 2,
                      }}
                    />
                  </Form.Item>
                </>
              )
            })}
            <span className="text-xl">
              {questionArr[questionArr.length - 1]}
            </span>
          </>
        )}
      </Form.List>
    </div>
  )
}

export default FillBlank
