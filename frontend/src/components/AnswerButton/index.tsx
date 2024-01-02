import React from 'react'

interface AnswerButtonProps {
  children: React.ReactNode
  className?: string
}

const AnswerButton = ({ children, className }: AnswerButtonProps) => {
  return (
    <div
      className={`flex justify-center items-center border border-solid border-primary px-4 py-3 rounded-md ${className}`}
    >
      {children}
    </div>
  )
}

export default AnswerButton
