import { Button, Progress } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import assignmentApi from '../../services/assignmentApi'
import { AssignmentResponse } from '../../services/assignmentApi/types'
import exerciseApi from '../../services/exerciseApi'
import { ExerciseResponse } from '../../services/exerciseApi/types'
import { ExerciseType } from '../../utils/constants'
import FillBlank from './components/FillBlank'
import MultipleChoice from './components/MultipleChoice'
import ArrowLeft from '../../components/Icons/ArrowLeft'
import DoneExercise from './components/DoneExercise'

function Exercise() {
  const { id } = useParams()

  const [exercise, setExercise] = useState<ExerciseResponse>()
  const [assignment, setAssignment] = useState<AssignmentResponse>()
  const [questionIndex, setQuestionIndex] = useState<number>(0)
  const [hasResult, setHasResult] = useState<boolean>(false)

  const navigate = useNavigate()

  useEffect(() => {
    getExercise()
    getAssignment()
  }, [])

  useEffect(() => {
    setHasResult(!!assignment?.detail[questionIndex])
  }, [assignment, questionIndex])

  const getAssignment = async () => {
    if (id) {
      const assignment = await assignmentApi.getAssignment(id)

      setAssignment(assignment)
      setQuestionIndex(assignment?.totalDone || 0)
    }
  }

  const getExercise = async () => {
    if (id) {
      const exercise = await exerciseApi.getExercise(id)

      setExercise(exercise)
    }
  }

  const submitAnswer = async (data: any, questionId: string): Promise<void> => {
    if (id) {
      await exerciseApi.submitAnswer(id, questionId, data)
      const assignment = await assignmentApi.getAssignment(id)

      setAssignment(assignment)
    }
  }

  const ExerciseComponent = () => {
    const content = exercise?.content[questionIndex]

    if (questionIndex >= (exercise?.content?.length || 0)) {
      return assignment && <DoneExercise {...assignment} />
    }

    if (content && id) {
      switch (exercise?.type) {
        case ExerciseType.MultipleChoice:
          return (
            <MultipleChoice
              {...content}
              exerciseId={id}
              result={assignment?.detail[questionIndex]}
              submitAnswer={submitAnswer}
            />
          )
        case ExerciseType.FillBlank:
          return (
            <FillBlank
              {...content}
              exerciseId={id}
              result={assignment?.detail[questionIndex]}
              submitAnswer={submitAnswer}
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
      console.log('nextExerciseId')
    } else {
      setQuestionIndex((prev) => prev + 1)
    }
  }

  return (
    <div className="h-screen flex flex-col md:flex-row md:justify-center">
      <div className="flex justify-between">
        <Button
          type="primary"
          ghost
          shape="circle"
          size="large"
          icon={<ArrowLeft />}
          className="ml-5 mt-5 md:ml-10 md:top-0 md:left-0 md:fixed"
          onClick={() => navigate('..', { relative: 'path' })}
        />
        <Button
          type="primary"
          ghost
          shape="circle"
          size="large"
          icon={'?'}
          className="mr-5 mt-5 md:mr-10 md:top-0 md:right-0 md:fixed"
        />
      </div>

      <div className="flex-1 flex flex-col w-full p-5 md:w-2/3 md:flex-none">
        <div className="flex-1 flex flex-col">
          <Progress
            percent={Math.floor(
              (questionIndex / (exercise?.content.length || 1)) * 100,
            )}
          />
          <div className="flex-1 px-5 py-10">{ExerciseComponent()}</div>
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
            disabled={
              !hasResult && questionIndex < (exercise?.content?.length || 0)
            }
          >
            {`${
              questionIndex >= (exercise?.content?.length || 0)
                ? 'Next exercise'
                : 'Next'
            }`}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Exercise
