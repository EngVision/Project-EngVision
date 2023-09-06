import { Button, Form, Input } from 'antd'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import authApi from '../../api/authApi/authApi'
import type { SignInParams } from '../../api/authApi/types'
import appleIcon from '../../assets/images/apple.png'
import facebookIcon from '../../assets/images/facebook.png'
import googleIcon from '../../assets/images/google.png'
import AuthLayout from '../../layouts/AuthLayout'

const signInOptions = [
  {
    icon: facebookIcon,
    name: 'Facebook',
  },
  {
    icon: googleIcon,
    name: 'Google',
  },
  {
    icon: appleIcon,
    name: 'Apple',
  },
]

const SignIn: React.FC = () => {
  const [error, setError] = useState<string>('')
  const navigate = useNavigate()

  const onFinish = async (values: SignInParams) => {
    console.log('values:', values)
    try {
      await authApi.signUp(values)
      navigate('/')
    } catch (error) {
      console.log('error:', error.response.data)
      setError(error.response.data.message)
    }
  }

  return (
    <AuthLayout>
      <div className="bg-white p-[32px] rounded-[16px]">
        <div>
          <h4 className="text-center font-semibold text-[40px]">
            Welcome to EngVision!
          </h4>
          <p className="text-[16px] text-[#9D9DAD] my-[20px]">
            Start learning right now!
          </p>
        </div>

        <div>
          <Form
            name="basic"
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item<SignInParams> name="email">
              <Input
                placeholder="Email"
                size="middle"
                className="rounded-[8px] h-[48px]"
              />
            </Form.Item>

            <Form.Item<SignInParams> name="password">
              <Input.Password
                placeholder="Password"
                size="large"
                className="rounded-[8px] h-[48px]"
              />
            </Form.Item>

            {error && <p className="text-red-500">{error}</p>}

            <p className="text-[#CECED6] text-center my-[16px]">
              or continue with
            </p>

            <div className="flex items-center justify-center gap-[32px]">
              {signInOptions.map((option) => (
                <div
                  key={option.name}
                  className="border-[1px] border-solid border-[#CECED6] rounded-[12px] px-[28px] py-[24px] cursor-pointer"
                >
                  <img
                    src={option.icon}
                    alt={option.name}
                    className="w-[32px] h-[32px] object-contain"
                  />
                </div>
              ))}
            </div>

            <p className="text-[#0073EA] font-semibold text-right cursor-pointer my-[28px]">
              Forgot password?
            </p>

            <Form.Item className="text-center">
              <Button
                type="primary"
                shape="round"
                htmlType="submit"
                className="h-[40px] min-w-[200px] font-semibold bg-[#0073EA]"
              >
                Sign In
              </Button>
            </Form.Item>

            <p className="text-center text-[#9D9DAD]">
              Didn't have an account?
              <Link to="/sign-up" className="font-semibold text-[#0073EA] pl-2">
                Sign Up
              </Link>
            </p>
          </Form>
        </div>
      </div>
    </AuthLayout>
  )
}

export default SignIn
