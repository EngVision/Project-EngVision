import { useQuery } from '@tanstack/react-query'
import { Slider } from 'antd'
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
  const playerRef = useRef(null)
  const [blob, setBlob] = useState<Blob | null>(null)
  const initialState = {
    url: url,
    pip: false,
    playing: false,
    controls: false,
    light: false,
    volume: 0.8,
    muted: false,
    played: 0,
    loaded: 0,
    loadedSeconds: 0,
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
    playerRef.current?.seekTo(value)
  }
  const handleProgress = (changeState: any) => {
    // We only want to update time slider if we are not currently seeking
    if (!state.seeking) {
      setState({ ...state, ...changeState })
    }
  }
  const handleVolumeChange = (value: number) => {
    setState({ ...state, volume: value })
  }
  const handleDuration = (loadedSeconds: number) => {
    setState({ ...state, loadedSeconds })
  }
  const skipBackward = () => {
    const value = state.loadedSeconds * state.played - 10
    playerRef.current?.seekTo(value)
  }
  const skipForward = () => {
    const value = state.loadedSeconds * state.played + 10
    playerRef.current?.seekTo(value)
  }
  const formatter = (value: number) => (
    <Duration seconds={value * state.loadedSeconds} />
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

  console.log('🚀 ~ file: index.tsx:162 ~ AudioPlayer ~ blob', state)
  if (isLoading || !url) return <AppLoading />
  return (
    <div className="bg-surface rounded-lg p-4 w-1/2 h-full">
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
          onProgress={handleProgress}
          onDuration={handleDuration}
          config={{ file: { forceAudio: true } }}
        />
      </div>

      <div className="flex justify-center items-center gap-4">
        <Duration
          className="text-sm w-10"
          seconds={state.played * state.loadedSeconds}
        />

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
            value={state.played}
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
        <div className="flex gap-4 self-center">
          <button
            onClick={skipBackward}
            className="cursor-pointer bg-transparent"
          >
            <Backward className="text-primary" />
          </button>
          <button
            className="p-2 cursor-pointer bg-primary rounded-full flex items-center justify-center"
            onClick={() => setState({ ...state, playing: !state.playing })}
          >
            {state.playing ? (
              <Pause className="text-white" width={24} height={24} />
            ) : (
              <Play className="text-white" width={24} height={24} />
            )}
          </button>

          <button
            onClick={skipForward}
            className="cursor-pointer bg-transparent"
          >
            <Forward className="text-primary" />
          </button>
        </div>
        <div className="xl:absolute max-lg:self-center right-0 items-center flex gap-1">
          <button
            className="cursor-pointer bg-transparent"
            onClick={handleMute}
          >
            {state.muted ? (
              <Mute className="text-primary" />
            ) : (
              <Volume className="text-primary" />
            )}
          </button>
          <Slider
            min={0}
            max={1}
            step={0.01}
            value={state.volume}
            onChange={handleVolumeChange}
            tooltip={{
              formatter: (value: number) => `${(value * 100).toFixed(0)}%`,
            }}
            className="w-20"
          />
        </div>
      </div>
    </div>
  )
}

export default AudioPlayer
