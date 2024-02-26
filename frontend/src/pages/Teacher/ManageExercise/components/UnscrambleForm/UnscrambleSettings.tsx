import { Form, Select } from 'antd'
import { ExerciseCardType } from '../../../../../utils/constants'

type UnscrambleSettingsProps = {
  index: number
}

const UnscrambleSettings = ({ index }: UnscrambleSettingsProps) => {
  const options = [
    {
      value: ExerciseCardType.Text,
      label: <span>Text</span>,
    },
    {
      value: ExerciseCardType.Image,
      label: <span>Image</span>,
    },
  ]

  return (
    <div className="flex-1 flex flex-col gap-2">
      <h4 className="text-sm uppercase text-wolfGrey">Settings</h4>

      <div className="flex justify-between items-center gap-4 border border-primary border-solid p-3 rounded-lg">
        <div>
          <h4>Exercise type</h4>
          <p className="text-xs text-textSubtle">
            Choose between scramble image exercise or scramble text exercise
          </p>
        </div>

        <Form.Item name={[index, 'exerciseType']}>
          <Select
            style={{ width: 100 }}
            defaultValue={ExerciseCardType.Text}
            options={options}
          />
        </Form.Item>
      </div>
    </div>
  )
}

export default UnscrambleSettings
