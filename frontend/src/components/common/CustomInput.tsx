import React, { forwardRef, useState } from 'react'

interface CustomInputProps {
  placeholder?: string
  defaultValue?: string
}

const CustomInput = (
  { placeholder, defaultValue }: CustomInputProps,
  ref: React.Ref<HTMLInputElement>,
) => {
  const [isFocused, setIsFocused] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleBlur = () => {
    setIsFocused(false)
  }

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <input
      ref={ref}
      type="text"
      placeholder={placeholder}
      defaultValue={defaultValue}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={(e) => e.stopPropagation()}
      className={` h-9 bg-transparent rounded-lg
      ${isHovered && !isFocused ? '!bg-bgNeutral' : ''} 
      ${isFocused ? '!border-grey-300' : ''}`}
    />
  )
}

export default forwardRef<HTMLInputElement, CustomInputProps>(CustomInput)
