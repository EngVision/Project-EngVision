import { Button, ConfigProvider, Select } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { setCurrentLevel } from '../../../redux/app/slice'
import { examApi } from '../../../services/examApi'
import userLevelApi from '../../../services/userLevelApi'
import { CEFRLevel, STUDENT_ROUTES } from '../../../utils/constants'

const GetStarted = () => {
  const level = useAppSelector((state) => state.app.currentLevel)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [tempLevel, setTempLevel] = useState<CEFRLevel>(CEFRLevel.A1)

  const items = [
    {
      label: CEFRLevel.C2,
      value: CEFRLevel.C2,
    },
    {
      label: CEFRLevel.C1,
      value: CEFRLevel.C1,
    },
    {
      label: CEFRLevel.B2,
      value: CEFRLevel.B2,
    },
    {
      label: CEFRLevel.B1,
      value: CEFRLevel.B1,
    },
    {
      label: CEFRLevel.A2,
      value: CEFRLevel.A2,
    },
    {
      label: CEFRLevel.A1,
      value: CEFRLevel.A1,
    },
  ]

  const startEntranceTest = async () => {
    const exam = await examApi.getEntranceExam(level?.CEFRLevel || CEFRLevel.A1)
    navigate(`./${level?.CEFRLevel}/exam/${exam.id}`)
  }

  const optionTest = () => {
    return (
      <div className="flex flex-col my-5">
        <h1 className="text-blue-600">
          Would you like to take the English proficiency test or skip?
        </h1>
        <div className="flex flex-row gap-5 my-4 justify-center">
          <Button
            className="w-40"
            type="default"
            size="large"
            onClick={() => navigate(STUDENT_ROUTES.discover)}
          >
            Skip
          </Button>
          <Button
            className="w-40"
            size="large"
            type="primary"
            onClick={startEntranceTest}
          >
            Confirm
          </Button>
        </div>
      </div>
    )
  }

  const onChange = (value: CEFRLevel) => {
    setTempLevel(value)
  }

  const onClick = async () => {
    const userLevel = await userLevelApi.createUserLevel({ level: tempLevel })

    dispatch(setCurrentLevel(userLevel))
  }

  return (
    <div className="justify-center content-center">
      {!level ? (
        <div className="w-[620px] flex flex-col">
          <h1 className="text-[38px] text-blue-600">
            Please select your current level
          </h1>
          <span className="text-xl my-2 text-zinc-700">
            Choose your current level from the list below. Afterward, you can
            participate in a test to reassess.
          </span>
          <div className="w-full text-center">
            <ConfigProvider
              theme={{
                components: {
                  Select: {
                    fontSize: 18,
                  },
                },
              }}
            >
              <Select
                className="mt-5 cursor-pointer min-w-[160px] text-left"
                size="large"
                placeholder="Select a level"
                optionFilterProp="children"
                onChange={onChange}
                options={items.reverse()}
              />

              <Button
                disabled={!tempLevel ? true : false}
                onClick={onClick}
                size="large"
                className="ml-4"
              >
                Confirm
              </Button>
            </ConfigProvider>
          </div>
        </div>
      ) : (
        optionTest()
      )}
    </div>
  )
}

export default GetStarted
