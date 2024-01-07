import React, { useEffect } from 'react'
import { MatchAnswer, MatchResponse } from '.'
import LineTo from 'react-lineto'
import { useWindowSize } from '../../../../hooks/useWindowSize'
import { useForceRerender } from '../../../../hooks/useForceRerender'

interface AnswerLinesProps {
  answerPairs: MatchAnswer[]
  result: MatchResponse | undefined
  shuffledColor: string[]
}

const AnswerLines = ({
  answerPairs,
  result,
  shuffledColor,
}: AnswerLinesProps) => {
  const { width, height } = useWindowSize()
  const forceRerender = useForceRerender()
  console.log('result', result)

  useEffect(() => {
    forceRerender()
  }, [width, height])

  return (
    <div>
      {answerPairs.map((pair, index) => {
        const resultAns = result?.correctAnswer.find((ans) => {
          return ans[0].content === pair?.first
        })
        const isCorrect = resultAns?.[1].content === pair?.second

        return (
          <LineTo
            key={index}
            from={`first_column_${pair?.first}`}
            to={`second_column_${pair?.second}`}
            delay={10}
            borderColor={
              result
                ? isCorrect
                  ? '#41ab3f'
                  : '#fd6267'
                : shuffledColor[index % 10]
            }
            borderWidth={2}
            borderStyle="solid"
            className="line-match"
          />
        )
      })}
    </div>
  )
}

export default AnswerLines
