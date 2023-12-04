import {
  CloseCircleWhiteIcon,
  TickCircleWhiteIcon,
} from '../../../../components/Icons'
import CustomImage from '../../../../components/common/CustomImage'
import { SubmissionResponse } from '../../../../services/submissionApi/types'
import { ExerciseType, UPLOAD_FILE_URL } from '../../../../utils/constants'

interface ExplainProps {
  submission: SubmissionResponse
  questionIndex: number
}

function Explain({ submission, questionIndex }: ExplainProps) {
  const isCorrect = submission?.detail[questionIndex]?.isCorrect
  const explanation = submission?.detail[questionIndex]?.explanation
  const correctAnswer = submission?.detail[questionIndex]?.correctAnswer

  return (
    <div
      className={`w-full p-5 rounded-md flex gap-4 mt-7 ${
        isCorrect ? 'bg-green-500' : 'bg-secondary'
      }`}
    >
      {isCorrect ? <TickCircleWhiteIcon /> : <CloseCircleWhiteIcon />}
      <div className="flex-1 text-primary flex flex-col gap-2 text-white">
        {
          <b className="text-[18px] leading-6">
            {isCorrect ? 'Correct!' : 'Wrong!'}
          </b>
        }

        {submission.exerciseType === ExerciseType.Unscramble ? (
          <div className="flex gap-4">
            <span>Correct answer: </span>
            {correctAnswer.map((answer: string) => (
              <CustomImage
                className="hidden lg:block object-cover w-20 h-20 rounded-md"
                src={`${UPLOAD_FILE_URL}${answer}`}
              />
            ))}
          </div>
        ) : (
          <p>{explanation}</p>
        )}
      </div>
    </div>
  )
}

export default Explain
