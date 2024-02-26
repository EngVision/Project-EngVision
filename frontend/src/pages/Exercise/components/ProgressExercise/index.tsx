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
      !!submission?.detail[index] &&
      (submission?.detail[index]?.isCorrect ||
        submission?.detail[index]?.grade !== null)
    )
      return 'bg-green-500'
    else if (submission?.detail[index]?.grade === null) return 'bg-yellow-500'
    else return 'bg-slate-300'
  }

  const getIcon = (index: number) => {
    if (
      !!submission?.detail[index] &&
      (submission?.detail[index]?.isCorrect ||
        submission?.detail[index]?.grade !== null)
    ) {
      return <TickIcon className="bg-transparent" />
    } else if (
      !!submission?.detail[index] &&
      submission?.detail[index]?.isCorrect === false
    ) {
      return <XMarkIcon className="bg-transparent" />
    } else if (submission?.detail[index]?.grade === null) {
      return <MinusCircle className="bg-transparent" />
    } else {
      return <></>
    }
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
            {getIcon(index)}
          </div>
        ))}
      </Space>
    </>
  )
}

export default ProgressExercise
