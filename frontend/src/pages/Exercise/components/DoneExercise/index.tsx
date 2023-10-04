import React from 'react'

interface DoneExerciseProps {
  totalCorrect: number
  totalDone: number
}

function DoneExercise({ totalCorrect, totalDone }: DoneExerciseProps) {
  return (
    <div className="h-full flex flex-col gap-4 justify-center text-center text-primary">
      <p className="text-2xl font-semibold">
        Your test result has completed with
      </p>
      <p className="text-4xl font-bold">
        {((totalCorrect / totalDone) * 100).toFixed(0)}%
      </p>
      <p className="text-xl font-medium">
        You just ranking up to <span className="font-bold">B2</span>
      </p>
    </div>
  )
}

export default DoneExercise
