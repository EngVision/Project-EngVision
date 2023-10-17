import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../hooks/redux'
import { PRIVATE_ROUTES } from '../utils/constants'

const AuthLayout = () => {
  const user = useAppSelector((state) => state.app.user)

  return !user ? (
    <div className="w-screen min-h-screen flex items-center justify-center bg-bgDefault p-16">
      <Outlet />
    </div>
  ) : (
    <Navigate to={PRIVATE_ROUTES.home} />
  )
}

export default AuthLayout
