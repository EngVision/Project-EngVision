import React from 'react'

import type { LayoutProps } from './types'

const DefaultLayout: React.FC<LayoutProps> = ({ children }) => {
  return <div>{children}</div>
}

export default DefaultLayout
