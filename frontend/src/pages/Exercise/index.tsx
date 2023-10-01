import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import exerciseApi from '../../services/exerciseApi'
import { ExerciseResponse } from '../../services/exerciseApi/types'
import { ExerciseType } from '../../utils/constants'
import FillBlank from './components/FillBlank'
import MultipleChoice from './components/MultipleChoice'
import { Button, Progress } from 'antd'
import assignmentApi from '../../services/assignmentApi'
import { AssignmentResponse } from '../../services/assignmentApi/types'

function Exercise() {
  const [exercise, setExercise] = useState<ExerciseResponse>()
  const [assignment, setAssignment] = useState<AssignmentResponse>()
  const [questionIndex, setQuestionIndex] = useState<number>(0)
  const { id } = useParams()

  useEffect(() => {
    const getExercise = async () => {
      if (id) {
        const exercise = await exerciseApi.getExercise(id)

        setExercise(exercise)
      }
    }

    const getAssignment = async () => {
      if (id) {
        const assignment = await assignmentApi.getAssignment(id)

        setAssignment(assignment)
        setQuestionIndex(assignment.totalDone)
      }
    }

    getExercise()
    getAssignment()
  }, [])

  const ExerciseComponent = () => {
    const content = exercise?.content[questionIndex]

    if (content && id) {
      switch (exercise?.type) {
        case ExerciseType.MultipleChoice:
          return (
            <MultipleChoice
              {...content}
              exerciseId={id}
              result={assignment?.detail[questionIndex]}
            />
          )
        case ExerciseType.FillBlank:
          return <FillBlank />
        default:
          return <></>
      }
    }
  }

  const previousQuestion = () => {
    setQuestionIndex((prev) => prev - 1)
  }

  const nextQuestion = () => {
    setQuestionIndex((prev) => prev + 1)
  }

  return (
    <div className="flex flex-col h-full justify-between p-5">
      <div>
        <Progress
          percent={
            (questionIndex / ((exercise?.content.length || 1) - 1)) * 100
          }
        />
        <div className="px-5 py-10">{ExerciseComponent()}</div>
      </div>
      <div className="flex justify-between mb-5">
        <Button
          type="primary"
          ghost
          className="w-[150px]"
          disabled={questionIndex <= 0}
          onClick={previousQuestion}
        >
          Previous
        </Button>
        <Button type="primary" className="w-[150px]" onClick={nextQuestion}>
          {`${
            questionIndex >= (exercise?.content.length || 0) - 1
              ? 'Done'
              : 'Next'
          }`}
        </Button>
      </div>
    </div>
  )
}

export default Exercise
