import { Button, ConfigProvider, Select } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CEFRLevel, STUDENT_ROUTES } from '../../../utils/constants'
import { examApi } from '../../../services/examApi'

const GetStarted = () => {
  const navigate = useNavigate()
  const [level, setLevel] = useState<string>('')

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
    const exam = await examApi.getEntranceExam(level)
    navigate(`./${level}/exam/${exam.id}`)
  }

  const optionTest = () => {
    return (
      <div className="flex flex-col my-5">
        <h1 className="text-blue-600">
          Do you want to take a retest of your level?
        </h1>
        <div className="flex flex-row gap-5 my-4 justify-center">
          <Button
            className="w-40"
            type="default"
            size="large"
            onClick={() => navigate(STUDENT_ROUTES.discover)}
          >
            No
          </Button>
          <Button
            className="w-40"
            size="large"
            type="primary"
            onClick={startEntranceTest}
          >
            Yes
          </Button>
        </div>
      </div>
    )
  }

  const onChange = (value: string) => {
    setLevel(value)
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
                className="mt-5 cursor-pointe"
                size="large"
                placeholder="Select a level"
                optionFilterProp="children"
                onChange={onChange}
                options={items}
              />
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
