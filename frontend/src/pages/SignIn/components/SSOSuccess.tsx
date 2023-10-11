import React, { useEffect } from 'react'
import authApi from '../../../services/authApi'
import { setRole, setUserAccountId } from '../../../redux/app/slice'
import { useAppDispatch } from '../../../hooks/redux'

const SSOSuccess = () => {
  const dispatch = useAppDispatch()

  console.log('hihih')

  const fetchAuthUser = async () => {
    try {
      const { data } = await authApi.fetchAuthUser()

      dispatch(setUserAccountId(data.id))
      dispatch(setRole(data.role))

      localStorage.setItem('id', data.id)
      window.close()
    } catch (error) {
      console.log('error: ', error)
    }
  }

  useEffect(() => {
    // fetchAuthUser()
  }, [])

  return <div></div>
}

export default SSOSuccess
