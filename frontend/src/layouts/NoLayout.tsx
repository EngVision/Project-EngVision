import React, { Fragment } from 'react'

import type { LayoutProps } from './types'

const NoLayout: React.FC<LayoutProps> = ({ children }) => {
  return <Fragment>{children}</Fragment>
}

export default NoLayout
