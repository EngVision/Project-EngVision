import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, Form, Input, Space } from 'antd'
import { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  EmojiHappyIcon,
  EmojiSadIcon,
  TickIcon,
  XMarkIcon,
} from '../../components/Icons'
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
import { TwoColumnLayout } from './layouts/TwoColumnLayout'
import { OneColumnLayout } from './layouts/OneColumnLayout'
import TextArea from 'antd/es/input/TextArea'
import { FormInstance } from 'antd/lib'
import { GradePayload } from '../../services/submissionApi/types'

const Grade = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

function Exercise() {
  const { id = '' } = useParams()
  const { submissionId = '' } = useParams()
  const [form] = Form.useForm()
  const queryClient = useQueryClient()

  const [questionIndex, setQuestionIndex] = useState<number>(0)
  const [hasResult, setHasResult] = useState<boolean>(false)
  const [isSubmittable, setIsSubmittable] = useState<boolean>(false)
  const [grade, setGrade] = useState<number>(-1)
  const firstLoad = useRef<boolean>(true)

  const navigate = useNavigate()

  const getSubmission = async (id: string) => {
    const submission = await submissionApi.getSubmission(id)

    if (firstLoad.current && !submissionId) {
      firstLoad.current = false
      setQuestionIndex(submission.totalDone || 0)
    }

    return submission
  }

  const { data: submission, isLoading: isLoadingSubmission } = useQuery({
    queryKey: ['submission', id],
    queryFn: () => getSubmission(submissionId ? submissionId : id),
  })

  const { data: exercise, isLoading: isLoadingExercise } = useQuery({
    queryKey: ['exercise', id],
    queryFn: () => exerciseApi.getExercise(id),
  })

  const submitAnswerMutation = useMutation({
    mutationFn: ({ questionId, data }: { questionId: string; data: any }) =>
      exerciseApi.submitAnswer(id, questionId, data),
  })

  const gradeSubmissionMutation = useMutation({
    mutationFn: ({
      questionId,
      data,
    }: {
      questionId: string
      data: GradePayload
    }) => submissionApi.gradeSubmission(submissionId, questionId, data),
  })

  useEffect(() => {
    setHasResult(!!submission?.detail[questionIndex])

    if (submissionId) {
      form.setFieldValue('grade', submission?.detail[questionIndex]?.grade)
      form.setFieldValue(
        'explanation',
        submission?.detail[questionIndex]?.explanation,
      )
      setGrade(
        submission?.detail[questionIndex]?.grade
          ? submission?.detail[questionIndex]?.grade
          : -1,
      )
    }
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

  const gradeSubmission = async (
    questionId: string,
    data: GradePayload,
  ): Promise<void> => {
    if (submissionId) {
      gradeSubmissionMutation.mutate(
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
              setIsSubmittable={setIsSubmittable}
            />
          )
        default:
          return <></>
      }
    }
  }

  const ExplainComponent = () => {
    return (
      submission?.detail[questionIndex] && (
        <div className="w-full p-5 border-2 border-solid border-primary rounded-md flex items-center gap-4 mt-5">
          {submission?.detail[questionIndex].isCorrect ? (
            <EmojiHappyIcon />
          ) : (
            <EmojiSadIcon />
          )}
          <div className="flex-1 text-primary flex flex-col gap-2">
            {submission?.detail[questionIndex].isCorrect && <b>Good job!</b>}
            <p>{submission?.detail[questionIndex].explanation}</p>
          </div>
        </div>
      )
    )
  }

  const DoExerciseComponent = () => {
    return (
      <>
        <div className="mt-5">{ExerciseComponent()}</div>
        <ExplainComponent />
      </>
    )
  }

  const GradingExerciseComponent = (form: FormInstance) => {
    return (
      <>
        <div className="mb-10">{ExerciseComponent()}</div>
        {questionIndex < (exercise?.content?.length || 0) && (
          <div>
            <Form.Item
              className="mb-3"
              label="Points"
              name="grade"
              initialValue={submission?.detail[questionIndex]?.grade}
              rules={[
                { required: true },
                () => ({
                  async validator(_, value) {
                    return new Promise((resolve, reject) => {
                      if (
                        value &&
                        (!Number(value) ||
                          Number(value) > 10 ||
                          Number(value) < 0)
                      ) {
                        reject(new Error('Grade must be between 0 and 10'))
                      } else {
                        resolve('')
                        setGrade(Number(value))
                      }
                    })
                  },
                }),
              ]}
            >
              <Input className="w-[50px]" />
            </Form.Item>
            <div className="flex gap-1 flex-wrap mb-5">
              {Grade.map((g) => (
                <Button
                  key={g}
                  onClick={() => {
                    form.setFieldValue('grade', g)
                    setGrade(g)
                  }}
                  type={g === grade ? 'primary' : 'default'}
                >
                  {g}
                </Button>
              ))}
            </div>
            <p className="mb-3">Explanation</p>
            <Form.Item
              name="explanation"
              initialValue={submission?.detail[questionIndex]?.explanation}
            >
              <TextArea
                placeholder="Explanation (Optional)"
                autoSize={{ minRows: 2, maxRows: 4 }}
              />
            </Form.Item>
            <div className="w-full text-center">
              <Button
                type="primary"
                onClick={() => form.submit()}
                loading={gradeSubmissionMutation.isPending}
              >
                Grade
              </Button>
            </div>
          </div>
        )}
      </>
    )
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

  const gotoQuestion = (index: number) => {
    if (!(index > (submission?.totalDone || 0))) setQuestionIndex(index)
  }

  const onFinish = (values: any) => {
    if (submissionId) {
      const data: GradePayload = {}
      data.grade = Number(values.grade)
      if (values.explanation) data.explanation = values.explanation

      gradeSubmission(exercise?.content[questionIndex].id || '', data)
    } else submitAnswer(values, exercise?.content[questionIndex].id || '')
  }

  if (isLoadingSubmission || isLoadingExercise) return <AppLoading />

  const getBackground = (index: number) => {
    if (index === questionIndex) return 'bg-sky-600'
    else if (submission?.detail[index].isCorrect === false) return 'bg-red-500'
    else if (submission?.detail[index].isCorrect) return 'bg-green-500'
    else return 'bg-slate-300'
  }

  return (
    <Form
      form={form}
      onFinish={onFinish}
      className="h-full flex flex-col md:flex-row md:justify-center relative"
    >
      <div className="flex-1 min-h-[0px] flex flex-col w-full justify-between align-middle">
        <div className="flex justify-between">
          <Button
            type="primary"
            ghost
            shape="circle"
            size="large"
            icon={<ArrowLeft />}
            onClick={() => navigate('../..', { relative: 'path' })}
          />
          <div className="flex flex-col items-center">
            <p>Quiz progress</p>
            <Space>
              {exercise?.content.map((_, index) => (
                <div
                  key={index}
                  onClick={() => gotoQuestion(index)}
                  className={`w-[20px] h-[20px] rounded-[10px] ${
                    !(index > (submission?.totalDone || 0))
                      ? 'cursor-pointer'
                      : ''
                  } ${getBackground(index)}`}
                >
                  {submission?.detail[index]?.isCorrect && (
                    <TickIcon className="bg-transparent" />
                  )}
                  {!submission?.detail[index]?.isCorrect === false && (
                    <XMarkIcon className="bg-transparent" />
                  )}
                </div>
              ))}
            </Space>
          </div>
          <Button type="primary" ghost shape="circle" size="large" icon={'?'} />
        </div>
        <div className="flex-1 flex flex-col min-h-[0px]">
          {exercise?.contentQuestion ? (
            <TwoColumnLayout contentQuestion={exercise.contentQuestion}>
              {submissionId
                ? GradingExerciseComponent(form)
                : DoExerciseComponent()}
            </TwoColumnLayout>
          ) : (
            <OneColumnLayout>
              {submissionId
                ? GradingExerciseComponent(form)
                : DoExerciseComponent()}
            </OneColumnLayout>
          )}
        </div>
        <div className="flex justify-between">
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
            disabled={!isSubmittable && !hasResult}
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
