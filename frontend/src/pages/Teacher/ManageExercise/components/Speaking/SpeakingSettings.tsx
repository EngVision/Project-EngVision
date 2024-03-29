import { Form, InputNumber } from 'antd'
import { useTranslation } from 'react-i18next'

type SpeakingSettingsProps = {
  index: number
}

const SpeakingSettings = ({ index }: SpeakingSettingsProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'ManageExercise' })

  return (
    <div className="flex-1 flex flex-col gap-2">
      <h4 className="text-sm uppercase text-wolfGrey">{t('Settings')}</h4>

      <div className="flex justify-between items-center gap-4 border border-primary border-solid p-3 rounded-lg">
        <div>
          <h4>{t('Countdown')}</h4>
          <p className="text-xs text-textSubtle">
            {t(
              'Set the test countdown time in seconds. Minimum time is 15 seconds, and maximum is 600 seconds (10 minutes).',
            )}
          </p>
        </div>

        <Form.Item name={[index, 'countdown']} className="m-0">
          <InputNumber placeholder="0" size="middle" className="w-[80px]" />
        </Form.Item>
      </div>
    </div>
  )
}

export default SpeakingSettings
