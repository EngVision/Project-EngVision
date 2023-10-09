import { Button } from 'antd'
import {
  Question,
  SubmitAnswerResponse,
} from '../../../../services/exerciseApi/types'
import { EmojiHappyIcon, EmojiSadIcon } from '../../../../components/Icons'
import { useEffect, useState } from 'react'

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
    multipleCorrectAnswers: boolean
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
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])

  const selectAnswers = (answer: number) => {
    if (question.multipleCorrectAnswers) {
      setSelectedAnswers((prev) => {
        return prev.includes(answer)
          ? prev.filter((value) => value !== answer)
          : [...prev, answer]
      })
    } else {
      submitAnswer({ answer: [answer] }, id)
    }
  }

  useEffect(() => {
    setSelectedAnswers([])
  }, [props])

  return (
    <div className="h-full">
      <p className="mb-5 text-primary text-2xl font-semibold">
        Multiple choice question
        {question.multipleCorrectAnswers ? ' (Multiple correct choices)' : ''}
      </p>
      <p
        className="text-xl"
        dangerouslySetInnerHTML={{ __html: question.text }}
      />
      <div className="flex flex-row justify-between flex-wrap gap-5 my-14">
        {question.answers.map((answer) => {
          const isSubmitAnswer = result && result.answer.includes(answer.id)
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
                selectedAnswers.includes(answer.id)
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
      {result && (
        <div className="w-full p-5 border-2 border-solid border-primary rounded-md flex items-center gap-4">
          {result.isCorrect ? <EmojiHappyIcon /> : <EmojiSadIcon />}
          <div className="flex-1 text-primary flex flex-col gap-2">
            {result.isCorrect && <b>Good job!</b>}
            <p>{result.explanation}</p>
          </div>
        </div>
      )}
      <div className="">
        {question.multipleCorrectAnswers && !result && (
          <Button
            type="primary"
            className="w-[150px]"
            disabled={selectedAnswers.length === 0}
            onClick={async () => {
              await submitAnswer({ answer: selectedAnswers }, id)
            }}
          >
            Submit
          </Button>
        )}
      </div>
    </div>
  )
}

export default MultipleChoice
