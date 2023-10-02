import { Button } from 'antd'
import {
  Question,
  SubmitAnswerResponse,
} from '../../../../services/exerciseApi/types'

interface SubmitAnswer {
  answer: number[]
}

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
  submitAnswer: (data: SubmitAnswer, questionId: string) => Promise<void>
}

interface MultipleChoiceResponse extends SubmitAnswerResponse {
  answer: number[]
  correctAnswer: number[]
}

function MultipleChoice(props: MultipleChoiceProps) {
  const { question, id, result, submitAnswer } = props

  return (
    <div>
      <p>{question.text}</p>
      <div className="flex flex-row justify-between flex-wrap gap-5 mt-14 mb-20">
        {question.answers.map((answer) => {
          const isSubmitAnswer = result && result.answer.includes(answer.id)
          const isCorrectAnswer =
            result && result.correctAnswer.includes(answer.id)

          return (
            <Button
              key={Math.random()}
              type="primary"
              ghost
              disabled={!!result}
              className={`flex-1 ${
                isSubmitAnswer || isCorrectAnswer
                  ? `!text-white ${
                      isCorrectAnswer ? '!bg-green-400' : '!bg-red-400'
                    }`
                  : ''
              }`}
              onClick={() => {
                submitAnswer({ answer: [answer.id] }, id)
              }}
            >
              {answer.text}
            </Button>
          )
        })}
      </div>
      {result && (
        <p className="w-full p-3 border-2 border-solid border-primary rounded-md">
          {result.explanation}
        </p>
      )}
    </div>
  )
}

export default MultipleChoice
