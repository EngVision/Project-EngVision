import { Button, Form, Input, notification } from 'antd'
import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import accountApi from '../../services/accountApi'
import { PUBLIC_ROUTES } from '../../utils/constants'
import { validatePassword } from '../../utils/common'

const ResetForgotPassword: React.FC = () => {
  const { resetPasswordCode } = useParams()
  const [isValidatedUrl, setValidatedUrl] = useState<boolean>(false)
  const [apiNotification, contextHolder] = notification.useNotification()
  const navigate = useNavigate()

  useEffect(() => {
    validateUrl()
  }, [])

  const validateUrl = async () => {
    const res = await accountApi.validateUrlResetPassword({
      resetPasswordCode: String(resetPasswordCode),
    })

    if (!res.success) {
      navigate(PUBLIC_ROUTES.sendMailResetPassword)
    }
    setValidatedUrl(res.success)
  }

  const onFinish = async (values: any) => {
    try {
      const rs = await accountApi.resetForgotPassword({
        resetPasswordCode: String(resetPasswordCode),
        newPassword: values.password,
      })
      if (rs.success) {
        apiNotification.success({
          message: 'Success',
          description: rs.message,
        })
        setTimeout(() => {
          navigate(PUBLIC_ROUTES.signIn)
        }, 2000)
      }
    } catch (error) {
      apiNotification.success({
        message: 'Success',
        description: error.response.data.message,
      })
    }
  }

  return (
    <>
      {contextHolder}
      <div
        className={classNames(' bg-white px-[32px] py-[24px] rounded-[16px]', {
          hidden: !isValidatedUrl,
        })}
      >
        <div>
          <h4 className="text-center text-[40px] mb-[32px]">
            Reset Your Password?
          </h4>
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
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
                {
                  async validator(_, value) {
                    return new Promise((resolve, reject) =>
                      validatePassword(resolve, reject, value),
                    )
                  },
                },
              ]}
            >
              <Input.Password
                placeholder="New password!"
                size="large"
                className="rounded-[8px] h-[44px]"
              />
            </Form.Item>
            <Form.Item
              name="confirm"
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  async validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(
                      new Error('The retype password not match'),
                    )
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder="Retype new password!"
                size="large"
                className="rounded-[8px] h-[44px]"
              />
            </Form.Item>

            <Form.Item className="text-center">
              <Button
                type="primary"
                shape="round"
                htmlType="submit"
                className="w-full font-semibold h-[44px] text-xl mt-[20px]"
              >
                Reset Password
              </Button>
            </Form.Item>

            <p
              className="text-[#0073EA] text-xl font-semibold text-center cursor-pointer my-[28px]"
              onClick={() => navigate(PUBLIC_ROUTES.signIn)}
              role="presentation"
            >
              Return to Sign In?
            </p>

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

export default ResetForgotPassword
