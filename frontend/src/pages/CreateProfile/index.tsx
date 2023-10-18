import { Button, Checkbox, Form, Input, Select } from 'antd'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useForm } from 'antd/es/form/Form'
import accountApi from '../../services/accountApi'
import authApi from '../../services/authApi'
import type { SignUpParams } from '../../services/authApi/types'
import { GENDERS } from '../../utils/constants'

const CreateProfile = () => {
  const [form] = useForm<SignUpParams>()

  const [error, setError] = useState<string>('')

  const getUser = async () => {
    const data = await authApi.fetchAuthUser()

    form.setFieldsValue({
      ...data,
    })
  }

  useEffect(() => {
    getUser()
  }, [])

  const onFinish = async (values: SignUpParams) => {
    try {
      const res = await accountApi.updateWhenSignUp(values)
      console.log('🚀 ~ file: index.tsx:30 ~ onFinish ~ res:', res)

      window.close()
    } catch (error) {
      setError(error.response.data.message)
    }
  }

  console.log('first')

  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center bg-slate-300">
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
          form={form}
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
    </div>
  )
}

export default CreateProfile
