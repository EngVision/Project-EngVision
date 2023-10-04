import React from 'react'
import {
  Question,
  SubmitAnswerResponse,
} from '../../../../services/exerciseApi/types'

interface SubmitAnswer {
  answer: string
}

interface FillBlankProps extends Question {
  question: {
    text: string
    answers: {
      id: number
      text: string
    }[]
  }
  exerciseId: string
  result: FillBlankResponse | undefined
  submitAnswer: (data: SubmitAnswer, questionId: string) => Promise<void>
}

interface FillBlankResponse extends SubmitAnswerResponse {
  answer: string
  correctAnswer: string
}

function FillBlank({ result }: FillBlankProps) {
  return (
    <p
      className="text-2xl font-medium"
      dangerouslySetInnerHTML={{ __html: result?.explanation || '' }}
    ></p>
  )
}

export default FillBlank
