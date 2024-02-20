import { useQuery } from '@tanstack/react-query'
import { Button, Slider } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { AudioVisualizer } from 'react-audio-visualize'
import ReactPlayer from 'react-player'
import Backward from '../../Icons/Backward'
import Forward from '../../Icons/Forward'
import Mute from '../../Icons/Mute'
import Pause from '../../Icons/Pause'
import Play from '../../Icons/Play'
import Volume from '../../Icons/Volume'
import AppLoading from '../../common/AppLoading'
import Duration from '../../common/Duration'

const AudioPlayer = ({ url }: { url: string }) => {
  const playerRef = useRef<ReactPlayer>(null)
  const [blob, setBlob] = useState<Blob | null>(null)
  const initialState = {
    url: url,
    pip: false,
    playing: false,
    controls: false,
    light: false,
    volume: 0.8,
    muted: false,
    loaded: 0,
    loadedSeconds: 0,
    played: 0,
    playedSeconds: 0,
    playbackRate: 1.0,
    loop: false,
    seeking: false,
  }
  const [state, setState] = useState(initialState)
  const handleSeekChange = (value: number) => {
    setState({ ...state, seeking: true, played: value })
  }
  const handleSeekAfterChange = (value: number) => {
    setState({ ...state, played: value, seeking: false })
    playerRef.current?.seekTo(value, 'fraction')
  }
  const handleProgress = (changeState: any) => {
    if (!state.seeking) {
      setState({ ...state, ...changeState })
    }
  }
  const handleVolumeChange = (value: number) => {
    setState({ ...state, volume: value })
  }
  function handleEnded(): void {
    setState({ ...state, playing: false })
  }
  const handleDuration = (loadedSeconds: number) => {
    setState({ ...state, loadedSeconds })
  }
  const skipBackward = () => {
    const value = state.loadedSeconds * state.played - 10
    setState({ ...state, played: value / state.loadedSeconds })
    playerRef.current?.seekTo(value)
  }
  const skipForward = () => {
    const value = state.loadedSeconds * state.played + 10
    setState({ ...state, played: value / state.loadedSeconds })
    playerRef.current?.seekTo(value)
  }
  const formatter = (value: number | undefined) => (
    <Duration seconds={value! * state.loadedSeconds} />
  )
  const handleMute = () => {
    setState({ ...state, muted: !state.muted })
  }
  const { data, isLoading } = useQuery({
    queryKey: ['audio', url],
    queryFn: () => fetch(url).then((res) => res.blob()),
  })

  useEffect(() => {
    if (data) {
      setBlob(data)
    }
  }, [data])

  if (isLoading || !url) return <AppLoading />

  return (
    <div className="bg-surface rounded-lg p-4 lg:w-1/2 md:w-2/3 w-4/5 h-full">
      <div className="hidden">
        <ReactPlayer
          ref={playerRef}
          width="100%"
          height="100%"
          url={state.url}
          pip={state.pip}
          playing={state.playing}
          controls={state.controls}
          light={state.light}
          loop={state.loop}
          playbackRate={state.playbackRate}
          volume={state.volume}
          muted={state.muted}
          progressInterval={100}
          onProgress={handleProgress}
          onDuration={handleDuration}
          onEnded={handleEnded}
          config={{ file: { forceAudio: true } }}
        />
      </div>

      <div className="flex justify-center items-center gap-4">
        <Duration className="text-sm w-10" seconds={state.playedSeconds} />

        <div className="w-full relative py-4">
          {blob && (
            <AudioVisualizer
              blob={blob}
              width={1000}
              height={100}
              barWidth={3}
              gap={2}
              currentTime={state.played * state.loadedSeconds}
              style={{
                width: '100%',
                position: 'absolute',
                top: '50%',
                left: 0,
                transform: 'translateY(-50%)',
                opacity: 0.5,
              }}
            />
          )}
          <Slider
            value={state.playedSeconds / state.loadedSeconds}
            onChange={handleSeekChange}
            onAfterChange={handleSeekAfterChange}
            tooltip={{ formatter }}
            min={0}
            max={1}
            step={0.00001}
          />
        </div>
        <Duration className="text-sm w-10" seconds={state.loadedSeconds} />
      </div>
      <div className="flex relative justify-center max-lg:flex-col">
        <div className="flex gap-4 self-center items-center">
          <Button
            type="text"
            onClick={skipBackward}
            icon={<Backward className="text-primary" />}
          ></Button>
          <Button
            type="primary"
            shape="circle"
            size="large"
            onClick={() => setState({ ...state, playing: !state.playing })}
            icon={state.playing ? <Pause /> : <Play />}
          ></Button>
          <Button
            type="text"
            onClick={skipForward}
            icon={<Forward className="text-primary" />}
          ></Button>
        </div>
        <div className="xl:absolute max-lg:self-center right-0 items-center flex gap-1">
          <Button
            type="text"
            className="cursor-pointer bg-transparent"
            onClick={handleMute}
            icon={
              state.muted ? (
                <Mute className="text-primary" />
              ) : (
                <Volume className="text-primary" />
              )
            }
          />
          <Slider
            min={0}
            max={1}
            step={0.01}
            value={state.volume}
            onChange={handleVolumeChange}
            tooltip={{
              formatter: (value) => `${(value! * 100).toFixed(0)}%`,
            }}
            className="w-20"
          />
        </div>
      </div>
    </div>
  )
}

export default AudioPlayer
