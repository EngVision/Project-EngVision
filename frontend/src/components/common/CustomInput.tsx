import React, { forwardRef } from 'react'

const CustomInput = (props: any, ref: React.Ref<HTMLInputElement>) => {
  return (
    <input
      ref={ref}
      {...props}
      type="text"
      onClick={(e) => {
        e.stopPropagation()
        if (props.onClick) props.onClick(e)
      }}
      className={`${props?.className || ''}
         h-9 px-3 bg-transparent rounded-lg border-none hover:!bg-bgNeutral focus:!border-grey-300 focus:!shadow-none`}
    />
  )
}

export default forwardRef<HTMLInputElement, any>(CustomInput)
