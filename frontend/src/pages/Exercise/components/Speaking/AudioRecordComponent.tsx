import { Button } from 'antd'
import AudioRecorder from '../../../../components/Audio/AudioRecorder'

type AudioRecorderComponentProps = {
  setIsSubmittable: (value: boolean) => void
  countdown: number
  fileId: string
  setFileId: (fileId: string) => void
}

const AudioRecorderComponent = ({
  setIsSubmittable,
  countdown = 10,
  fileId,
  setFileId,
}: AudioRecorderComponentProps) => {
  return (
    <div className="flex flex-col justify-center items-center">
      {!fileId && (
        <AudioRecorder
          limitTime={countdown}
          onRecordingComplete={(fileId) => {
            setFileId(fileId)
            setIsSubmittable(true)
          }}
        />
      )}
      {fileId && <audio src={fileId} controls />}
      {fileId && (
        <div>
          <span className="text-sm">Not perfect?</span>
          <Button
            onClick={() => {
              setFileId('')
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
