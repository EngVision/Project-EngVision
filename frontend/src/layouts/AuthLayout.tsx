import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../hooks/redux'
import { PRIVATE_ROUTES, STUDENT_ROUTES } from '../utils/constants'

const AuthLayout = () => {
  const user = useAppSelector((state) => state.app.user)
  const level = useAppSelector((state) => state.app.currentLevel)
  const isStudent = user?.role === 'Student'

  return !user ? (
    <div className="min-h-screen flex items-center justify-center bg-bgDefault p-16">
      <Outlet />
    </div>
  ) : (
    <Navigate
      to={isStudent && !level ? STUDENT_ROUTES.getStarted : PRIVATE_ROUTES.home}
    />
  )
}

export default AuthLayout
