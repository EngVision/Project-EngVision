import { Button } from 'antd'
import { useState } from 'react'
import AudioPlayer from '../../components/Audio/AudioPlayer'
import AudioRecorder from '../../components/Audio/AudioRecorder'
import QuickStart from '../../components/QuickStart'
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
      {url && <AudioPlayer url={url} />}
      {url && (
        <div>
          <span className="text-sm">Not perfect?</span>
          <Button onClick={() => setUrl('')} type="link">
            Retry
          </Button>
        </div>
      )}

      <AudioPlayer url="https://ia600707.us.archive.org/8/items/alice_in_wonderland_librivox/wonderland_ch_01.mp3" />
      <QuickStart />
    </div>
  )
}

export default TestAudioComponent
