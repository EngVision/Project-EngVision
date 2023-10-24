import { Button, Form, Progress } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { EmojiHappyIcon, EmojiSadIcon } from '../../components/Icons'
import ArrowLeft from '../../components/Icons/ArrowLeft'
import submissionApi from '../../services/submissionApi'
import exerciseApi from '../../services/exerciseApi'
import { ExerciseType } from '../../utils/constants'
import DoneExercise from './components/DoneExercise'
import FillBlank from './components/FillBlank'
import MultipleChoice from './components/MultipleChoice'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

function Exercise() {
  const { id = '' } = useParams()
  const [form] = Form.useForm()
  const queryClient = useQueryClient()

  const [questionIndex, setQuestionIndex] = useState<number>(0)
  const [hasResult, setHasResult] = useState<boolean>(false)

  const navigate = useNavigate()

  const getSubmission = async (exerciseId: string) => {
    const submission = await submissionApi.getSubmission(exerciseId)

    setQuestionIndex(submission.totalDone || 0)
    return submission
  }

  const { data: submission } = useQuery({
    queryKey: ['submission', id],
    queryFn: () => getSubmission(id),
  })

  const { data: exercise } = useQuery({
    queryKey: ['exercise', id],
    queryFn: () => exerciseApi.getExercise(id),
  })

  const submitAnswerMutation = useMutation({
    mutationFn: ({ questionId, data }: { questionId: string; data: any }) =>
      exerciseApi.submitAnswer(id, questionId, data),
  })

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
              exerciseId={id}
              result={submission?.detail[questionIndex]}
            />
          )
        case ExerciseType.FillBlank:
          return (
            <FillBlank
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
        <div className="flex-1 flex flex-col">
          <Progress
            percent={Math.floor(
              (questionIndex / (exercise?.content.length || 1)) * 100,
            )}
          />
          <div className="flex-1 px-5 py-10">
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
            onClick={nextQuestion}
          >
            {!hasResult ? 'Confirm' : 'Next'}
          </Button>
        </div>
      </div>
    </Form>
  )
}

export default Exercise
