import React from 'react'

interface AnswerButtonProps {
  children: React.ReactNode
  className?: string
}

const AnswerButton = ({ children, className }: AnswerButtonProps) => {
  return (
    <div
      className={`flex justify-center items-center border border-solid border-primary p-2 rounded-md ${className}`}
    >
      {children}
    </div>
  )
}

export default AnswerButton
