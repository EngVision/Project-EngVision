import { Button, Progress } from 'antd'
import { useEffect } from 'react'
import { LiveAudioVisualizer } from 'react-audio-visualize'
import { useAudioRecorder } from 'react-audio-voice-recorder'
import Micro from '../../Icons/Micro'
import Stop from '../../Icons/Stop'
const AudioRecorder = ({
  limitTime,
  onRecordingComplete,
}: {
  limitTime?: number
  onRecordingComplete: (url: string) => void
}) => {
  const {
    startRecording,
    stopRecording,
    // togglePauseResume,
    recordingBlob,
    isRecording,
    // isPaused,
    recordingTime,
    mediaRecorder,
  } = useAudioRecorder()
  if (limitTime && recordingTime >= limitTime) {
    stopRecording()
  }
  useEffect(() => {
    if (!recordingBlob) return
    onRecordingComplete(URL.createObjectURL(recordingBlob))
  }, [recordingBlob])
  return (
    <div className="flex flex-col justify-center items-center">
      {isRecording ? (
        <div className="flex flex-col justify-center items-center gap-4">
          <div onClick={stopRecording}>
            <Progress
              percent={limitTime ? (recordingTime / limitTime) * 100 : 0}
              type="circle"
              format={() => (
                <Stop
                  width={42}
                  height={42}
                  className="text-primary hover:text-secondary"
                />
              )}
              size={80}
              className="cursor-pointer"
            />
          </div>
          {limitTime && (
            <div className="text-sm text-center">{`${Math.floor(
              (limitTime - recordingTime) / 60,
            )
              .toString()
              .padStart(2, '0')}:${((limitTime - recordingTime) % 60)
              .toString()
              .padStart(2, '0')}`}</div>
          )}
        </div>
      ) : (
        <Button
          onClick={startRecording}
          className="rounded-full h-[5rem] w-[5rem] bg-primary text-white hover:text-white "
        >
          <Micro width={30} height={30}></Micro>
        </Button>
      )}
      {mediaRecorder && (
        <LiveAudioVisualizer
          mediaRecorder={mediaRecorder}
          width={200}
          height={75}
        />
      )}
    </div>
  )
}

export default AudioRecorder
