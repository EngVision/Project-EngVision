import { Button, Form } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ArrowLeft from '../../components/Icons/ArrowLeft'
import { TwoColumnLayout } from './layouts/TwoColumnLayout'
import { OneColumnLayout } from './layouts/OneColumnLayout'
import { SubmissionResponse } from '../../services/submissionApi/types'
import ExerciseContent from './components/ExerciseContent'
import Explain from './components/Explain'
import GradingExercise from './components/GradingExercise'
import { ExerciseSchema } from '../../services/exerciseApi/types'

interface ExerciseProps {
  exercise?: ExerciseSchema
  submission?: SubmissionResponse
  isGrading?: boolean
  btnConfirmLoading?: boolean
  btnGradeLoading?: boolean
  hasPreviousPart?: boolean
  grade?: number
  questionIndex: number
  QuizProgressComponent: React.ComponentType
  setQuestion: (questionIndex: number) => void
  onFinishFunc: (values: any) => void
  backUrl?: string
}

function Exercise({
  exercise,
  submission,
  questionIndex,
  btnConfirmLoading,
  btnGradeLoading,
  QuizProgressComponent,
  setQuestion,
  onFinishFunc,
  isGrading = false,
  hasPreviousPart = false,
  grade,
  backUrl,
}: ExerciseProps) {
  const [form] = Form.useForm()
  const [hasResult, setHasResult] = useState<boolean>(false)
  const [isSubmittable, setIsSubmittable] = useState<boolean>(false)

  const navigate = useNavigate()

  useEffect(() => {
    setHasResult(
      !!submission?.detail[questionIndex] ||
        questionIndex >= (exercise?.content?.length || 0),
    )
  }, [submission, questionIndex])

  const Content = () => {
    return (
      <>
        <div className={isGrading ? 'mb-10' : 'mt-5'}>
          <ExerciseContent
            exercise={exercise}
            submission={submission}
            questionIndex={questionIndex}
            setIsSubmittable={setIsSubmittable}
            grade={grade}
          />
        </div>
        {isGrading ? (
          <GradingExercise
            exercise={exercise}
            submission={submission}
            questionIndex={questionIndex}
            isButtonLoading={btnGradeLoading}
          />
        ) : (
          !exercise?.needGrade &&
          submission?.detail[questionIndex] && (
            <Explain
              isCorrect={submission?.detail[questionIndex]?.isCorrect}
              explanation={submission?.detail[questionIndex]?.explanation}
            />
          )
        )}
      </>
    )
  }

  const previousQuestion = () => {
    setQuestion(questionIndex - 1)
  }

  const nextQuestion = () => {
    if (questionIndex >= (exercise?.content?.length || 0)) {
      back()
    } else {
      if (!hasResult) {
        form.submit()
      } else {
        setQuestion(questionIndex + 1)
      }
    }
  }

  const onFinish = (values: any) => {
    onFinishFunc(values)
  }

  const back = () => {
    if (backUrl) navigate(backUrl)
    else navigate(-1)
  }

  return (
    <Form
      form={form}
      onFinish={onFinish}
      className="h-full w-full flex flex-col md:flex-row md:justify-center relative"
    >
      <div className="flex-1 min-h-[0px] py-[5px] flex flex-col w-full justify-between align-middle">
        <div className="flex justify-between">
          <Button
            type="primary"
            ghost
            shape="circle"
            size="large"
            icon={<ArrowLeft />}
            onClick={() => back()}
          />
          <div className="flex flex-col items-center">
            <QuizProgressComponent />
          </div>
          <Button type="primary" ghost shape="circle" size="large" icon={'?'} />
        </div>
        <div className="flex-1 flex flex-col min-h-[0px]">
          {exercise?.contentQuestion ? (
            <TwoColumnLayout contentQuestion={exercise.contentQuestion}>
              {Content()}
            </TwoColumnLayout>
          ) : (
            <OneColumnLayout>{Content()}</OneColumnLayout>
          )}
        </div>
        <div className="flex justify-between">
          <Button
            type="primary"
            size="large"
            ghost
            className="w-[150px]"
            disabled={questionIndex <= 0 && !hasPreviousPart}
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
            loading={btnConfirmLoading}
          >
            {!hasResult || questionIndex >= (exercise?.content?.length || 0)
              ? 'Confirm'
              : 'Next'}
          </Button>
        </div>
      </div>
    </Form>
  )
}

export default Exercise
