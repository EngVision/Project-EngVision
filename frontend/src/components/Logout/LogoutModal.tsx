import { Button, Modal } from 'antd'
import React, { useEffect } from 'react'
import { WarningIcon } from '../Icons'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { setShowLogoutModal, setUser } from '../../redux/app/slice'
import { useMutation } from '@tanstack/react-query'
import authApi from '../../services/authApi'

const LogoutModal = () => {
  const dispatch = useAppDispatch()
  const showingLogoutModal = useAppSelector(
    (state) => state.app.showingLogoutModal,
  )

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
    dispatch(setShowLogoutModal(false))
  }, [])

  return (
    <Modal
      title={
        <div className="flex gap-3 items-center mb-4">
          <WarningIcon />
          <h3 className="text-2xl font-semibold">Logout</h3>
        </div>
      }
      open={showingLogoutModal}
      onCancel={(e) => {
        e.stopPropagation()
        dispatch(setShowLogoutModal(false))
      }}
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
  )
}

export default LogoutModal
