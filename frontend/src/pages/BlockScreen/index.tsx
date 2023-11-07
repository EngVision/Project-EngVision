import React from 'react'
import { BlockImage } from '../../components/Icons'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { store } from '../../store'
import authApi from '../../services/authApi'
import { setUser } from '../../redux/app/slice'

const BlockScreen = ({ isBlocked }: { isBlocked: boolean }) => {
  const navigate = useNavigate()

  return (
    <div className="w-full flex flex-col-reverse lg:!flex-row h-screen justify-center items-center gap-[10%] bg-bgDefault p-6">
      <div className="flex flex-col w-[600px]">
        <p className="font-bold text-[32px] mb-4 text-dark">
          {isBlocked
            ? 'Your account has been blocked'
            : 'Your account hasn’t been approved'}
        </p>
        <p className="font-semibold text-2xl mb-4 text-dark">
          {isBlocked
            ? 'We have blocked your account'
            : 'We haven’t approved your request yet'}
        </p>
        <p className="text-textSubtle mb-5 text-sm">
          {isBlocked
            ? 'Please create a new account and do not violate the policy'
            : 'Please wait for the next 3 days'}
        </p>
        <div className="text-center">
          <Button
            type="primary"
            size="large"
            onClick={async () => {
              store.dispatch(setUser(null))
              await authApi.logout()
              navigate('')
            }}
          >
            Acknowledge
          </Button>
        </div>
      </div>
      <BlockImage width={250} height={300} />
    </div>
  )
}

export default BlockScreen
