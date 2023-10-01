import { Button, Form, Input, notification } from 'antd'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import accountApi from '../../services/accountApi'
import type { Email } from '../../services/accountApi/types'
import { ROUTES } from '../../utils/constants'

const SendMailResetPassword: React.FC = () => {
  const [error, setError] = useState<string>('')
  const [sentMail, setSentMail] = useState<boolean>(false)
  const [apiNotification, contextHolder] = notification.useNotification()
  const navigate = useNavigate()

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    return emailRegex.test(email)
  }

  const onFinish = async (values: Email) => {
    setSentMail(true)
    try {
      const rs = await accountApi.sendMailForgotPassword(values)
      if (rs.success) {
        apiNotification.success({
          message: 'Success',
          description: rs.message,
        })
      } else
        apiNotification.error({
          message: 'Error',
          description: rs.message,
        })
    } catch (error) {
      setSentMail(false)
      setError(error.response.data.message)
    }
  }

  return (
    <>
      {contextHolder}
      <div className="w-[515px] bg-white px-[32px] py-[24px] rounded-[16px] w">
        <div>
          <h4 className="text-center text-[40px]">Forgot Your Password?</h4>
          <p className=" text-[#9D9DAD] my-[20px] text-lg">
            Just enter your email and we’ll send you a link to reset your
            password
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
            <Form.Item
              name="email"
              className="mb-[0px]"
              rules={[
                {
                  async validator(_, value) {
                    return new Promise((resolve, reject) => {
                      if (validateEmail(value)) {
                        resolve('')
                      } else reject(new Error('Invalid email'))
                    })
                  },
                },
              ]}
            >
              <Input
                placeholder="Email"
                size="middle"
                className="rounded-[8px] h-[44px]"
                onChange={() => setError('')}
              />
            </Form.Item>

            {error && <p className="text-[#ff4d4f] mt-[3px]">{error}</p>}

            <Form.Item className="text-center">
              <Button
                type="primary"
                shape="round"
                htmlType="submit"
                disabled={sentMail}
                className="w-full font-semibold h-[44px] text-xl mt-[20px]"
              >
                Reset Password
              </Button>
            </Form.Item>

            <p
              className="text-[#0073EA] text-xl font-semibold text-center cursor-pointer my-[28px]"
              onClick={() => navigate(ROUTES.signIn)}
              role="presentation"
            >
              Return to Sign In?
            </p>

            {sentMail && (
              <p className="text-center text-[#9D9DAD] text-xl mb-[30px]">
                Didn’t receive any email? Try looking up in your Spams or try
                again after
              </p>
            )}

            <p className="text-center text-[#9D9DAD] text-xl">
              Having troubles?
              <Link to="/sign-up" className="font-semibold text-[#0073EA] pl-2">
                Contact Us
              </Link>
            </p>
          </Form>
        </div>
      </div>
    </>
  )
}

export default SendMailResetPassword
