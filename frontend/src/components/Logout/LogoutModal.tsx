import { Button, Modal } from 'antd'
import React from 'react'
import { WarningIcon } from '../Icons'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import {
  setCurrentLevel,
  setShowLogoutModal,
  setUser,
} from '../../redux/app/slice'
import { useMutation } from '@tanstack/react-query'
import authApi from '../../services/authApi'
import { useTranslation } from 'react-i18next'
const LogoutModal = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'common' })
  const dispatch = useAppDispatch()
  const showingLogoutModal = useAppSelector(
    (state) => state.app.showingLogoutModal,
  )

  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      dispatch(setUser(null))
      dispatch(setCurrentLevel(null))
      dispatch(setShowLogoutModal(false))
    },
  })

  const handleLogout = async () => {
    logoutMutation.mutate()
  }

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
            {t('Logout')}
          </Button>
        </>
      )}
    >
      {t('Are you sure you want to logout?')}
    </Modal>
  )
}

export default LogoutModal
