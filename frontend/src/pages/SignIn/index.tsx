import { Button, Form, Input, Checkbox } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { FacebookIcon, GoogleIcon } from '../../components/Icons'
import { useAppDispatch } from '../../hooks/redux'
import { setUser } from '../../redux/app/slice'
import authApi from '../../services/authApi'
import type { SignInParams } from '../../services/authApi/types'
import { PUBLIC_ROUTES } from '../../utils/constants'

const SignIn: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [error, setError] = useState<string>('')

  const onFinish = async (values: SignInParams) => {
    try {
      const { data } = await authApi.signIn(values)
      dispatch(setUser(data))
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
    window.open(
      `${import.meta.env.VITE_BASE_URL}auth/google/login`,
      '_blank',
      'width=500,height=600,left=400,top=200',
    )
  }

  const signInWithFacebook = async () => {
    window.open(
      `${import.meta.env.VITE_BASE_URL}auth/facebook/login`,
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

  return (
    <div className="flex flex-col items-center bg-bgNeutral py-8 px-10 rounded-[16px] self-center">
      <div className="mb-8">
        <h4 className=" text-primary text-center font-bold text-3xl mb-4">
          Welcome back!
        </h4>
        <p className="text-dark font-light ">Let's start learning right now!</p>
      </div>
      <Form
        name="basic"
        className="w-[20rem]"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        onChange={() => setError('')}
      >
        <Form.Item<SignInParams>
          name="email"
          rules={[{ message: 'Please input your email!', required: true }]}
        >
          <Input placeholder="Email" className="rounded-[8px] p-3 text-xs" />
        </Form.Item>

        <Form.Item<SignInParams>
          name="password"
          rules={[{ message: 'Please input your password!', required: true }]}
        >
          <Input.Password
            placeholder="Password"
            className="rounded-[8px] p-3 text-xs"
          />
        </Form.Item>
        <div className="w-full flex justify-between mb-6">
          <Checkbox className="text-wolfGrey">Remember me</Checkbox>
          <div
            className="text-primary font-semibold text-right cursor-pointer "
            onClick={() => navigate(PUBLIC_ROUTES.sendMailResetPassword)}
            role="presentation"
          >
            Forgot password?
          </div>
        </div>

        {error && <p className="text-secondary">{error}</p>}
        <Form.Item>
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
        <div className="text-wolfGrey text-center mb-6">
          ------- or continue with -------
        </div>

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
