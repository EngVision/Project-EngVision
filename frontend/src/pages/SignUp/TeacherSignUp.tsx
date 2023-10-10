import { Button, Form, Checkbox, Input } from 'antd'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { FacebookIcon, GoogleIcon } from '../../components/Icons'
import { useAppDispatch } from '../../hooks/redux'
import { setRole, setUserAccountId } from '../../redux/app/slice'
import authApi from '../../services/authApi'
import type { SignUpParams } from '../../services/authApi/types'
import { ROLES, PRIVATE_ROUTES, PUBLIC_ROUTES } from '../../utils/constants'

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
      dispatch(setUserAccountId(data.id))
      dispatch(setRole(data.role))
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
    <div className="bg-white p-[40px] rounded-[16px]">
      <div>
        <h4 className="text-center font-semibold text-[40px] mb-[40px]">
          Welcome to EngVision!
        </h4>
        <p className="text-textSubtle my-[20px]">
          Create an account and start learning!
        </p>
      </div>

      <Form
        name="basic"
        style={{ maxWidth: 600 }}
        initialValues={{ accepted: false }}
        onFinish={onFinish}
        autoComplete="off"
        onChange={() => setError('')}
      >
        <Form.Item<SignUpParams>
          name="firstName"
          rules={[{ message: 'Please input your first name!', required: true }]}
        >
          <Input
            placeholder="First Name"
            size="middle"
            className="rounded-[8px] h-[40px]"
          />
        </Form.Item>

        <Form.Item<SignUpParams>
          name="lastName"
          rules={[{ message: 'Please input your last name!', required: true }]}
        >
          <Input
            placeholder="Last Name"
            size="middle"
            className="rounded-[8px] h-[40px]"
          />
        </Form.Item>

        <Form.Item<SignUpParams>
          name="email"
          rules={[{ message: 'Please input your email!', required: true }]}
        >
          <Input
            placeholder="Email"
            size="middle"
            className="rounded-[8px] h-[40px]"
          />
        </Form.Item>

        <Form.Item<SignUpParams>
          name="password"
          rules={[{ message: 'Please input your password!', required: true }]}
        >
          <Input.Password
            placeholder="Password"
            size="large"
            className="rounded-[8px] h-[40px]"
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
            className="rounded-[8px] h-[40px]"
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
            className="rounded-[8px] h-[40px]"
          />
        </Form.Item>

        <Form.Item<SignUpParams>
          name="certificate"
          rules={[
            { message: 'Please input your certificate!', required: true },
          ]}
        >
          <Input placeholder="Certificate" className="rounded-[8px] h-[40px]" />
        </Form.Item>

        <Form.Item<SignUpParams>
          name="school"
          rules={[
            { message: 'Please input your working school!', required: true },
          ]}
        >
          <Input
            placeholder="Working school"
            className="rounded-[8px] h-[40px]"
          />
        </Form.Item>

        {error && <p className="text-red-500">{error}</p>}

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

        <p className="text-[#CECED6] text-center my-[18px]">or continue with</p>

        <div className="flex items-center justify-center gap-[32px] mb-6">
          {SIGN_UP_VENDORS.map((vendor) => (
            <div
              key={vendor.name}
              className="flex border-[1px] border-solid border-[#CECED6] rounded-[12px] px-[20px] py-[16px] cursor-pointer"
              onClick={vendor.onClick}
              role="presentation"
            >
              {vendor.icon}
            </div>
          ))}
        </div>

        <Form.Item className="text-center">
          <Button
            type="primary"
            shape="round"
            htmlType="submit"
            className="h-[40px] min-w-[200px] font-semibold"
          >
            Sign Up
          </Button>
        </Form.Item>

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
