import { Button, Form } from 'antd'
import { useEffect } from 'react'
import {
  QuestionPayload,
  SubmitAnswerResponse,
} from '../../../../services/exerciseApi/types'

interface MakeSentenceProps extends QuestionPayload {
  question: {
    text: string
    image?: string
    answers: string[][]
    audio?: string
  }
  exerciseId: string
  result?: MakeSentenceResponse
}

interface MakeSentenceResponse extends SubmitAnswerResponse {
  answer: string[]
  correctAnswer: string[]
}

function MakeSentence(props: MakeSentenceProps) {
  const { question, result } = props
  const selectedAnswers = Form.useWatch('answer')
  const form = Form.useFormInstance()

  const questionArr = question.text.split('[]')

  const selectAnswers = (answer: string, key: number) => {
    selectedAnswers[key] = answer
    if (question.answers) {
      form.setFieldValue('answer', selectedAnswers)
    } else {
      form.setFieldValue('answer', Array(questionArr.length - 1).fill(''))
    }
  }

  useEffect(() => {
    form.setFieldValue('answer', Array(questionArr.length - 1).fill(''))
    if (result) {
      form.setFieldValue('answer', result.correctAnswer)
    }
  }, [props])

  return (
    <div>
      <Form.List
        name="answer"
        initialValue={Array(questionArr.length - 1).fill('')}
      >
        {(fields) => (
          <>
            {fields.map(({ key }) => {
              return (
                <div key={key} className="inline">
                  <span className="text-xl">{questionArr[key]}</span>

                  <div className="inline-flex flex-col gap-3 align-middle mx-2">
                    {question.answers[key].map((answer, index) => {
                      const isSubmitAnswer =
                        result && result.answer?.includes(answer)

                      const isCorrectAnswer =
                        result && result.correctAnswer.includes(answer)

                      return (
                        <Button
                          key={index}
                          type="primary"
                          size="large"
                          ghost
                          disabled={!!result}
                          className={`flex-1 !py-0.5 ${
                            selectedAnswers?.includes(answer) &&
                            !isSubmitAnswer &&
                            !isCorrectAnswer
                              ? '!text-white !bg-primary'
                              : isSubmitAnswer || isCorrectAnswer
                              ? `!text-white ${
                                  isCorrectAnswer
                                    ? '!bg-green-400'
                                    : '!bg-red-400'
                                }`
                              : ''
                          }`}
                          onClick={() => {
                            selectAnswers(answer, key)
                          }}
                        >
                          {answer}
                        </Button>
                      )
                    })}
                  </div>
                </div>
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

export default MakeSentence
