import { Button } from 'antd'
import { useEffect, useState } from 'react'
import exerciseApi from '../../../../services/exerciseApi'
import {
  Question,
  SubmitAnswerResponse,
} from '../../../../services/exerciseApi/types'

interface MultipleChoiceProps extends Question {
  question: {
    text: string
    answers: {
      id: number
      text: string
    }[]
  }
  exerciseId: string
  result: MultipleChoiceResponse | undefined
}

interface SubmitAnswer {
  answer: number[]
}

interface MultipleChoiceResponse extends SubmitAnswerResponse {
  answer: number[]
  correctAnswer: number[]
}

function MultipleChoice(props: MultipleChoiceProps) {
  const [result, setResult] = useState<MultipleChoiceResponse | null>(null)
  const { question, exerciseId, id } = props

  const submitAnswer = async (data: SubmitAnswer) => {
    const res = await exerciseApi.submitAnswer(exerciseId, id, data)

    setResult(res)
  }

  useEffect(() => {
    setResult(props.result || null)
  }, [props])

  return (
    <div>
      <p>{question.text}</p>
      <div className="flex flex-row justify-between flex-wrap gap-5 mt-14 mb-20">
        {question.answers.map((answer) => (
          <Button
            type="primary"
            ghost
            disabled={!!result}
            className={`flex-1 ${
              result && result.answer.includes(answer.id)
                ? `!text-white ${
                    result.isCorrect ? '!bg-green-400' : '!bg-red-400'
                  }`
                : ''
            }`}
            onClick={() => {
              submitAnswer({ answer: [answer.id] })
            }}
          >
            {answer.text}
          </Button>
        ))}
      </div>
      {result && (
        <p className="w-full p-3 border-2 border-solid border-primary rounded-md">
          {result.explain}
        </p>
      )}
    </div>
  )
}

export default MultipleChoice
