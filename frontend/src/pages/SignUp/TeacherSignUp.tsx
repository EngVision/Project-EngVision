import { Button, Checkbox, Form, Input } from 'antd'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { FacebookIcon, GoogleIcon } from '../../components/Icons'
import { useAppDispatch } from '../../hooks/redux'
import { setUser } from '../../redux/app/slice'
import authApi from '../../services/authApi'
import type { SignUpParams } from '../../services/authApi/types'
import { PRIVATE_ROUTES, PUBLIC_ROUTES, ROLES } from '../../utils/constants'

const TeacherSignUp: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [error, setError] = useState<string>('')

  const onFinish = async (values: SignUpParams) => {
    try {
      const { data } = await authApi.signUp({
        ...values,
        role: ROLES.teacher.value,
      })
      dispatch(setUser(data))
      navigate(PRIVATE_ROUTES.home)
    } catch (error) {
      setError(error.response.data.message)
    }
  }

  const signInWithGoogle = async () => {
    console.log('sign in with google')
  }
  const signInWithFacebook = async () => {
    console.log('sign in with facebook')
  }

  const SIGN_UP_VENDORS = [
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
          name="certificate"
          rules={[
            { message: 'Please input your certificate!', required: true },
          ]}
        >
          <Input placeholder="Certificate" className="rounded-lg p-3 text-xs" />
        </Form.Item>

        <Form.Item<SignUpParams>
          name="school"
          rules={[
            { message: 'Please input your working school!', required: true },
          ]}
        >
          <Input
            placeholder="Working school"
            className="rounded-lg p-3 text-xs"
          />
        </Form.Item>

        {error && <p className="text-secondary">{error}</p>}

        <Form.Item<SignUpParams> name="accepted" valuePropName="checked">
          <Checkbox>
            I accept
            <Link
              to="/sign-up"
              className="font-semibold text-[#CECED6] hover:text-[#CECED6] pl-2"
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
            className="h-11 w-full font-semibold "
          >
            Sign Up
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
          Are you a student?
          <Link
            to={PUBLIC_ROUTES.signUp}
            className="font-semibold text-primary pl-2"
          >
            Student Sign Up
          </Link>
        </p>
      </Form>
    </div>
  )
}

export default TeacherSignUp
