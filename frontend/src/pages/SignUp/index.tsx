import { Button, Checkbox, Form, Input } from 'antd'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { FacebookIcon, GoogleIcon } from '../../components/Icons'
import { useAppDispatch } from '../../hooks/redux'
import { setUser } from '../../redux/app/slice'
import authApi from '../../services/authApi'
import type { SignUpParams } from '../../services/authApi/types'
import { PRIVATE_ROUTES, PUBLIC_ROUTES, ROLES } from '../../utils/constants'

const SignUp: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [error, setError] = useState<string>('')

  const onFinish = async (values: SignUpParams) => {
    try {
      const { data } = await authApi.signUp({
        ...values,
        role: ROLES.student.value,
      })
      dispatch(setUser(data))
      navigate(PRIVATE_ROUTES.home)
    } catch (error) {
      setError(error.response.data.message)
    }
  }

  const fetchAuthUser = async (timer: ReturnType<typeof setInterval>) => {
    try {
      const data = await authApi.fetchAuthUser()

      dispatch(setUser(data))
      navigate(PUBLIC_ROUTES.createProfile)
      clearInterval(timer)
    } catch (error) {
      console.log('error: ', error)
    }
  }

  const signUpWithGoogle = async () => {
    let timer: ReturnType<typeof setInterval>

    const newWindow = window.open(
      `${import.meta.env.VITE_BASE_URL}auth/google/login`,
      '_blank',
      'width=500,height=600,left=400,top=200',
    )

    if (newWindow) {
      timer = setInterval(() => {
        if (newWindow.closed) {
          fetchAuthUser(timer)
        }
      }, 1000)
    }
  }
  const signUpWithFacebook = async () => {
    let timer: ReturnType<typeof setInterval>

    const newWindow = window.open(
      `${import.meta.env.VITE_BASE_URL}auth/facebook/login`,
      '_blank',
      'width=500,height=600,left=400,top=200',
    )

    if (newWindow) {
      timer = setInterval(() => {
        if (newWindow.closed) {
          fetchAuthUser(timer)
        }
      }, 1000)
    }
  }

  const SIGN_UP_VENDORS = [
    {
      icon: <GoogleIcon />,
      name: 'Google',
      onClick: signUpWithGoogle,
    },
    {
      icon: <FacebookIcon />,
      name: 'Facebook',
      onClick: signUpWithFacebook,
    },
  ]

  return (
    <div className="flex flex-col bg-bgNeutral p-8 rounded-[16px] gap-6">
      <div className="flex flex-col items-center">
        <h4 className="text-center font-semibold text-2xl text-primary">
          Welcome to EngVision
        </h4>
        <p>Create an account and start learning!</p>
      </div>

      <Form
        name="basic"
        initialValues={{ accepted: false }}
        onFinish={onFinish}
        autoComplete="off"
        onChange={() => setError('')}
      >
        <div className="flex gap-4">
          <Form.Item<SignUpParams>
            name="firstName"
            rules={[
              { message: 'Please input your first name!', required: true },
            ]}
          >
            <Input
              placeholder="First Name"
              size="middle"
              className="rounded-lg p-3 text-xs"
            />
          </Form.Item>

          <Form.Item<SignUpParams>
            name="lastName"
            rules={[
              { message: 'Please input your last name!', required: true },
            ]}
          >
            <Input
              placeholder="Last Name"
              size="middle"
              className="rounded-lg p-3 text-xs"
            />
          </Form.Item>
        </div>

        <Form.Item<SignUpParams>
          name="email"
          rules={[{ message: 'Please input your email!', required: true }]}
        >
          <Input
            placeholder="Email"
            size="middle"
            className="rounded-lg p-3 text-xs"
          />
        </Form.Item>

        <Form.Item<SignUpParams>
          name="phoneNumber"
          rules={[
            { message: 'Please input your phone number!', required: true },
          ]}
        >
          <Input
            placeholder="Phone Number"
            className="rounded-lg p-3 text-xs"
          />
        </Form.Item>

        <Form.Item<SignUpParams>
          name="password"
          rules={[{ message: 'Please input your password!', required: true }]}
        >
          <Input.Password
            placeholder="Password"
            size="large"
            className="rounded-lg p-3 text-xs"
          />
        </Form.Item>

        <Form.Item<SignUpParams>
          name="confirmPassword"
          rules={[
            {
              message: 'Please input your confirm password!',
              required: true,
            },
          ]}
        >
          <Input.Password
            placeholder="Confirm password"
            size="large"
            className="rounded-lg p-3 text-xs"
          />
        </Form.Item>

        {error && <p className="text-secondary">{error}</p>}

        <Form.Item<SignUpParams> name="accepted" valuePropName="checked">
          <Checkbox>
            I accept
            <Link
              to="/sign-up"
              className="font-semibold text-[#CECED6] hover:text-wolfGrey pl-2"
            >
              Terms of Service
            </Link>
          </Checkbox>
        </Form.Item>

        <Form.Item className="text-center">
          <Button
            type="primary"
            shape="round"
            htmlType="submit"
            className="w-full h-11"
          >
            Create account
          </Button>
        </Form.Item>

        <p className="text-wolfGrey text-center mb-6">
          ----- or continue with -----
        </p>

        <div className="flex items-center justify-center gap-8 mb-6">
          {SIGN_UP_VENDORS.map((vendor) => (
            <div
              key={vendor.name}
              className="flex border-2 border-solid border-wolfGrey rounded-lg p-3 cursor-pointer"
              onClick={vendor.onClick}
              role="presentation"
            >
              {vendor.icon}
            </div>
          ))}
        </div>

        <p className="text-center text-textSubtle">
          Have an account?
          <Link
            to={PUBLIC_ROUTES.signIn}
            className="font-semibold text-primary pl-2"
          >
            Sign In
          </Link>
        </p>

        <p className="text-center text-textSubtle">
          Are you a teacher?
          <Link
            to={PUBLIC_ROUTES.signUpTeacher}
            className="font-semibold text-primary pl-2"
          >
            Teacher Sign Up
          </Link>
        </p>
      </Form>
    </div>
  )
}

export default SignUp
