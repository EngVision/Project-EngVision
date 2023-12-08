import { Button, Progress } from 'antd'
import { useEffect } from 'react'
import { LiveAudioVisualizer } from 'react-audio-visualize'
import { useAudioRecorder } from 'react-audio-voice-recorder'
import Micro from '../../Icons/Micro'
import Stop from '../../Icons/Stop'
import fileApi from '../../../services/fileApi'
import { useMutation } from '@tanstack/react-query'

type AudioRecorderProps = {
  limitTime?: number
  onRecordingComplete: (url: string) => void
}

const AudioRecorder = ({
  limitTime = 0,
  onRecordingComplete,
}: AudioRecorderProps) => {
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

  const { mutate } = useMutation({
    mutationFn: fileApi.create,
    onSuccess: (data) => {
      onRecordingComplete(data.data.fileId)
    },
  })

  if (limitTime && recordingTime >= limitTime) {
    stopRecording()
  }

  useEffect(() => {
    if (!recordingBlob) return
    mutate(recordingBlob)
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
        </div>
      ) : (
        <Button
          onClick={startRecording}
          className="rounded-full h-[5rem] w-[5rem] bg-primary text-white hover:text-white "
        >
          <Micro width={30} height={30}></Micro>
        </Button>
      )}

      <div className="text-sm text-center mt-5">
        You have
        <strong className="text-primary">{` ${Math.floor(
          (limitTime - recordingTime) / 60,
        )
          .toString()
          .padStart(2, '0')}:${((limitTime - recordingTime) % 60)
          .toString()
          .padStart(2, '0')}s `}</strong>
        left.
      </div>

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
