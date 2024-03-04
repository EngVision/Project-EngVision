import { Button, Form, Input } from 'antd'
import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useMutation } from '@tanstack/react-query'
import { FacebookIcon, GoogleIcon } from '../../components/Icons'
import Logo from '../../components/Icons/Logo'
import { NotificationContext } from '../../contexts/notification'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { setCurrentLevel, setUser, setUserChat } from '../../redux/app/slice'
import authApi from '../../services/authApi'
import type { SignInParams } from '../../services/authApi/types'
import userLevelApi from '../../services/userLevelApi'
import { getNewWindowPosition } from '../../utils/common'
import { FACEBOOK_LOGIN, GOOGLE_LOGIN } from '../../utils/constants'
import chatApi from '../../services/chatApi'
import { useTranslation } from 'react-i18next'
const SignIn: React.FC = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'Auth' })
  const dispatch = useAppDispatch()
  const apiNotification = useContext(NotificationContext)
  const user = useAppSelector((state) => state.app.user)

  const { mutate, isPending, error, reset } = useMutation({
    mutationFn: authApi.signIn,
  })

  const onFinish = async (values: SignInParams) => {
    mutate(values, {
      onSuccess: () => {
        fetchAuthUser()
        // handleAuthChat()
        apiNotification.success({
          message: t('signInSuccess'),
        })
      },
    })
  }

  const fetchAuthUser = async () => {
    try {
      const data = await authApi.fetchAuthUser()

      if (data.role === 'Student') {
        const level = await userLevelApi.getUserLevel()
        dispatch(setCurrentLevel(level))
      }

      dispatch(setUser(data))
    } catch (error) {
      console.log('error: ', error)
    }
  }

  useEffect(() => {
    window.addEventListener('storage', fetchAuthUser)
    return () => window.removeEventListener('storage', fetchAuthUser)
  }, [])

  const signInWithGoogle = async () => {
    window.open(GOOGLE_LOGIN, '_blank', getNewWindowPosition(500, 600))
  }

  const signInWithFacebook = async () => {
    window.open(FACEBOOK_LOGIN, '_blank', getNewWindowPosition(500, 600))
  }

  const SIGN_IN_VENDORS = [
    {
      icon: <GoogleIcon />,
      name: 'Google',
      onClick: signInWithGoogle,
    },
    {
      icon: <FacebookIcon />,
      name: 'Facebook',
      onClick: signInWithFacebook,
    },
  ]

  return (
    <div className="flex flex-col items-center bg-surface p-8 rounded-[16px] self-center shadow-2xl">
      <div className="mb-8 flex flex-col items-center gap-4">
        <Logo width={250} />
        <p className="text-dark font-light">{t('letsStart')}</p>
      </div>

      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
        className="w-[36rem]"
        onChange={reset}
      >
        <Form.Item<SignInParams>
          name="email"
          label="Email"
          rules={[
            {
              message: t('Please input your email!'),
              required: true,
            },
            {
              message: t('Invalid email!'),
              type: 'email',
            },
          ]}
        >
          <Input
            placeholder="Email"
            size="middle"
            className="rounded-[8px] px-3 py-2"
          />
        </Form.Item>

        <Form.Item<SignInParams>
          name="password"
          label={t('Password')}
          rules={[
            { required: true, message: t('Please input your password!') },
          ]}
        >
          <Input.Password
            placeholder="Password"
            size="large"
            className="rounded-[8px] px-3 py-2"
          />
        </Form.Item>

        {error && (
          <p className="text-secondary">
            {t('Email or password is incorrect')}!
          </p>
        )}
        <div className="flex justify-end">
          <Link to="/forgot-password">{t('Forgot Password?')}</Link>
        </div>

        <Form.Item className="mt-4">
          <Button
            type="primary"
            size="large"
            shape="round"
            htmlType="submit"
            className="w-full h-11 rounded-xl mt-3"
            loading={isPending}
          >
            {t('Sign In')}
          </Button>
        </Form.Item>

        <div className="flex items-center justify-center gap-5 mb-6">
          {SIGN_IN_VENDORS.map((vendor) => (
            <div
              key={vendor.name}
              className="flex border-2 border-solid border-wolfGrey rounded-[10px] p-3 cursor-pointer"
              onClick={vendor.onClick}
              role="presentation"
            >
              {vendor.icon}
            </div>
          ))}
        </div>

        <p className="text-center text-wolfGrey ">
          {t("Didn't have an account?")}
          <Link to="/sign-up" className="font-semibold text-primary pl-2">
            {t('Sign Up')}
          </Link>
        </p>
      </Form>
    </div>
  )
}

export default SignIn
