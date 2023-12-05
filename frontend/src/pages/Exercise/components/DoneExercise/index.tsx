import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux'
import userLevelApi from '../../../../services/userLevelApi'
import { setCurrentLevel } from '../../../../redux/app/slice'
import { Progress } from 'antd'

interface DoneExerciseProps {
  grade?: number
}

function DoneExercise({ grade }: DoneExerciseProps) {
  const dispatch = useAppDispatch()
  const currentLevel = useAppSelector((state) => state.app.currentLevel)

  useEffect(() => {
    const getUserLevel = async () => {
      const level = await userLevelApi.getUserLevel()
      dispatch(setCurrentLevel(level))
    }

    getUserLevel()
  }, [])

  return (
    <div className="h-full flex flex-col gap-4 justify-center text-center text-primary">
      <p className="text-2xl font-semibold">
        Your test result has completed with
      </p>
      <p className="text-4xl font-bold">{grade?.toFixed(2) || 0} / 10.00</p>
      <Progress
        type="circle"
        percent={((currentLevel?.overall || 0) / 250) * 100}
        size={200}
        format={() => (
          <div className="flex flex-col gap-2">
            <p className="text-2lg">{currentLevel?.overall}</p>
            <p className="text-2lg">
              Level <span className="font-bold">{currentLevel?.CEFRLevel}</span>
            </p>
          </div>
        )}
      />
    </div>
  )
}

export default DoneExercise
