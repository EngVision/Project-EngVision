import { useRoutes } from 'react-router-dom'
import PrivateRoutes from './PrivateRoutes'
import PublicRoutes from './PublicRoutes'

const AppRoutes = () => {
  const element = useRoutes([...PublicRoutes, ...PrivateRoutes()])

  return element
}

export default AppRoutes
