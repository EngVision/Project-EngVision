import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, Form, Progress } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { EmojiHappyIcon, EmojiSadIcon } from '../../components/Icons'
import ArrowLeft from '../../components/Icons/ArrowLeft'
import exerciseApi from '../../services/exerciseApi'
import submissionApi from '../../services/submissionApi'
import { ExerciseType } from '../../utils/constants'
import ConstructedResponse from './components/ConstructedResponse'
import DoneExercise from './components/DoneExercise'
import FillBlank from './components/FillBlank'
import MultipleChoice from './components/MultipleChoice'
import MakeSentence from './components/MakeSentence'
import AppLoading from '../../components/common/AppLoading'

function Exercise() {
  const { id = '' } = useParams()
  const [form] = Form.useForm()
  const queryClient = useQueryClient()

  const [questionIndex, setQuestionIndex] = useState<number>(0)
  const [hasResult, setHasResult] = useState<boolean>(false)
  const [isSubmittable, setIsSubmittable] = useState<boolean>(false)
  const firstLoad = useRef<boolean>(true)

  const navigate = useNavigate()

  const getSubmission = async (exerciseId: string) => {
    const submission = await submissionApi.getSubmission(exerciseId)

    if (firstLoad.current) {
      setQuestionIndex(submission.totalDone || 0)
      firstLoad.current = false
    }
    return submission
  }

  const { data: submission, isLoading: isLoadingSubmission } = useQuery({
    queryKey: ['submission', id],
    queryFn: () => getSubmission(id),
  })

  const { data: exercise, isLoading: isLoadingExercise } = useQuery({
    queryKey: ['exercise', id],
    queryFn: () => exerciseApi.getExercise(id),
  })

  const submitAnswerMutation = useMutation({
    mutationFn: ({ questionId, data }: { questionId: string; data: any }) =>
      exerciseApi.submitAnswer(id, questionId, data),
  })

  useEffect(() => {
    setQuestionIndex(submission?.totalDone || 0)
  }, [submission])

  useEffect(() => {
    setHasResult(!!submission?.detail[questionIndex])
  }, [submission, questionIndex])

  const submitAnswer = async (data: any, questionId: string): Promise<void> => {
    if (id) {
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

  const ExerciseComponent = () => {
    const content = exercise?.content[questionIndex]

    if (questionIndex >= (exercise?.content?.length || 0)) {
      return submission && <DoneExercise {...submission} />
    }

    if (content && id) {
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
              result={submission?.detail[questionIndex]}
              setIsSubmittable={setIsSubmittable}
            />
          )
        case ExerciseType.MakeSentence:
          return (
            <MakeSentence
              {...content}
              exerciseId={id}
              result={submission?.detail[questionIndex]}
            />
          )
        default:
          return <></>
      }
    }
  }

  const previousQuestion = () => {
    setQuestionIndex((prev) => prev - 1)
  }

  const nextQuestion = () => {
    if (questionIndex >= (exercise?.content?.length || 0)) {
      navigate('../..', { relative: 'path' })
    } else {
      if (!hasResult) {
        form.submit()
      } else {
        setQuestionIndex((prev) => prev + 1)
      }
    }
  }

  const onFinish = (values: any) => {
    submitAnswer(values, exercise?.content[questionIndex].id || '')
  }

  if (isLoadingSubmission || isLoadingExercise) return <AppLoading />

  return (
    <Form
      form={form}
      onFinish={onFinish}
      className="h-full flex flex-col md:flex-row md:justify-center relative"
    >
      <div className="flex justify-between">
        <Button
          type="primary"
          ghost
          shape="circle"
          size="large"
          icon={<ArrowLeft />}
          className="ml-5 mt-5 md:ml-10 md:top-0 md:left-0 md:absolute"
          onClick={() => navigate('../..', { relative: 'path' })}
        />
        <Button
          type="primary"
          ghost
          shape="circle"
          size="large"
          icon={'?'}
          className="mr-5 mt-5 md:mr-10 md:top-0 md:right-0 md:absolute"
        />
      </div>

      <div className="flex-1 flex flex-col w-full p-5 md:w-2/3 md:flex-none">
        <div className="flex-1 flex flex-col h-[95%]">
          <Progress
            percent={Math.floor(
              (questionIndex / (exercise?.content.length || 1)) * 100,
            )}
          />
          <div className="flex-1 mx-5 my-10 p-5 overflow-y-auto">
            <div className="mb-14">{ExerciseComponent()}</div>
            {submission?.detail[questionIndex] && (
              <div className="w-full p-5 border-2 border-solid border-primary rounded-md flex items-center gap-4">
                {submission?.detail[questionIndex].isCorrect ? (
                  <EmojiHappyIcon />
                ) : (
                  <EmojiSadIcon />
                )}
                <div className="flex-1 text-primary flex flex-col gap-2">
                  {submission?.detail[questionIndex].isCorrect && (
                    <b>Good job!</b>
                  )}
                  <p>{submission?.detail[questionIndex].explanation}</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-between mb-5">
          <Button
            type="primary"
            size="large"
            ghost
            className="w-[150px]"
            disabled={questionIndex <= 0}
            onClick={previousQuestion}
          >
            Previous
          </Button>
          <Button
            type="primary"
            size="large"
            className="w-[150px]"
            disabled={!isSubmittable}
            onClick={nextQuestion}
            loading={submitAnswerMutation.isPending}
          >
            {!hasResult ? 'Confirm' : 'Next'}
          </Button>
        </div>
      </div>
    </Form>
  )
}

export default Exercise
