import { Button, Form, Checkbox, Input, Select } from 'antd'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../hooks/redux'
import accountApi from '../../services/accountApi'
import authApi from '../../services/authApi'
import type { SignUpParams } from '../../services/authApi/types'
import { GENDERS, PRIVATE_ROUTES } from '../../utils/constants'

const CreateProfile = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [error, setError] = useState<string>('')

  const onFinish = async (values: SignUpParams) => {
    const temp = {
      password: 'Kietle123@',
      avatar: '650adeb3d99e55d737d88f99',
      gender: 'Male',
      phone: '1234567890',
      about: 'string',
      country: 'string',
      role: 'Student',
    }
    console.log('🚀 ~ file: index.tsx:17 ~ onFinish ~ values:', values)
    try {
      const res = await accountApi.updateWhenSignUp(temp)
      console.log('🚀 ~ file: index.tsx:30 ~ onFinish ~ res:', res)

      navigate(PRIVATE_ROUTES.home)
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

      <Form
        name="basic"
        style={{ maxWidth: 600 }}
        initialValues={{ accepted: false }}
        onFinish={onFinish}
        autoComplete="off"
        onChange={() => setError('')}
      >
        <div className="flex items-center gap-4">
          <Form.Item<SignUpParams>
            name="firstName"
            rules={[
              { message: 'Please input your first name!', required: true },
            ]}
          >
            <Input
              placeholder="First Name"
              size="middle"
              className="rounded-[8px] h-[40px]"
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
              className="rounded-[8px] h-[40px]"
            />
          </Form.Item>
        </div>

        <Form.Item<SignUpParams>
          name="password"
          rules={[{ message: 'Please input your password!', required: true }]}
        >
          <Input.Password
            placeholder="Password"
            size="middle"
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
            size="middle"
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
            className="rounded-[8px] h-[40px] text-[14px]"
          />
        </Form.Item>

        {/* <Form.Item<SignUpParams>
          name="gender"
          rules={[{ message: 'Please input your gender!', required: true }]}
        >
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item> */}

        <Form.Item<SignUpParams>
          name="gender"
          rules={[{ message: 'Please input your gender!', required: true }]}
        >
          <Select
            options={GENDERS}
            className="h-[40px] text-[14px]"
            placeholder="Choose your gender"
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
      </Form>
    </div>
  )
}

export default CreateProfile
