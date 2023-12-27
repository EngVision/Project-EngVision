import {
  CloseCircleWhiteIcon,
  TickCircleWhiteIcon,
} from '../../../../components/Icons'
import CustomImage from '../../../../components/common/CustomImage'
import { SubmissionResponse } from '../../../../services/submissionApi/types'
import { ExerciseType, UPLOAD_FILE_URL } from '../../../../utils/constants'
import { ArrowRightOutlined } from '@ant-design/icons'

interface ExplainProps {
  submission: SubmissionResponse | undefined
  questionIndex: number
}

function Explain({ submission, questionIndex }: ExplainProps) {
  const question = submission?.detail[questionIndex]
  const hasGrade =
    question && (!question.hasOwnProperty('grade') || question?.grade !== null)

  const isCorrect = question?.isCorrect
  const explanation = question?.explanation
  const correctAnswer = question?.correctAnswer

  const renderExplainWhenHasGrade = () => {
    if (submission?.exerciseType === ExerciseType.Unscramble) {
      return (
        <div className="flex gap-4">
          <span>Correct answer: </span>
          {correctAnswer.map((answer: string) => (
            <CustomImage
              className="hidden lg:block object-cover w-20 h-20 rounded-md"
              src={`${UPLOAD_FILE_URL}${answer}`}
            />
          ))}
        </div>
      )
    } else if (submission?.exerciseType === ExerciseType.Match) {
      return (
        <div className="flex gap-4">
          <span>Correct answer match: </span>

          <div className="flex flex-col gap-4">
            {correctAnswer?.map((answer: string) => (
              <div className="flex gap-4">
                <span>{answer[0]}</span>
                <ArrowRightOutlined />
                <span>{answer[1]}</span>
              </div>
            ))}
          </div>
        </div>
      )
    } else {
      return <p>{explanation}</p>
    }
  }

  return hasGrade ? (
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

        {renderExplainWhenHasGrade()}
      </div>
    </div>
  ) : (
    <div className={`w-full p-5 rounded-md flex gap-4 mt-7 bg-primary`}>
      {isCorrect ? <TickCircleWhiteIcon /> : <CloseCircleWhiteIcon />}
      <div className="flex-1 text-primary flex flex-col gap-2 text-white">
        {explanation && <p>{explanation}</p>}
        <b className="text-[18px] leading-6">Grading</b>
        <p>Please wait for grading from teacher</p>
      </div>
    </div>
  )
}

export default Explain
