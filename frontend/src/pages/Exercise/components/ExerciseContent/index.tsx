import { ExerciseSchema } from '../../../../services/exerciseApi/types'
import { SubmissionResponse } from '../../../../services/submissionApi/types'
import { ExerciseType } from '../../../../utils/constants'
import ConstructedResponse from '../ConstructedResponse'
import DoneExercise from '../DoneExercise'
import FillBlank from '../FillBlank'
import MakeSentence from '../MakeSentence'
import MultipleChoice from '../MultipleChoice'
import Unscramble from '../Unscramble'

interface ExerciseContentProps {
  exercise?: ExerciseSchema
  submission?: SubmissionResponse
  questionIndex: number
  grade?: number
  isGrading?: boolean
  setIsSubmittable: (value: boolean) => void
}

function ExerciseContent({
  exercise,
  submission,
  questionIndex,
  grade,
  isGrading,
  setIsSubmittable,
}: ExerciseContentProps) {
  const content = exercise?.content[questionIndex]

  if (questionIndex >= (exercise?.content?.length || 0)) {
    return (
      submission && <DoneExercise grade={grade ? grade : submission.grade} />
    )
  }

  if (content) {
    switch (exercise?.type) {
      case ExerciseType.MultipleChoice:
        return (
          <MultipleChoice
            {...content}
            result={submission?.detail[questionIndex]}
            setIsSubmittable={setIsSubmittable}
          />
        )
      case ExerciseType.FillBlank:
        return (
          <FillBlank
            {...content}
            result={submission?.detail[questionIndex]}
            setIsSubmittable={setIsSubmittable}
          />
        )
      case ExerciseType.ConstructedResponse:
        return (
          <ConstructedResponse
            {...content}
            {...exercise}
            isGrading={isGrading}
            result={submission?.detail[questionIndex]}
            setIsSubmittable={setIsSubmittable}
          />
        )
      case ExerciseType.MakeSentence:
        return (
          <MakeSentence
            {...content}
            result={submission?.detail[questionIndex]}
            setIsSubmittable={setIsSubmittable}
          />
        )
      case ExerciseType.Unscramble:
        return (
          <Unscramble
            {...content}
            result={submission?.detail[questionIndex]}
            setIsSubmittable={setIsSubmittable}
          />
        )
      default:
        return <></>
    }
  }
}

export default ExerciseContent
