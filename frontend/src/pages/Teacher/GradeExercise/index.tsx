import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import submissionApi from '../../../services/submissionApi'
import exerciseApi from '../../../services/exerciseApi'
import AppLoading from '../../../components/common/AppLoading'
import Exercise from '../../Exercise'
import { useState } from 'react'
import { GradePayload } from '../../../services/submissionApi/types'
import { message } from 'antd'
import ProgressExercise from '../../Exercise/components/ProgressExercise'

const GradeExercise = () => {
  const { exerciseId = '' } = useParams()
  const { submissionId = '' } = useParams()
  const [questionIndex, setQuestionIndex] = useState<number>(0)
  const queryClient = useQueryClient()

  const { data: submission, isLoading: isLoadingSubmission } = useQuery({
    queryKey: ['submission', exerciseId],
    queryFn: () => submissionApi.getSubmissionById(submissionId),
  })

  const { data: exercise, isLoading: isLoadingExercise } = useQuery({
    queryKey: ['exercise', exerciseId],
    queryFn: () => exerciseApi.getExercise(exerciseId),
  })

  const gradeSubmissionMutation = useMutation({
    mutationFn: ({
      questionId,
      data,
    }: {
      questionId: string
      data: GradePayload
    }) =>
      submissionApi.gradeSubmission(
        submission?.id ? submission.id : '',
        questionId,
        data,
      ),
  })

  const gradeSubmission = async (
    questionId: string,
    data: GradePayload,
  ): Promise<void> => {
    gradeSubmissionMutation.mutate(
      { questionId, data },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['submission'] })
          message.open({
            key: 'gradeExercise',
            content: 'Grade successfully',
            type: 'success',
          })
        },
        onError: () => {
          message.open({
            key: 'gradeExercise',
            content: 'Grade fail! Something went wrong',
            type: 'error',
          })
        },
      },
    )
  }

  const onFinish = (values: any) => {
    const data: GradePayload = {}
    data.grade = Number(values.grade)
    if (values.explanation) {
      data.explanation = values.explanation
    }
    if (values.teacherCorrection) {
      data.teacherCorrection = values.teacherCorrection
    }

    gradeSubmission(exercise?.content[questionIndex].id || '', data)
  }

  const gotoQuestion = (index: number) => {
    if (!(index > (submission?.totalDone || 0))) setQuestionIndex(index)
  }

  const setQuestion = (questionIndex: number) => {
    setQuestionIndex(questionIndex)
  }

  const QuizProgressComponent = () => {
    return (
      <ProgressExercise
        exercise={exercise}
        submission={submission}
        questionIndex={questionIndex}
        gotoQuestion={gotoQuestion}
      />
    )
  }

  if (isLoadingSubmission || isLoadingExercise) return <AppLoading />

  return (
    <Exercise
      exercise={exercise}
      submission={submission}
      isGrading={true}
      questionIndex={questionIndex}
      btnGradeLoading={gradeSubmissionMutation.isPending}
      setQuestion={setQuestion}
      onFinishFunc={onFinish}
      QuizProgressComponent={QuizProgressComponent}
    />
  )
}

export default GradeExercise
