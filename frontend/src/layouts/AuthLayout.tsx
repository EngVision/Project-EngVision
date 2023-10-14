import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../hooks/redux'
import { PRIVATE_ROUTES } from '../utils/constants'

const AuthLayout = () => {
  const user = useAppSelector((state) => state.app.user)

  return !user ? (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center bg-bgDefault">
      <Outlet />
    </div>
  ) : (
    <Navigate to={PRIVATE_ROUTES.home} />
  )
}

export default AuthLayout
