import { Button, Form, Input } from 'antd'
import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'

import { FacebookIcon, GoogleIcon } from '../../components/Icons'
import { useAppDispatch } from '../../hooks/redux'
import { setUser } from '../../redux/app/slice'
import authApi from '../../services/authApi'
import type { SignInParams } from '../../services/authApi/types'
import { FACEBOOK_LOGIN, GOOGLE_LOGIN } from '../../utils/constants'
import { NotificationContext } from '../../contexts/notification'

const SignIn: React.FC = () => {
  const dispatch = useAppDispatch()
  const apiNotification = useContext(NotificationContext)

  const [error, setError] = useState<string>('')

  const onFinish = async (values: SignInParams) => {
    try {
      const { data } = await authApi.signIn(values)
      dispatch(setUser(data))
      apiNotification.success({
        message: 'Sign in successfully!',
      })
    } catch (error) {
      setError(error.response.data.message)
    }
  }

  const fetchAuthUser = async () => {
    try {
      const data = await authApi.fetchAuthUser()

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

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    return emailRegex.test(email)
  }

  const validatePassword = (password: string) => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    return password && password.length >= 8 && passwordRegex.test(password)
  }

  return (
    <div className="flex flex-col items-center bg-bgNeutral py-8 px-10 rounded-[16px] self-center">
      <div className="mb-8">
        <h4 className=" text-primary text-center font-bold text-4xl mb-4">
          Welcome back!
        </h4>
        <p className="text-dark font-light ">Let's start learning right now!</p>
      </div>

      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        onChange={() => setError('')}
        layout="vertical"
        className="w-[560px]"
      >
        <Form.Item<SignInParams>
          name="email"
          label="Email"
          rules={[
            { message: 'Please input your email!', required: true },
            {
              async validator(_, value) {
                return new Promise((resolve, reject) => {
                  if (validateEmail(value)) {
                    resolve('')
                  } else reject(new Error('Invalid email'))
                })
              },
            },
          ]}
        >
          <Input
            placeholder="Email"
            size="middle"
            className="rounded-[8px] p-3 text-xs"
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
            className="rounded-[8px] p-3 text-xs"
          />
        </Form.Item>

        {error && <p className="text-secondary">{error}</p>}

        <Form.Item className="mt-4">
          <Button
            type="primary"
            size="large"
            shape="round"
            htmlType="submit"
            className="w-full h-11 rounded-xl"
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
