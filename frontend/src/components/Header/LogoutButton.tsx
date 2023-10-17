import { Button } from 'antd'
import React from 'react'

import { useAppDispatch } from '../../hooks/redux'
import {
  setRole,
  setUserAccountId,
  setUserAvatar,
  setUserName,
} from '../../redux/app/slice'
import authApi from '../../services/authApi'

const LogoutButton = () => {
  const dispatch = useAppDispatch()

  const handleLogout = async () => {
    try {
      await authApi.logout()
      window.location.reload()
      dispatch(setUserAccountId(''))
      dispatch(setUserName(''))
      dispatch(setUserAvatar(''))
      dispatch(setRole(''))
    } catch (error) {
      console.log('Error: ', error)
    }
  }

  return (
    <Button size="middle" onClick={handleLogout}>
      Logout
    </Button>
  )
}

export default LogoutButton
