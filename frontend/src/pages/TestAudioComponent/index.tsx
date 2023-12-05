import { Button } from 'antd'
import { useState } from 'react'
import AudioRecorder from '../../components/Audio/AudioRecorder'
const TestAudioComponent = () => {
  const [url, setUrl] = useState<string>('')
  return (
    <div className="flex flex-col justify-center items-center">
      <h1>Test Audio Component</h1>
      {!url && (
        <AudioRecorder
          limitTime={10}
          onRecordingComplete={(url) => setUrl(url)}
        />
      )}
      {url && <audio src={url} controls />}
      {url && (
        <div>
          <span className="text-sm">Not perfect?</span>
          <Button onClick={() => setUrl('')} type="link">
            Retry
          </Button>
        </div>
      )}
    </div>
  )
}

export default TestAudioComponent
