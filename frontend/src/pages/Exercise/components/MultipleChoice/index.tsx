import { Button, Form } from 'antd'
import { useEffect } from 'react'
import {
  QuestionPayload,
  SubmitAnswerResponse,
} from '../../../../services/exerciseApi/types'

interface MultipleChoiceProps extends QuestionPayload {
  question: {
    text: string
    answers: {
      id: number
      text: string
    }[]
    multipleCorrectAnswers: boolean
  }
  exerciseId: string
  result: MultipleChoiceResponse | undefined
}

interface MultipleChoiceResponse extends SubmitAnswerResponse {
  answer: number[]
  correctAnswer: number[]
}

function MultipleChoice(props: MultipleChoiceProps) {
  const { question, result } = props
  const selectedAnswers = Form.useWatch('answer')
  const form = Form.useFormInstance()

  const selectAnswers = (answer: number) => {
    if (question.multipleCorrectAnswers) {
      form.setFieldValue(
        'answer',
        selectedAnswers?.includes(answer)
          ? selectedAnswers.filter((value: number) => value !== answer)
          : [...selectedAnswers, answer],
      )
    } else {
      form.setFieldValue('answer', [answer])
    }
  }

  useEffect(() => {
    form.setFieldValue('answer', [])
  }, [props])

  return (
    <div>
      <p className="mb-5 text-primary text-2xl font-semibold">
        Multiple choice question
        {question.multipleCorrectAnswers ? ' (Multiple correct choices)' : ''}
      </p>
      <p
        className="text-xl"
        dangerouslySetInnerHTML={{ __html: question.text }}
      />
      <Form.Item name="answer" initialValue={[]} noStyle>
        <div className="flex flex-row justify-between flex-wrap gap-5 mt-14">
          {question.answers.map((answer) => {
            const isSubmitAnswer = result && result.answer?.includes(answer.id)
            const isCorrectAnswer =
              result && result.correctAnswer.includes(answer.id)

            return (
              <Button
                key={Math.random()}
                type="primary"
                size="large"
                ghost
                disabled={!!result}
                className={`flex-1 ${
                  selectedAnswers?.includes(answer.id)
                    ? '!text-white !bg-primary'
                    : isSubmitAnswer || isCorrectAnswer
                    ? `!text-white ${
                        isCorrectAnswer ? '!bg-green-400' : '!bg-red-400'
                      }`
                    : ''
                }`}
                onClick={() => {
                  selectAnswers(answer.id)
                }}
              >
                {answer.text}
              </Button>
            )
          })}
        </div>
      </Form.Item>
    </div>
  )
}

export default MultipleChoice
