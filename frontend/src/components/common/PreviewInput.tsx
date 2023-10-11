import React, { forwardRef } from 'react'

const PreviewInput = (props: any, ref: React.Ref<HTMLInputElement>) => {
  return (
    <input
      ref={ref}
      {...props}
      value={props.value || ''}
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
