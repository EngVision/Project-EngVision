import { useState } from 'react'
import { TwoColumnLayoutProps } from './types'
import { Button, Space } from 'antd'
import { UPLOAD_FILE_URL } from '../../../utils/constants'

export function TwoColumnLayout({
  children,
  contentQuestion,
}: TwoColumnLayoutProps) {
  const [fontSize, setFontSize] = useState<number>(16)
  const [isExpand, setIsExpand] = useState<boolean>(false)

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
        {contentQuestion.image && (
          <img
            src={`${UPLOAD_FILE_URL}${contentQuestion.image}`}
            alt=""
            className="w-full rounded-sm"
          />
        )}
        <p
          style={{
            fontSize: fontSize,
            transition: 'font-size 0.5s ease-in-out',
          }}
        >
          {contentQuestion.text}
        </p>
      </div>
      <div className="w-2/3 overflow-y-auto overflow-x-hidden flex-grow">
        <Button onClick={() => setIsExpand((prev) => !prev)}>
          {isExpand ? 'Hide' : 'Expand'} question
        </Button>
        <div>{children}</div>
      </div>
    </div>
  )
}
