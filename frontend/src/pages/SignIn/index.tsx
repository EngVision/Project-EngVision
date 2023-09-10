import { Button, Form, Input } from 'antd'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../hooks/redux'
import { setUserAccountId } from '../../redux/app/slice'
import authApi from '../../services/authApi'
import type { SignInParams } from '../../services/authApi/types'
import { SIGN_IN_VENDORS, ROUTES } from '../../utils/constants'

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
      navigate('/')
    } catch (error) {
      setError(error.response.data.message)
    }
  }

  return (
    <div className="bg-white p-[40px] rounded-[16px]">
      <div>
        <h4 className="text-center font-semibold text-[40px] mb-[32px]">
          Welcome to EngVision!
        </h4>
        <p className=" text-[#9D9DAD] my-[20px]">Start learning right now!</p>
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
              >
                <img
                  src={vendor.icon}
                  alt={vendor.name}
                  className="w-[32px] h-[32px] object-contain"
                />
              </div>
            ))}
          </div>

          <p
            className="text-[#0073EA] font-semibold text-right cursor-pointer my-[28px]"
            onClick={() => navigate(ROUTES.sendMailResetPassword)}
          >
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

          <p className="text-center text-[#9D9DAD] ">
            Didn't have an account?
            <Link to="/sign-up" className="font-semibold text-[#0073EA] pl-2">
              Sign Up
            </Link>
          </p>
        </Form>
      </div>
    </div>
  )
}

export default SignIn
