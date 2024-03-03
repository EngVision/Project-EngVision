import { ReactNode } from 'react'

export interface OneColumnLayoutProps {
  children: ReactNode
}
export interface TwoColumnLayoutProps extends OneColumnLayoutProps {
  contentQuestion: {
    text?: string
    image?: string
    audio?: string
  }
}
