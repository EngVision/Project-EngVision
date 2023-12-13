import { Button, Form, Input } from 'antd'
import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useMutation } from '@tanstack/react-query'
import { FacebookIcon, GoogleIcon } from '../../components/Icons'
import { NotificationContext } from '../../contexts/notification'
import { useAppDispatch } from '../../hooks/redux'
import { setCurrentLevel, setUser } from '../../redux/app/slice'
import authApi from '../../services/authApi'
import type { SignInParams } from '../../services/authApi/types'
import { FACEBOOK_LOGIN, GOOGLE_LOGIN } from '../../utils/constants'
import Logo from '../../components/Icons/Logo'
import userLevelApi from '../../services/userLevelApi'

const SignIn: React.FC = () => {
  const dispatch = useAppDispatch()
  const apiNotification = useContext(NotificationContext)

  const { mutate, isPending, error, reset } = useMutation({
    mutationFn: authApi.signIn,
  })

  const onFinish = async (values: SignInParams) => {
    mutate(values, {
      onSuccess: () => {
        fetchAuthUser()
        apiNotification.success({
          message: 'Sign in successfully!',
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
    window.open(GOOGLE_LOGIN, '_blank', 'width=500,height=600,left=400,top=200')
  }

  const signInWithFacebook = async () => {
    window.open(
      FACEBOOK_LOGIN,
      '_blank',
      'width=500,height=600,left=400,top=200',
    )
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

  const validatePassword = (password: string) => {
    if (!password) return true
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{8,}$/
    return password && password.length >= 8 && passwordRegex.test(password)
  }

  return (
    <div className="flex flex-col items-center bg-surface py-8 px-10 rounded-[16px] self-center shadow-2xl">
      <div className="mb-8 flex flex-col items-center gap-4">
        <Logo width={250} />
        <p className="text-dark font-light">Let's start learning right now!</p>
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
              message: 'Please input your email!',
              required: true,
            },
            {
              message: 'Invalid email!',
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
          label="Password"
          rules={[
            { message: 'Please input your password!', required: true },
            {
              async validator(_, value) {
                return new Promise((resolve, reject) => {
                  if (validatePassword(value)) {
                    resolve('')
                  } else
                    reject(
                      new Error(
                        'The password must be at least 8 characters long and contain at least 1 uppercase letter, 1 lowercase letter, and 1 number or special character',
                      ),
                    )
                })
              },
            },
          ]}
        >
          <Input.Password
            placeholder="Password"
            size="large"
            className="rounded-[8px] px-3 py-2"
          />
        </Form.Item>

        {error && (
          <p className="text-secondary">Email or password is incorrect!</p>
        )}
        <div className="flex justify-end">
          <Link to="/forgot-password">Forgot Password?</Link>
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
            Sign In
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
          Didn't have an account?
          <Link to="/sign-up" className="font-semibold text-primary pl-2">
            Sign Up
          </Link>
        </p>
      </Form>
    </div>
  )
}

export default SignIn
