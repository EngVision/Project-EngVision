import { Form } from 'antd'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  MatchPairSchema,
  QuestionPayload,
  SubmitAnswerResponse,
} from '../../../../services/exerciseApi/types'
import CustomImage from '../../../../components/common/CustomImage'
import { ExerciseMatchType, LINE_COLOR } from '../../../../utils/constants'
import { getFileUrl } from '../../../../utils/common'
import AnswerLines from './AnswerLines'
import AnswerButton from '../../../../components/AnswerButton'
import _ from 'lodash'

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

export interface MatchResponse extends SubmitAnswerResponse {
  answer: string[]
  correctAnswer: MatchPairSchema[][]
}

export type MatchAnswer = {
  first: string
  second: string
} | null

function Match(props: MatchProps) {
  const { question, result, setIsSubmittable } = props
  const form = Form.useFormInstance()

  const shuffledColor = useMemo(() => _.shuffle(LINE_COLOR), [question])

  const [answerPairs, setAnswerPairs] = useState<MatchAnswer[]>([])

  const [first, setFirst] = useState<string>()
  const [second, setSecond] = useState<string>()

  const handleClickFirst = useCallback(
    (index: string) => {
      if (
        answerPairs.find((pair) => pair?.first === index) ||
        answerPairs.find((pair) => pair?.second === index)
      ) {
        setAnswerPairs(
          answerPairs.filter(
            (pair) => pair?.first !== index && pair?.second !== index,
          ),
        )
        return
      }

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
    [second, answerPairs],
  )

  const handleClickSecond = useCallback(
    (index: string) => {
      if (
        answerPairs.find((pair) => pair?.first === index) ||
        answerPairs.find((pair) => pair?.second === index)
      ) {
        setAnswerPairs(
          answerPairs.filter(
            (pair) => pair?.first !== index && pair?.second !== index,
          ),
        )
        return
      }

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
    [first, answerPairs],
  )

  useEffect(() => {
    if (answerPairs.length === question.pairs.length) {
      setIsSubmittable(true)
    }
    console.log('answerPairs', answerPairs)
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
    } else {
      setAnswerPairs([])
    }
  }, [result])

  return (
    <div id="match-exercise" className="relative">
      <h3 className="text-primary">Match these card into the right order</h3>

      <Form.Item name="answer" noStyle>
        <div className="flex justify-center">
          <div className="flex flex-col gap-8 mt-4 w-[800px] max-w-full">
            {question.pairs.map((pair, index) => {
              const resultAns = result?.correctAnswer.find((ans) => {
                return ans[0].content === pair[0].content
              })
              const isCorrect = resultAns?.[1].content === pair[1].content
              return (
                <div
                  className="flex gap-4 justify-between items-center min-h-[80px]"
                  key={index}
                >
                  <div className="flex items-center">
                    <label
                      htmlFor={`first_column_${pair[0].content}`}
                      className="pr-4 w-[200px] text-right cursor-pointer"
                    >
                      {pair[0].type === ExerciseMatchType.Text ? (
                        <AnswerButton
                          className={`${
                            result
                              ? isCorrect
                                ? 'border-correct text-correct'
                                : 'border-false text-false'
                              : ''
                          }`}
                        >
                          <span>{pair[0].content}</span>
                        </AnswerButton>
                      ) : (
                        <CustomImage
                          src={getFileUrl(pair[0].content)}
                          className="w-32 h-32"
                        />
                      )}
                    </label>
                    <input
                      type="radio"
                      id={`first_column_${pair[0].content}`}
                      className={`first_column_${pair[0].content} focus:!shadow-none hover:cursor-pointer`}
                      onClick={() => handleClickFirst(pair[0].content)}
                      readOnly
                      checked={
                        Boolean(
                          answerPairs.find((p) => p?.first === pair[0].content),
                        ) || first === pair[0].content
                      }
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="radio"
                      id={`second_column_${pair[1].content}`}
                      className={`second_column_${pair[1].content} focus:!shadow-none hover:cursor-pointer`}
                      onClick={() => handleClickSecond(pair[1].content)}
                      readOnly
                      checked={
                        Boolean(
                          answerPairs.find(
                            (p) => p?.second === pair[1].content,
                          ),
                        ) || second === pair[1].content
                      }
                    />

                    <label
                      htmlFor={`second_column_${pair[1].content}`}
                      className="pl-4 w-[200px] cursor-pointer"
                    >
                      {pair[1].type === ExerciseMatchType.Text ? (
                        <AnswerButton
                          className={`${
                            result
                              ? isCorrect
                                ? 'border-correct text-correct'
                                : 'border-false text-false'
                              : ''
                          }`}
                        >
                          <span>{pair[1].content}</span>
                        </AnswerButton>
                      ) : (
                        <CustomImage
                          src={getFileUrl(pair[1].content)}
                          className="w-32 h-32"
                        />
                      )}
                    </label>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Form.Item>

      <AnswerLines
        answerPairs={answerPairs}
        result={result}
        shuffledColor={shuffledColor}
      />
    </div>
  )
}

export default Match
