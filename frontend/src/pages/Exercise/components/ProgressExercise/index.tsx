import { Space } from 'antd'
import { TickIcon, XMarkIcon } from '../../../../components/Icons'
import { SubmissionResponse } from '../../../../services/submissionApi/types'
import { ExerciseSchema } from '../../../../services/exerciseApi/types'

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
    else if (submission?.detail[index]?.isCorrect) return 'bg-green-500'
    else return 'bg-slate-300'
  }

  return (
    <>
      <p>Quiz progress</p>
      <Space>
        {exercise?.content.map((_, index) => (
          <div
            key={index}
            onClick={() => gotoQuestion(index)}
            className={`w-[20px] h-[20px] rounded-[10px] ${
              !(index > (submission?.totalDone || 0)) ? 'cursor-pointer' : ''
            } ${getBackground(index)}`}
          >
            {submission?.detail[index]?.isCorrect && (
              <TickIcon className="bg-transparent" />
            )}
            {submission?.detail[index]?.isCorrect === false && (
              <XMarkIcon className="bg-transparent" />
            )}
          </div>
        ))}
      </Space>
    </>
  )
}

export default ProgressExercise
