import { Button, Form, Checkbox, Input, Select } from 'antd'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { FacebookIcon, GoogleIcon } from '../../components/Icons'
import { useAppDispatch } from '../../hooks/redux'
import { setUser } from '../../redux/app/slice'
import authApi from '../../services/authApi'
import type { SignUpParams } from '../../services/authApi/types'
import {
  ROLES,
  PRIVATE_ROUTES,
  PUBLIC_ROUTES,
  Gender,
  FACEBOOK_LOGIN,
  GOOGLE_LOGIN,
} from '../../utils/constants'
import enumToSelectOptions from '../../utils/enumsToSelectOptions'
import { NotificationContext } from '../../contexts/notification'

const TeacherSignUp: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const apiNotification = useContext(NotificationContext)

  const [error, setError] = useState<string>('')

  const onFinish = async (values: SignUpParams) => {
    if (!values.accepted) {
      setError('Please accept the terms of service!')
      return
    }
    try {
      const { data } = await authApi.signUp({
        ...values,
        role: ROLES.teacher.value,
      })
      dispatch(setUser(data))
      apiNotification.success({
        message: 'Sign up successfully!',
      })
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
      GOOGLE_LOGIN,
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
      FACEBOOK_LOGIN,
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
        <h4 className="text-center font-semibold text-4xl mb-4 text-primary">
          Welcome to EngVision
        </h4>
        <p>Create an account and start learning!</p>
      </div>

      <Form
        name="teacher-sign-up-form"
        initialValues={{ accepted: false }}
        onFinish={onFinish}
        autoComplete="off"
        onChange={() => setError('')}
        className="w-[560px] flex flex-col"
        layout="vertical"
      >
        <div className="flex gap-4">
          <Form.Item<SignUpParams>
            name="firstName"
            label="First Name"
            rules={[
              { message: 'Please input your first name!', required: true },
            ]}
            className="flex-1"
          >
            <Input
              placeholder="First Name"
              size="middle"
              className="rounded-lg p-3 text-xs"
            />
          </Form.Item>

          <Form.Item<SignUpParams>
            name="lastName"
            label="Last Name"
            rules={[
              { message: 'Please input your last name!', required: true },
            ]}
            className="flex-1"
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
          label="Email"
          rules={[{ message: 'Please input your email!', required: true }]}
        >
          <Input
            placeholder="Email"
            size="middle"
            className="rounded-lg p-3 text-xs"
          />
        </Form.Item>

        <Form.Item<SignUpParams>
          name="gender"
          label="Gender"
          rules={[{ message: 'Please input your gender!', required: true }]}
          className="[&>*]:!text-sm"
        >
          <Select
            options={enumToSelectOptions(Gender)}
            className="h-[40px] !text-[14px]"
            placeholder="Gender"
            size="large"
          />
        </Form.Item>

        <Form.Item<SignUpParams>
          name="password"
          label="Password"
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
          label="Confirm Password"
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
          label="Phone Number"
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
          label="Certificate"
          rules={[
            { message: 'Please input your certificate!', required: true },
          ]}
        >
          <Input placeholder="Certificate" className="rounded-lg p-3 text-xs" />
        </Form.Item>

        <Form.Item<SignUpParams>
          name="school"
          label="School"
          rules={[
            { message: 'Please input your working school!', required: true },
          ]}
        >
          <Input
            placeholder="Working school"
            className="rounded-lg p-3 text-xs"
          />
        </Form.Item>

        <Form.Item<SignUpParams> name="accepted" valuePropName="checked">
          <Checkbox>
            I accept
            <Link
              to="/sign-up"
              className="font-semibold text-primary hover:text-secondary pl-2"
            >
              Terms of Service
            </Link>
          </Checkbox>
        </Form.Item>
        <Form.Item className="text-center" noStyle>
          <Button
            type="primary"
            shape="round"
            htmlType="submit"
            className="h-11 w-full font-semibold "
          >
            Sign Up
          </Button>
        </Form.Item>

        {error && <p className="text-red-500 mt-[-20px] mb-6">{error}</p>}

        <div className="text-grey-300 text-center my-4 px-16 flex items-center gap-4 justify-center">
          <div className="h-[1px] bg-grey-300 flex-1" />
          <span>or continue with</span>
          <div className="h-[1px] bg-grey-300 flex-1" />
        </div>

        <div className="flex items-center justify-center gap-[32px] mb-6">
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
