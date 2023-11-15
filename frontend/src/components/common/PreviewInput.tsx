import { Input } from 'antd'
import React, { forwardRef } from 'react'

const PreviewInput = (props: any, ref: React.Ref<HTMLInputElement>) => {
  return (
    <Input
      ref={ref}
      {...props}
      type="text"
      onClick={(e) => {
        e.stopPropagation()
        if (props.onClick) props.onClick(e)
      }}
      className={`h-9 bg-transparent border-none !shadow-none block w-full !select-none pointer-events-none
                  ${props?.className || ''}`}
    />
  )
}

export default forwardRef<HTMLInputElement, any>(PreviewInput)
