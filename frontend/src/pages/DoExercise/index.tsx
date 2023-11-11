import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import AppLoading from '../../components/common/AppLoading'
import { useParams } from 'react-router-dom'
import exerciseApi from '../../services/exerciseApi'
import submissionApi from '../../services/submissionApi'
import Exercise from '../Exercise'
import { useEffect, useRef, useState } from 'react'
import ProgressExercise from '../Exercise/components/ProgressExercise'

const DoExercise = () => {
  const { exerciseId = '' } = useParams()
  const queryClient = useQueryClient()
  const [questionIndex, setQuestionIndex] = useState<number>(0)
  const firstLoad = useRef<boolean>(true)

  const { data: submission, isLoading: isLoadingSubmission } = useQuery({
    queryKey: ['submission', exerciseId],
    queryFn: () => submissionApi.getSubmissionByExercise(exerciseId),
  })

  const { data: exercise, isLoading: isLoadingExercise } = useQuery({
    queryKey: ['exercise', exerciseId],
    queryFn: () => exerciseApi.getExercise(exerciseId),
  })

  useEffect(() => {
    if (firstLoad.current && submission !== undefined) {
      firstLoad.current = false
      setQuestion(submission?.totalDone || 0)
    }
  }, [submission])

  const submitAnswerMutation = useMutation({
    mutationFn: ({ questionId, data }: { questionId: string; data: any }) =>
      exerciseApi.submitAnswer(
        exercise?.id ? exercise.id : '',
        questionId,
        data,
      ),
  })

  const submitAnswer = async (data: any, questionId: string): Promise<void> => {
    if (exercise?.id) {
      submitAnswerMutation.mutate(
        { questionId, data },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['submission'] })
          },
        },
      )
    }
  }

  const onFinish = (values: any) => {
    submitAnswer(values, exercise?.content[questionIndex].id || '')
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
      questionIndex={questionIndex}
      btnConfirmLoading={submitAnswerMutation.isPending}
      setQuestion={setQuestion}
      onFinishFunc={onFinish}
      QuizProgressComponent={QuizProgressComponent}
    />
  )
}

export default DoExercise
