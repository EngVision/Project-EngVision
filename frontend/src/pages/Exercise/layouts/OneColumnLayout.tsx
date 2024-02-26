import { OneColumnLayoutProps } from './types'

export function OneColumnLayout({ children }: OneColumnLayoutProps) {
  return (
    <div id="one-column-layout" className="flex-1 mx-5 mb-10 overflow-y-auto">
      {children}
    </div>
  )
}
