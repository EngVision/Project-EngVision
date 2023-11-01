import { OneColumnLayoutProps } from './types'

export function OneColumnLayout({ children }: OneColumnLayoutProps) {
  return <div className="flex-1 mx-5 my-10 overflow-y-auto">{children}</div>
}
