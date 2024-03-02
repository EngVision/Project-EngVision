import { useEffect, useState } from 'react'
import {
  QuestionPayload,
  SubmitAnswerResponse,
} from '../../../../services/exerciseApi/types'
import Grid from './Grid'
import { Form } from 'antd'
import { useTranslation } from 'react-i18next'

interface WordSearchProps extends QuestionPayload {
  question: {
    image?: string
    audio?: string
    rows: string[][]
    text: string
    words: string[]
  }
  exerciseId?: string
  result?: WordSearchResponse
  setIsSubmittable: (value: boolean) => void
}

interface WordSearchResponse extends SubmitAnswerResponse {
  answer: {
    words: {
      text: string
      start: number[]
      end: number[]
    }[]
    numberQuestion: number
    numberQuestionCorrect: number
  }
  correctAnswer: string[]
}

interface Position {
  x: number
  y: number
}
function getTextFromMatrix(matrix: string[][], start: Position, end: Position) {
  let subMatrix = matrix
    .slice(start.y, end.y + 1)
    .map((row) => row.slice(start.x, end.x + 1))

  if (start.x === end.x || start.y === end.y) {
    return subMatrix.map((row) => row.join('')).join('')
  } else if (start.x - end.x === start.y - end.y) {
    let diagonal = ''
    for (let i = 0; i < subMatrix[0].length; i++) {
      diagonal += subMatrix[i][i]
    }

    return diagonal
  } else if (start.x - end.x === -1 * (start.y - end.y)) {
    const minX = start.x < end.x ? start.x : end.x
    const minY = start.y < end.y ? start.y : end.y
    const maxX = start.x > end.x ? start.x : end.x
    const maxY = start.y > end.y ? start.y : end.y

    subMatrix = matrix
      .slice(minY, maxY + 1)
      .map((row) => row.slice(minX, maxX + 1))
    let diagonal = ''
    for (let i = 0; i < subMatrix[0].length; i++) {
      diagonal += subMatrix[subMatrix[0].length - 1 - i][i]
    }
    return diagonal
  }

  return ''
}

function WordSearch(props: WordSearchProps) {
  const { t } = useTranslation('translation', { keyPrefix: 'ManageExercise' })
  const { question, result, setIsSubmittable } = props
  const { words, rows, text } = question

  const form = Form.useFormInstance()

  const [selectedWords, setSelectedWords] = useState<any[]>([])

  function attemptSolution(start: any, end: any) {
    const text = getTextFromMatrix(rows, start, end)
    if (words.includes(text)) {
      setSelectedWords((prev) => [
        ...prev,
        {
          word: text,
          start: start,
          end: end,
        },
      ])
    }
  }

  useEffect(() => {
    if (result) {
      setSelectedWords(
        result.answer.words.map((word) => ({
          word: word.text,
          start: {
            x: word.start[0],
            y: word.start[1],
          },
          end: {
            x: word.end[0],
            y: word.end[1],
          },
        })),
      )
    } else {
      setSelectedWords([])
    }
  }, [question])

  useEffect(() => {
    if (selectedWords.length > 0) {
      setIsSubmittable(true)
    }
    form.setFieldValue('answer', {
      words: selectedWords.map((word) => ({
        text: word.word,
        start: [word.start.x, word.start.y],
        end: [word.end.x, word.end.y],
      })),
      numberQuestionCorrect: selectedWords.length,
      numberQuestion: words.length,
    })
  }, [selectedWords])

  return (
    <div className="flex flex-col items-center w-fit mx-auto">
      <h4 className="text-primary mb-5 text-xl self-start font-semibold">
        {text}
      </h4>

      <div className="flex flex-col-reverse gap-8 mt-4 w-full lg:flex-row">
        <div className="tw-flex tw-flex-wrap tw-justify-around tw-w-full tw-justify-items-center tw-mt-5 tw-justify-center">
          <Form.Item name="answer">
            <Grid
              words={selectedWords}
              attemptSolution={attemptSolution}
              grid={rows}
            />
          </Form.Item>
        </div>

        <div className="border border-solid border-primary rounded-lg h-fit">
          <div className="text-white text-center text-base px-6 py-2 bg-primary rounded-t-md">
            {t('Find below words in the table')}
          </div>

          <div className="mt-2">
            {words.map((word, index) => (
              <div
                key={index}
                className={`py-2 uppercase text-center font-semibold border-t-0 border-x-0 ${
                  index !== words.length - 1
                    ? 'border-b border-solid border-primary'
                    : ''
                } ${
                  selectedWords.find((w) => w.word === word)
                    ? 'line-through opacity-50'
                    : ''
                }`}
              >
                {word}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WordSearch
