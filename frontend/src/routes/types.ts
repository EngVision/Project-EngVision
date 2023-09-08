import type { LayoutProps } from '../layouts/types'

export interface RouteElement {
  element: React.FC
  path: string
  layout?: React.FC<LayoutProps>
}
