import { Button, Modal } from 'antd'
import { useAppDispatch } from '../../hooks/redux'
import { setUser } from '../../redux/app/slice'
import authApi from '../../services/authApi'
import { WarningIcon } from '../Icons'
import { useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'

type LogoutProps = {
  open?: boolean
  className?: string
}

const Logout = ({ open = false, className }: LogoutProps) => {
  const dispatch = useAppDispatch()
  const [isOpen, setIsOpen] = useState(false)

  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      dispatch(setUser(null))
    },
  })

  const handleLogout = async () => {
    logoutMutation.mutate()
  }

  useEffect(() => {
    setIsOpen(open)
  }, [open])

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className={`w-full text-left border-none cursor-pointer ${className}`}
      >
        Logout
      </div>

      <Modal
        title={
          <div className="flex gap-3 items-center mb-4">
            <WarningIcon />
            <h3 className="text-2xl font-semibold">Logout</h3>
          </div>
        }
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        footer={(_, { CancelBtn }) => (
          <>
            <CancelBtn />
            <Button danger type="primary" onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}
      >
        Are you sure you want to logout?
      </Modal>
    </>
  )
}

export default Logout
