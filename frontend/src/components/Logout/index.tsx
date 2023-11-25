import { useAppDispatch } from '../../hooks/redux'
import { setShowLogoutModal } from '../../redux/app/slice'

type LogoutProps = {
  className?: string
}

const Logout = ({ className }: LogoutProps) => {
  const dispatch = useAppDispatch()

  return (
    <div
      onClick={() => dispatch(setShowLogoutModal(true))}
      className={`w-full text-left border-none cursor-pointer ${className}`}
    >
      Logout
    </div>
  )
}

export default Logout
