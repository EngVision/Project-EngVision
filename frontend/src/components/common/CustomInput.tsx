import React, { useRef } from 'react'

const CustomInput = (props: any) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFocus = () => {
    inputRef.current?.select()
  }

  return (
    <input
      ref={inputRef}
      {...props}
      type="text"
      onClick={(e) => {
        e.stopPropagation()
        if (props.onClick) props.onClick(e)
      }}
      onFocus={handleFocus}
      className={`${props?.className || ''}
         h-9 w-2/3 max-w-full px-3 bg-transparent rounded-lg border-none hover:!bg-grey-200 focus:border focus:border-solid focus:!border-grey-300 focus:!shadow-none`}
    />
  )
}

export default CustomInput
