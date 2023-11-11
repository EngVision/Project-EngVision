import { Space } from 'antd'
import { TickIcon, XMarkIcon } from '../../../../components/Icons'
import { SubmissionResponse } from '../../../../services/submissionApi/types'
import { ExerciseSchema } from '../../../../services/exerciseApi/types'

interface ProgressExamProps {
  parts?: ExerciseSchema[]
  submissions?: SubmissionResponse[]
  partIndex: number
  questionIndex: number
  canGotoQuestion: (indexP: number, indexQ: number) => boolean
  gotoQuestion: (indexP: number, indexQ: number) => void
}

function ProgressExam({
  parts,
  submissions,
  partIndex,
  questionIndex,
  gotoQuestion,
  canGotoQuestion,
}: ProgressExamProps) {
  const getBackground = (indexP: number, indexQ: number) => {
    if (indexQ === questionIndex && indexP === partIndex) return 'bg-sky-600'
    else if (submissions?.[indexP]?.detail?.[indexQ]?.isCorrect === false)
      return 'bg-red-500'
    else if (submissions?.[indexP]?.detail?.[indexQ]?.isCorrect)
      return 'bg-green-500'
    else return 'bg-slate-300'
  }

  return (
    <>
      <p>Quiz progress</p>
      <Space>
        {parts?.map((part, indexP) => {
          return part?.content.map((_, indexQ) => (
            <div
              key={Math.random()}
              onClick={() => gotoQuestion(indexP, indexQ)}
              className={`w-[20px] h-[20px] rounded-[10px] ${
                canGotoQuestion(indexP, indexQ) ? 'cursor-pointer' : ''
              } ${getBackground(indexP, indexQ)}`}
            >
              {submissions?.[indexP]?.detail[indexQ]?.isCorrect && (
                <TickIcon className="bg-transparent" />
              )}
              {submissions?.[indexP]?.detail[indexQ]?.isCorrect === false && (
                <XMarkIcon className="bg-transparent" />
              )}
            </div>
          ))
        })}
      </Space>
    </>
  )
}

export default ProgressExam
