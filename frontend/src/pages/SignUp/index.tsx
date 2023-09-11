import { Button, Form, Checkbox, Input, Select } from 'antd'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../hooks/redux'
import { setUserAccountId } from '../../redux/app/slice'
import authApi from '../../services/authApi'
import type { SignUpParams } from '../../services/authApi/types'
import { ROLES, ROUTES } from '../../utils/constants'

const SignUp: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [error, setError] = useState<string>('')

  const onFinish = async (values: SignUpParams) => {
    try {
      const {
        data: { id },
      } = await authApi.signUp(values)
      dispatch(setUserAccountId(id))
      localStorage.setItem('userAccountId', JSON.stringify(id))
      navigate(ROUTES.home)
    } catch (error) {
      setError(error.response.data.message)
    }
  }

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

      <div>
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
            rules={[
              { message: 'Please input your first name!', required: true },
            ]}
          >
            <Input
              placeholder="First Name"
              size="middle"
              className="rounded-[8px] h-[44px]"
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
              className="rounded-[8px] h-[44px]"
            />
          </Form.Item>

          <Form.Item<SignUpParams>
            name="email"
            rules={[{ message: 'Please input your email!', required: true }]}
          >
            <Input
              placeholder="Email"
              size="middle"
              className="rounded-[8px] h-[44px]"
            />
          </Form.Item>

          <Form.Item<SignUpParams>
            name="password"
            rules={[{ message: 'Please input your password!', required: true }]}
          >
            <Input.Password
              placeholder="Password"
              size="large"
              className="rounded-[8px] h-[44px]"
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
              placeholder="Retype password"
              size="large"
              className="rounded-[8px] h-[44px]"
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
              className="rounded-[8px] h-[44px]"
            />
          </Form.Item>

          <Form.Item<SignUpParams>
            name="role"
            rules={[{ message: 'Please choose your role!', required: true }]}
          >
            <Select
              onChange={(value) => {
                console.log(value)
              }}
              placeholder="Role"
              options={Object.values(ROLES)}
              className="[& *]:h-44"
              size="large"
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
              to={ROUTES.signIn}
              className="font-semibold text-primary pl-2"
            >
              Sign In
            </Link>
          </p>
        </Form>
      </div>
    </div>
  )
}

export default SignUp
