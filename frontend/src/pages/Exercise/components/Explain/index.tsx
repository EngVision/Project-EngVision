import { ArrowRightOutlined } from '@ant-design/icons'
import {
  CloseCircleWhiteIcon,
  TickCircleWhiteIcon,
} from '../../../../components/Icons'
import CustomImage from '../../../../components/common/CustomImage'
import {
  DragAndDropAnswer,
  MatchPairSchema,
} from '../../../../services/exerciseApi/types'
import { SubmissionResponse } from '../../../../services/submissionApi/types'
import { getFileUrl } from '../../../../utils/common'
import {
  ExerciseMatchType,
  ExerciseType,
  UPLOAD_FILE_URL,
} from '../../../../utils/constants'

interface ExplainProps {
  submission: SubmissionResponse | undefined
  questionDetail: any
  questionIndex: number
}

function Explain({ submission, questionDetail, questionIndex }: ExplainProps) {
  const question = submission?.detail[questionIndex]
  const hasGrade =
    !question?.hasOwnProperty('grade') || question?.grade !== null

  const isCorrect = question?.isCorrect
  const explanation = question?.explanation
  const correctAnswer = question?.correctAnswer
  const answer = question?.answer

  const renderExplainWhenHasGrade = () => {
    if (submission?.exerciseType === ExerciseType.Unscramble) {
      return (
        <div className="flex gap-4">
          <span>Correct answer: </span>
          {correctAnswer.map((answer: string) =>
            questionDetail?.question?.isUnscrambleByText ? (
              <span key={answer}>{answer}</span>
            ) : (
              <CustomImage
                key={answer}
                className="hidden lg:block object-cover w-20 h-20 rounded-md"
                src={`${UPLOAD_FILE_URL}${answer}`}
              />
            ),
          )}
        </div>
      )
    } else if (submission?.exerciseType === ExerciseType.Match) {
      return (
        <div className="flex gap-4">
          <span>Correct answer is: </span>

          <div className="flex flex-col gap-4">
            {correctAnswer?.map((answer: MatchPairSchema[], index: number) => (
              <div className="flex items-center gap-4" key={index}>
                {answer[0].type === ExerciseMatchType.Text ? (
                  <span>{answer[0].content}</span>
                ) : (
                  <CustomImage
                    src={getFileUrl(answer[0].content)}
                    className="w-20 h-20 object-cover"
                  />
                )}

                <ArrowRightOutlined />

                {answer[1].type === ExerciseMatchType.Text ? (
                  <span>{answer[1].content}</span>
                ) : (
                  <CustomImage
                    src={getFileUrl(answer[1].content)}
                    className="w-20 h-20 object-cover"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )
    } else if (submission?.exerciseType === ExerciseType.DragAndDrop) {
      return (
        <div className="flex gap-4">
          <span>Correct answer is: </span>

          <div className="flex flex-col gap-4">
            {correctAnswer?.map((answer: DragAndDropAnswer, index: number) => (
              <div className="flex items-center gap-4" key={index}>
                <CustomImage
                  src={getFileUrl(answer.image)}
                  className="w-20 h-20 object-cover"
                />

                <ArrowRightOutlined />

                <span>{answer.text}</span>
              </div>
            ))}
          </div>
        </div>
      )
    } else {
      return <p>{explanation}</p>
    }
  }

  if (
    submission?.exerciseType === ExerciseType.Speaking &&
    question?.explanation
  ) {
    return (
      <p
        className="text-center"
        dangerouslySetInnerHTML={{ __html: question.explanation }}
      ></p>
    )
  }

  if (submission?.exerciseType === ExerciseType.WordSearch) {
    const { numberQuestionCorrect, numberQuestion } = answer
    return (
      <div
        className={`w-full p-5 rounded-md flex gap-4 mt-7 ${
          numberQuestionCorrect === numberQuestion
            ? 'bg-green-500'
            : 'bg-secondary'
        }`}
      >
        {numberQuestionCorrect === numberQuestion ? (
          <TickCircleWhiteIcon />
        ) : (
          <CloseCircleWhiteIcon />
        )}
        <div className="flex-1 text-primary flex flex-col gap-2 text-white">
          {
            <b className="text-[18px] leading-6">
              {numberQuestionCorrect === numberQuestion ? 'Correct!' : 'Wrong!'}
            </b>
          }

          {numberQuestionCorrect === numberQuestion ? (
            <span>You found all words</span>
          ) : (
            <span>
              Your score: {numberQuestionCorrect}/{numberQuestion}
            </span>
          )}
        </div>
      </div>
    )
  }

  return hasGrade || isCorrect !== null ? (
    <div
      className={`w-full p-5 rounded-md flex gap-4 mt-7 ${
        isCorrect === null || isCorrect ? 'bg-green-500' : 'bg-secondary'
      }`}
    >
      {isCorrect !== null &&
        (isCorrect ? <TickCircleWhiteIcon /> : <CloseCircleWhiteIcon />)}
      <div className="flex-1 text-primary flex flex-col gap-2 text-white">
        {
          <b className="text-[18px] leading-6">
            {isCorrect !== null && (isCorrect ? 'Correct!' : 'Wrong!')}
          </b>
        }

        {renderExplainWhenHasGrade()}
      </div>
    </div>
  ) : (
    <div className={`w-full p-5 rounded-md flex gap-4 mt-7 bg-primary`}>
      {isCorrect !== null &&
        (isCorrect ? <TickCircleWhiteIcon /> : <CloseCircleWhiteIcon />)}
      <div className="flex-1 text-primary flex flex-col gap-2 text-white">
        {explanation && <p>{explanation}</p>}
        <b className="text-[18px] leading-6">Grading</b>
        <p>Please wait for grading from teacher</p>
      </div>
    </div>
  )
}

export default Explain
