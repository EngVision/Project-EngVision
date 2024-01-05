import { Space } from 'antd'
import { TickIcon, XMarkIcon } from '../../../../components/Icons'
import MinusCircle from '../../../../components/Icons/MinusCircle'
import { ExerciseSchema } from '../../../../services/exerciseApi/types'
import { SubmissionResponse } from '../../../../services/submissionApi/types'

interface ProgressExerciseProps {
  exercise?: ExerciseSchema
  submission?: SubmissionResponse
  questionIndex: number
  gotoQuestion: (index: number) => void
}

function ProgressExercise({
  exercise,
  submission,
  questionIndex,
  gotoQuestion,
}: ProgressExerciseProps) {
  const getBackground = (index: number) => {
    if (index === questionIndex) return 'bg-sky-600'
    else if (submission?.detail[index]?.isCorrect === false) return 'bg-red-500'
    else if (
      submission?.detail[index]?.isCorrect ||
      submission?.detail[index]?.grade !== null
    )
      return 'bg-green-500'
    else if (submission?.detail[index]?.grade === null) return 'bg-yellow-500'
    else return 'bg-slate-300'
  }

  return (
    <>
      <p className="mb-1">Quiz progress</p>
      <Space>
        {exercise?.content.map((_, index) => (
          <div
            key={index}
            onClick={() => gotoQuestion(index)}
            className={`w-[20px] h-[20px] rounded-[10px] ${
              !(index > (submission?.totalDone || 0)) ? 'cursor-pointer' : ''
            } ${getBackground(index)}`}
          >
            {(submission?.detail[index]?.isCorrect ||
              submission?.detail[index]?.grade !== null) && (
              <TickIcon className="bg-transparent" />
            )}
            {submission?.detail[index]?.isCorrect === false && (
              <XMarkIcon className="bg-transparent" />
            )}
            {submission?.detail[index]?.grade === null && (
              <MinusCircle className="bg-transparent" />
            )}
          </div>
        ))}
      </Space>
    </>
  )
}

export default ProgressExercise
