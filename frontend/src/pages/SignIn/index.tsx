import { Button, Form, Input } from 'antd'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import facebookIcon from '../../assets/images/facebook.png'
import googleIcon from '../../assets/images/google.png'
import { useAppDispatch } from '../../hooks/redux'
import { setUserAccountId } from '../../redux/app/slice'
import authApi from '../../services/authApi'
import type { SignInParams } from '../../services/authApi/types'
import { ROUTES } from '../../utils/constants'

const SignIn: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [error, setError] = useState<string>('')

  const onFinish = async (values: SignInParams) => {
    try {
      const {
        data: { id },
      } = await authApi.signIn(values)
      dispatch(setUserAccountId(id))
      localStorage.setItem('userAccountId', JSON.stringify(id))
      navigate(ROUTES.home)
    } catch (error) {
      setError(error.response.data.message)
    }
  }

  const fetchAuthUser = async (timer: ReturnType<typeof setInterval>) => {
    try {
      const { data } = await authApi.fetchAuthUser()

      localStorage.setItem('userAccountId', JSON.stringify(data.id))
      dispatch(setUserAccountId(data.id))
      navigate(ROUTES.home)
      clearInterval(timer)
    } catch (error) {
      console.log('error: ', error)
    }
  }

  const signInWithGoogle = async () => {
    let timer: ReturnType<typeof setInterval>

    const newWindow = window.open(
      `${import.meta.env.VITE_BASE_URL}/auth/google/login`,
      '_blank',
      'width=500,height=600',
    )

    if (newWindow) {
      timer = setInterval(() => {
        if (newWindow.closed) {
          fetchAuthUser(timer)
        }
      }, 1000)
    }
  }

  const signInWithFacebook = async () => {
    let timer: ReturnType<typeof setInterval>

    const newWindow = window.open(
      `${import.meta.env.VITE_BASE_URL}/auth/facebook/login`,
      '_blank',
      'width=500,height=600',
    )

    if (newWindow) {
      timer = setInterval(() => {
        if (newWindow.closed) {
          fetchAuthUser(timer)
        }
      }, 1000)
    }
  }

  const SIGN_IN_VENDORS = [
    {
      icon: googleIcon,
      name: 'Google',
      onClick: signInWithGoogle,
    },
    {
      icon: facebookIcon,
      name: 'Facebook',
      onClick: signInWithFacebook,
    },
  ]

  return (
    <div className="bg-white p-[40px] rounded-[16px]">
      <div>
        <h4 className="text-center font-semibold text-[40px] mb-[32px]">
          Welcome to EngVision!
        </h4>
        <p className=" text-textSubtle my-[20px]">Start learning right now!</p>
      </div>

      <div>
        <Form
          name="basic"
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          onChange={() => setError('')}
        >
          <Form.Item<SignInParams>
            name="email"
            rules={[{ message: 'Please input your email!', required: true }]}
          >
            <Input
              placeholder="Email"
              size="middle"
              className="rounded-[8px] h-[44px]"
            />
          </Form.Item>

          <Form.Item<SignInParams>
            name="password"
            rules={[{ message: 'Please input your password!', required: true }]}
          >
            <Input.Password
              placeholder="Password"
              size="large"
              className="rounded-[8px] h-[44px]"
            />
          </Form.Item>

          {error && <p className="text-red-500">{error}</p>}

          <p className="text-[#CECED6] text-center my-[18px]">
            or continue with
          </p>

          <div className="flex items-center justify-center gap-[32px]">
            {SIGN_IN_VENDORS.map((vendor) => (
              <div
                key={vendor.name}
                className="flex border-[1px] border-solid border-[#CECED6] rounded-[12px] px-[20px] py-[16px] cursor-pointer"
                onClick={vendor.onClick}
                role="presentation"
              >
                <img
                  src={vendor.icon}
                  alt={vendor.name}
                  className="w-[32px] h-[32px] object-contain"
                />
              </div>
            ))}
          </div>

          <p className="text-primary font-semibold text-right cursor-pointer my-[28px]">
            Forgot password?
          </p>

          <Form.Item className="text-center">
            <Button
              type="primary"
              shape="round"
              htmlType="submit"
              className="min-w-[200px] font-semibold h-[44px] "
            >
              Sign In
            </Button>
          </Form.Item>

          <p className="text-center text-textSubtle ">
            Didn't have an account?
            <Link to="/sign-up" className="font-semibold text-primary pl-2">
              Sign Up
            </Link>
          </p>
        </Form>
      </div>
    </div>
  )
}

export default SignIn
