import { Button, Divider, Space, Tooltip } from 'antd'
import { useState } from 'react'
import AudioPlayer from '../../../components/Audio/AudioPlayer'
import ArrowLeft from '../../../components/Icons/ArrowLeft'
import ArrowRight from '../../../components/Icons/ArrowRight'
import { getFileUrl } from '../../../utils/common'
import { TwoColumnLayoutProps } from './types'

export function TwoColumnLayout({
  children,
  contentQuestion,
}: TwoColumnLayoutProps) {
  const [fontSize, setFontSize] = useState<number>(16)
  const [isExpand, setIsExpand] = useState<boolean>(true)

  return (
    <div className="flex flex-1 min-h-[0px] m-5 gap-5">
      <div
        className={`pr-2 overflow-y-auto justify-self-end transition-all ${
          isExpand ? 'w-1/3' : 'w-0 !p-0'
        }`}
      >
        <Space className="flex justify-center mb-5">
          <button
            type="button"
            className={`w-[20px] h-[20px] rounded-[10px] text-xs text-[color:var(--text-color)] cursor-pointer ${
              fontSize === 12 ? 'bg-slate-300 !text-black' : 'bg-transparent'
            }`}
            onClick={() => setFontSize(12)}
          >
            A
          </button>
          <button
            type="button"
            className={`w-[26px] h-[26px] rounded-[13px] text-base text-[color:var(--text-color)] cursor-pointer ${
              fontSize === 16 ? 'bg-slate-300 !text-black' : 'bg-transparent'
            }`}
            onClick={() => setFontSize(16)}
          >
            A
          </button>
          <button
            type="button"
            className={`w-[32px] h-[32px] rounded-[16px] text-xl text-[color:var(--text-color)] cursor-pointer ${
              fontSize === 20 ? 'bg-slate-300 !text-black' : 'bg-transparent'
            }`}
            onClick={() => setFontSize(20)}
          >
            A
          </button>
        </Space>
        <div className="flex flex-col items-center justify-center gap-6">
          {contentQuestion.image && (
            <img
              className="min-h-[200px] max-h-[400px]"
              src={getFileUrl(contentQuestion.image)}
            />
          )}
          {contentQuestion.audio && (
            <AudioPlayer
              url={getFileUrl(contentQuestion.audio)}
              columnButton={true}
            />
          )}
        </div>
        <div
          style={{
            fontSize: fontSize,
            transition: 'font-size 0.5s ease-in-out',
          }}
          dangerouslySetInnerHTML={{ __html: contentQuestion.text || '' }}
        ></div>
      </div>
      <div className="relative">
        <Divider type="vertical" className="h-full" />
        <Tooltip title={isExpand ? 'Hide Question' : 'Expand Question'}>
          <Button
            className="absolute top-1/2 -left-1/2 border-solid border-1 border-primary flex justify-center items-center scale-75 hover:scale-100"
            onClick={() => setIsExpand((prev) => !prev)}
            shape="circle"
            icon={
              isExpand ? (
                <ArrowLeft width={18} className="text-primary" />
              ) : (
                <ArrowRight width={18} className="text-primary" />
              )
            }
          ></Button>
        </Tooltip>
      </div>
      <div className="w-2/3 overflow-y-auto overflow-x-hidden flex-grow">
        <div>{children}</div>
      </div>
    </div>
  )
}
