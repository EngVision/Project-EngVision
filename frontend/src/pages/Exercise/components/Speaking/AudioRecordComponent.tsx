import { Button } from 'antd'
import AudioRecorder from '../../../../components/Audio/AudioRecorder'
import { getFileUrl } from '../../../../utils/common'
import AudioPlayer from '../../../../components/Audio/AudioPlayer'

type AudioRecorderComponentProps = {
  setIsSubmittable: (value: boolean) => void
  countdown: number
  fileId: string
  setFileId: (fileId: string) => void
  isDisabled: boolean
}

const AudioRecorderComponent = ({
  setIsSubmittable,
  countdown = 10,
  fileId,
  setFileId,
  isDisabled,
}: AudioRecorderComponentProps) => {
  return (
    <div
      className={`flex flex-col justify-center items-center ${
        isDisabled && 'opacity-40 pointer-events-none'
      }`}
    >
      {!fileId && (
        <AudioRecorder
          limitTime={countdown}
          onRecordingComplete={(fileId) => {
            setFileId(fileId)
            setIsSubmittable(true)
          }}
        />
      )}
      {fileId && <AudioPlayer url={getFileUrl(fileId)} />}
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
