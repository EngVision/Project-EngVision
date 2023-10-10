import type { LayoutProps } from '../layouts/types'

export interface RouteElement {
  element: React.FC<any>
  path: string
  layout?: React.FC<LayoutProps> | null
}
