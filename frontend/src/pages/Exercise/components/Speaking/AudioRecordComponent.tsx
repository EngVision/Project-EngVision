import { Button } from 'antd'
import { useState } from 'react'
import AudioRecorder from '../../../../components/Audio/AudioRecorder'

type AudioRecorderComponentProps = {
  setIsSubmittable: (value: boolean) => void
  countdown: number
}

const AudioRecorderComponent = ({
  setIsSubmittable,
  countdown = 10,
}: AudioRecorderComponentProps) => {
  const [url, setUrl] = useState<string>('')

  return (
    <div className="flex flex-col justify-center items-center">
      {!url && (
        <AudioRecorder
          limitTime={countdown}
          onRecordingComplete={(url) => {
            setUrl(url)
            setIsSubmittable(true)
          }}
        />
      )}
      {url && <audio src={url} controls />}
      {url && (
        <div>
          <span className="text-sm">Not perfect?</span>
          <Button
            onClick={() => {
              setUrl('')
              setIsSubmittable(false)
            }}
            type="link"
          >
            Retry
          </Button>
        </div>
      )}
    </div>
  )
}

export default AudioRecorderComponent
