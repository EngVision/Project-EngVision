import { Form, Select } from 'antd'
import { ExerciseCardType } from '../../../../../utils/constants'
import { useTranslation } from 'react-i18next'

type UnscrambleSettingsProps = {
  index: number
}

const UnscrambleSettings = ({ index }: UnscrambleSettingsProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'ManageExercise' })
  const options = [
    {
      value: ExerciseCardType.Text,
      label: <span>{t('Text')}</span>,
    },
    {
      value: ExerciseCardType.Image,
      label: <span>{t('Image')}</span>,
    },
  ]

  return (
    <div className="flex-1 flex flex-col gap-2">
      <h4 className="text-sm uppercase text-wolfGrey">{t('Settings')}</h4>

      <div className="flex justify-between items-center gap-4 border border-primary border-solid p-3 rounded-lg">
        <div>
          <h4>{t('Exercise type')}</h4>
          <p className="text-xs text-textSubtle">
            {t(
              'Choose between scramble image exercise or scramble text exercise',
            )}
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
