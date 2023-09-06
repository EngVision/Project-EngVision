import { Button, Form, Checkbox, Input } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

import AuthLayout from '../../layouts/AuthLayout'

type FieldType = {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  accepted: boolean
}

const SignUp: React.FC = () => {
  const onFinish = (values: FieldType) => {
    console.log('values:', values)
  }

  return (
    <AuthLayout>
      <div className="bg-white p-[32px] rounded-[16px]">
        <div>
          <h4 className="text-center font-semibold text-[40px]">
            Welcome to EngVision!
          </h4>
          <p className="text-[16px] text-[#9D9DAD] my-[20px]">
            Create an account and start learning!
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
            <Form.Item<FieldType>
              name="firstName"
              rules={[
                { message: 'Please input your first name!', required: true },
              ]}
            >
              <Input
                placeholder="First Name"
                size="middle"
                className="rounded-[8px] h-[48px]"
              />
            </Form.Item>
            <Form.Item<FieldType>
              name="lastName"
              rules={[
                { message: 'Please input your last name!', required: true },
              ]}
            >
              <Input
                placeholder="Last Name"
                size="middle"
                className="rounded-[8px] h-[48px]"
              />
            </Form.Item>
            <Form.Item<FieldType>
              name="email"
              rules={[{ message: 'Please input your email!', required: true }]}
            >
              <Input
                placeholder="Email"
                size="middle"
                className="rounded-[8px] h-[48px]"
              />
            </Form.Item>
            <Form.Item<FieldType>
              name="password"
              rules={[
                { message: 'Please input your password!', required: true },
              ]}
            >
              <Input.Password
                placeholder="Password"
                size="large"
                className="rounded-[8px] h-[48px]"
              />
            </Form.Item>
            <Form.Item<FieldType>
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
                className="rounded-[8px] h-[48px]"
              />
            </Form.Item>
            <Form.Item<FieldType> name="accepted" valuePropName="checked">
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
                className="h-[40px] min-w-[200px] font-semibold bg-[#0073EA]"
              >
                Sign Up
              </Button>
            </Form.Item>
            <p className="text-center text-[#9D9DAD]">
              Have an account?
              <Link to="/sign-in" className="font-semibold text-[#0073EA] pl-2">
                Sign In
              </Link>
            </p>
          </Form>
        </div>
      </div>
    </AuthLayout>
  )
}

export default SignUp
