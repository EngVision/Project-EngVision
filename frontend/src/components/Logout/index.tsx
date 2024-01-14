import { useAppDispatch } from '../../hooks/redux'
import { setShowLogoutModal } from '../../redux/app/slice'
import { useTranslation } from 'react-i18next'
type LogoutProps = {
  className?: string
}

const Logout = ({ className }: LogoutProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'Header' })
  const dispatch = useAppDispatch()

  return (
    <div
      onClick={() => dispatch(setShowLogoutModal(true))}
      className={`w-full text-left border-none cursor-pointer ${className}`}
    >
      {t('Logout')}
    </div>
  )
}

export default Logout
