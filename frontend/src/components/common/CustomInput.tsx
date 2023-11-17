import React, { MouseEvent, MouseEventHandler, useEffect, useRef } from 'react'

interface CustomInputProps {
  autoFocus?: boolean
  className?: string
  onClick?: (e: MouseEvent) => MouseEventHandler<HTMLInputElement> | undefined
  placeholder?: string
}

const CustomInput = ({
  autoFocus,
  onClick,
  className,
  placeholder,
  ...props
}: CustomInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFocus = () => {
    inputRef.current?.select()
  }

  useEffect(() => {
    if (autoFocus) {
      handleFocus()
    }
  }, [autoFocus])

  return (
    <input
      ref={inputRef}
      {...props}
      type="text"
      onClick={(e) => {
        e.stopPropagation()
        if (onClick) onClick(e)
      }}
      onFocus={handleFocus}
      className={`${className || ''}
         h-9 w-2/3 text-textColor max-w-full px-3 bg-transparent rounded-lg border-none hover:!bg-bgNeutral focus:border focus:border-solid focus:!border-grey-300 focus:!shadow-none`}
      placeholder={placeholder}
    />
  )
}

export default CustomInput
