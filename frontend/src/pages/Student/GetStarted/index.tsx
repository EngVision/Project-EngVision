import { Button, Select } from 'antd'
import { CEFRLevel, STUDENT_ROUTES } from '../../../utils/constants'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const GetStarted = () => {
  const navigate = useNavigate()
  const [userLevel, setUserLevel] = useState<CEFRLevel>()

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

  const yesTest = () => {
    navigate(STUDENT_ROUTES.getStarted + '/' + userLevel)
  }

  const noTest = () => {
    navigate(STUDENT_ROUTES.discover)
  }

  const optionTest = () => {
    return (
      <div className="flex flex-col my-5">
        <h1>Do you want to take a retest of your level?</h1>
        <div className="flex flex-row gap-5 my-4">
          <Button className="w-30" type="primary" onClick={yesTest}>
            Yes
          </Button>
          <Button className="w-30" type="default" onClick={noTest}>
            No
          </Button>
        </div>
      </div>
    )
  }

  const onChange = (value: string) => {
    console.log(`selected ${value}`)
    setUserLevel(value as CEFRLevel)
  }

  const onSearch = (value: string) => {
    console.log('search:', value)
  }

  // Filter `option.label` match the user type `input`
  const filterOption = (
    input: string,
    option?: { label: string; value: string },
  ) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
  return (
    <div className="flex flex-col justify-center content-center ">
      <h1>Please select your current level</h1>
      <span>
        Choose your current level from the list below. If you are not sure, you
        can take a test to find out.
      </span>
      <Select
        className="mt-5"
        style={{ width: 120 }}
        showSearch
        placeholder="Select a level"
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        filterOption={filterOption}
        options={items}
      />
      {userLevel && optionTest()}
    </div>
  )
}

export default GetStarted
