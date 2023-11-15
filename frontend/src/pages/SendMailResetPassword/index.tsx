import { Button, Form, Input, notification } from 'antd'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import accountApi from '../../services/accountApi'
import type { Email } from '../../services/accountApi/types'
import { PUBLIC_ROUTES } from '../../utils/constants'

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
      setError(error.data.message)
    }
  }

  return (
    <>
      {contextHolder}
      <div className=" bg-bgNeutral rounded-2xl p-8">
        <div className="mb-6">
          <h4 className="text-center text-3xl text-primary mb-4">
            Forgot Your Password?
          </h4>
          <p className=" text-wolfGrey text-lg text-center">
            Just enter your email and <br></br>we’ll send you a link to reset
            your password
          </p>
        </div>

        <div>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              name="email"
              className="mb-2"
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
                className="rounded-lg text-xs p-3"
                onChange={() => setError('')}
              />
            </Form.Item>

            {error && <p className="text-secondary">{error}</p>}

            <Form.Item className="text-center mt-6">
              <Button
                type="primary"
                shape="round"
                htmlType="submit"
                disabled={sentMail}
                className="w-full h-11 font-semibold text-lg"
              >
                Reset Password
              </Button>
            </Form.Item>

            <p
              className="text-primary mb-6 font-semibold text-center cursor-pointer"
              onClick={() => navigate(PUBLIC_ROUTES.signIn)}
              role="presentation"
            >
              Return to Sign In?
            </p>

            {sentMail && (
              <p className="text-center text-[#9D9DAD]">
                Didn’t receive any email? Try looking up in your Spams or try
                again after
              </p>
            )}

            <p className="text-center text-[#9D9DAD]">
              Having troubles?
              <Link to="/sign-up" className="font-semibold text-primary pl-2">
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
