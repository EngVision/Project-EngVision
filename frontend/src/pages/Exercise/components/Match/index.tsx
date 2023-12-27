import { Button, Form } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import {
  MatchPairSchema,
  QuestionPayload,
  SubmitAnswerResponse,
} from '../../../../services/exerciseApi/types'
import CustomImage from '../../../../components/common/CustomImage'
import LineTo from 'react-lineto'
import { ExerciseMatchType } from '../../../../utils/constants'
import { getFileUrl } from '../../../../utils/common'

interface MatchProps extends QuestionPayload {
  question: {
    text: string
    image?: string
    pairs: MatchPairSchema[][]
    audio?: string
  }
  exerciseId?: string
  result?: MatchResponse
  setIsSubmittable: (value: boolean) => void
}

interface MatchResponse extends SubmitAnswerResponse {
  answer: string[]
  correctAnswer: string[]
}

type MatchAnswer = {
  first: string
  second: string
} | null

function Match(props: MatchProps) {
  const { question, result, setIsSubmittable } = props
  const form = Form.useFormInstance()

  const [answerPairs, setAnswerPairs] = useState<MatchAnswer[]>([])

  const [first, setFirst] = useState<string>()
  const [second, setSecond] = useState<string>()

  const handleClickFirst = useCallback(
    (index: string) => {
      if (second) {
        setAnswerPairs([
          ...answerPairs,
          {
            first: index,
            second,
          },
        ])
        setFirst(undefined)
        setSecond(undefined)
        return
      }
      setFirst(index)
    },
    [second],
  )

  const handleClickSecond = useCallback(
    (index: string) => {
      if (first) {
        setAnswerPairs([
          ...answerPairs,
          {
            first,
            second: index,
          },
        ])
        setFirst(undefined)
        setSecond(undefined)
        return
      }
      setSecond(index)
    },
    [first],
  )

  const handleReset = () => {
    setAnswerPairs([])
    setFirst(undefined)
    setSecond(undefined)
    setIsSubmittable(false)
  }

  useEffect(() => {
    if (answerPairs.length === question.pairs.length) {
      setIsSubmittable(true)
    }
    form.setFieldValue(
      'answer',
      answerPairs.map((pair) => [pair?.first, pair?.second]),
    )
  }, [answerPairs])

  useEffect(() => {
    if (result) {
      setAnswerPairs(
        result.answer.map(([first, second]) => ({ first, second })),
      )
    }
  }, [result])

  return (
    <div id="match-exercise" className="relative">
      <div className="flex justify-between">
        <h3 className="text-primary">Match these card into the right order</h3>
        <Button onClick={handleReset} disabled={Boolean(result)}>
          Reset
        </Button>
      </div>

      <Form.Item name="answer" noStyle>
        <div className="flex flex-col gap-8 mt-4">
          {question.pairs.map((pair, index) => {
            return (
              <div
                className="flex gap-4 justify-between items-center min-h-[80px]"
                key={index}
              >
                <div className="flex items-center">
                  <label
                    htmlFor={`first_column_${pair[0].content}`}
                    className="pr-6"
                  >
                    {pair[0].type === ExerciseMatchType.Text ? (
                      <span>{pair[0].content}</span>
                    ) : (
                      <CustomImage
                        src={getFileUrl(pair[0].content)}
                        className="w-40 h-40"
                      />
                    )}
                  </label>
                  <input
                    type="radio"
                    id={`first_column_${pair[0].content}`}
                    className={`first_column_${pair[0].content}`}
                    onClick={() => handleClickFirst(pair[0].content)}
                    checked={
                      Boolean(
                        answerPairs.find((p) => p?.first === pair[0].content),
                      ) || first === pair[0].content
                    }
                    disabled={Boolean(
                      answerPairs.find((p) => p?.first === pair[0].content),
                    )}
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="radio"
                    id={`second_column_${pair[1].content}`}
                    className={`second_column_${pair[1].content}`}
                    onClick={() => handleClickSecond(pair[1].content)}
                    checked={
                      Boolean(
                        answerPairs.find((p) => p?.second === pair[1].content),
                      ) || second === pair[1].content
                    }
                    disabled={Boolean(
                      answerPairs.find((p) => p?.second === pair[1].content),
                    )}
                  />
                  <label
                    htmlFor={`second_column_${pair[1].content}`}
                    className="pl-6"
                  >
                    {pair[1].type === ExerciseMatchType.Text ? (
                      <span>{pair[1].content}</span>
                    ) : (
                      <CustomImage
                        src={getFileUrl(pair[1].content)}
                        className="w-40 h-40"
                      />
                    )}
                  </label>
                </div>
              </div>
            )
          })}
        </div>
      </Form.Item>

      {answerPairs.map((pair) => {
        const resultAns = result?.correctAnswer.find((ans) => {
          return ans[0] === pair?.first
        })
        const isCorrect = resultAns?.[1] === pair?.second

        return (
          <LineTo
            from={`first_column_${pair?.first}`}
            to={`second_column_${pair?.second}`}
            delay={10}
            borderColor={
              result ? (isCorrect ? '#41ab3f' : '#fd6267') : '#2769e7'
            }
            borderWidth={2}
            borderStyle="dashed"
            className="line-match"
          />
        )
      })}
    </div>
  )
}

export default Match
