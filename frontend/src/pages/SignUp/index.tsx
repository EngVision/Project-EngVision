import { Button, Checkbox, Form, Input, Select } from 'antd'
import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useMutation } from '@tanstack/react-query'
import { FacebookIcon, GoogleIcon } from '../../components/Icons'
import Logo from '../../components/Icons/Logo'
import { NotificationContext } from '../../contexts/notification'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { setUser, setUserChat } from '../../redux/app/slice'
import authApi from '../../services/authApi'
import type { SignUpParams } from '../../services/authApi/types'
import {
  FACEBOOK_LOGIN,
  GOOGLE_LOGIN,
  Gender,
  PUBLIC_ROUTES,
  ROLES,
} from '../../utils/constants'
import enumToSelectOptions from '../../utils/enumsToSelectOptions'
import { getNewWindowPosition, validatePassword } from '../../utils/common'
import { useTranslation } from 'react-i18next'
import chatApi from '../../services/chatApi'
const SignUp: React.FC = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'Auth' })
  const dispatch = useAppDispatch()
  const apiNotification = useContext(NotificationContext)
  const [form] = Form.useForm<SignUpParams>()
  const user = useAppSelector((state) => state.app.user)

  const { mutate, isPending, error, reset } = useMutation({
    mutationFn: authApi.signUp,
    onSuccess: (data) => {
      dispatch(setUser(data.data))
      apiNotification.success({
        message: t('Sign up successfully!'),
      })
    },
  })

  const handleAuthChat = async () => {
    // function getCookieValue(cookieName: string) {
    //   const cookies = document.cookie.split(';')
    //   for (let i = 0; i < cookies.length; i++) {
    //     const cookie = cookies[i].trim()
    //     if (cookie.startsWith(cookieName + '=')) {
    //       return cookie.substring(cookieName.length + 1)
    //     }
    //   }
    //   return null
    // }

    // const chatUserId = getCookieValue('chat_user_id')
    // const chatToken = getCookieValue('chat_token')

    if (!user) return
    const userChat = await chatApi.login(user?.email, user?.email)

    const chatUserId = userChat?.userId
    const chatToken = userChat?.authToken

    if (chatUserId && chatToken) {
      dispatch(setUserChat({ userId: chatUserId, authToken: chatToken }))
    }
  }

  const onFinish = async (values: SignUpParams) => {
    const newUser = {
      ...values,
      role: ROLES.student.value,
    }
    mutate(newUser)
    handleAuthChat()
  }

  const fetchAuthUser = async () => {
    try {
      const data = await authApi.fetchAuthUser()

      dispatch(setUser(data))
    } catch (error) {
      console.log('error: ', error)
    }
  }

  useEffect(() => {
    window.addEventListener('storage', fetchAuthUser)
    return () => window.removeEventListener('storage', fetchAuthUser)
  }, [])

  const signUpWithGoogle = async () => {
    window.open(GOOGLE_LOGIN, '_blank', getNewWindowPosition(500, 600))
  }

  const signUpWithFacebook = async () => {
    window.open(FACEBOOK_LOGIN, '_blank', getNewWindowPosition(500, 600))
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

  const validateConfirmPassword = (confirmPassword: string) => {
    if (!confirmPassword) return true
    const password = form.getFieldValue('password')
    return confirmPassword === password
  }

  const validatePhone = (phone: string) => {
    if (!phone) return true
    const phoneRegex = /^\d{10,}$/
    return phoneRegex.test(phone)
  }

  const validateAcceptTerm = (accepted: boolean) => {
    return accepted
  }

  return (
    <div className="flex flex-col bg-surface p-8 rounded-[16px] gap-6 shadow-2xl">
      <div className="flex flex-col items-center gap-3">
        <Logo width={250} />
        <p className="text-textSubtle">
          {t('Create an account and start learning!')}
        </p>
      </div>

      <Form
        name="sign-up-form"
        initialValues={{ accepted: false }}
        onFinish={onFinish}
        autoComplete="off"
        className="w-[36rem] flex flex-col"
        layout="vertical"
        form={form}
        onChange={reset}
      >
        <div className="flex gap-4">
          <Form.Item<SignUpParams>
            name="firstName"
            label={t('First Name')}
            rules={[
              { message: t('Please input your first name!'), required: true },
            ]}
            className="flex-1"
          >
            <Input
              placeholder={t('First Name')}
              size="middle"
              className="rounded-lg py-2 px-3"
            />
          </Form.Item>

          <Form.Item<SignUpParams>
            name="lastName"
            label={t('Last Name')}
            rules={[
              { message: t('Please input your last name!'), required: true },
            ]}
            className="flex-1"
          >
            <Input
              placeholder={t('Last Name')}
              size="middle"
              className="rounded-lg py-2 px-3"
            />
          </Form.Item>
        </div>

        <Form.Item<SignUpParams>
          name="email"
          label="Email"
          rules={[
            {
              message: t('Please input your email!'),
              required: true,
            },
            {
              message: t('Invalid email!'),
              type: 'email',
            },
          ]}
        >
          <Input
            placeholder="Email"
            size="middle"
            className="rounded-lg py-2 px-3"
          />
        </Form.Item>

        <Form.Item<SignUpParams>
          name="gender"
          label={t('Gender')}
          rules={[{ message: t('Please input your gender!'), required: true }]}
          className="[&>*]:!text-sm"
        >
          <Select
            options={enumToSelectOptions(Gender)}
            className="h-[40px] !text-[14px]"
            placeholder={t('Gender')}
            size="large"
          />
        </Form.Item>

        <Form.Item<SignUpParams>
          name="password"
          label={t('Password')}
          rules={[
            { required: true, message: t('Please input your password!') },
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
            placeholder={t('Password')}
            size="large"
            className="rounded-lg py-2 px-3"
          />
        </Form.Item>

        <Form.Item<SignUpParams>
          name="confirmPassword"
          label={t('Confirm password')}
          rules={[
            {
              message: t('Please input your confirm password!'),
              required: true,
            },
            {
              async validator(_, value) {
                return new Promise((resolve, reject) => {
                  if (validateConfirmPassword(value)) {
                    resolve('')
                  } else
                    reject(
                      new Error(
                        t('The confirm password must be same as password!'),
                      ),
                    )
                })
              },
            },
          ]}
        >
          <Input.Password
            placeholder={t('Confirm password')}
            size="large"
            className="rounded-lg py-2 px-3"
          />
        </Form.Item>

        <Form.Item<SignUpParams>
          name="phoneNumber"
          label={t('Phone number')}
          rules={[
            {
              async validator(_, value) {
                return new Promise((resolve, reject) => {
                  if (validatePhone(value)) {
                    resolve('')
                  } else
                    reject(
                      new Error(
                        t(
                          'Phone must be longer than or equal to 10 characters',
                        ),
                      ),
                    )
                })
              },
            },
          ]}
        >
          <Input
            placeholder={t('Phone number')}
            className="rounded-lg py-2 px-3"
          />
        </Form.Item>

        <Form.Item<SignUpParams>
          name="accepted"
          valuePropName="checked"
          rules={[
            {
              async validator(_, value) {
                return new Promise((resolve, reject) => {
                  if (validateAcceptTerm(value)) {
                    resolve('')
                  } else reject(new Error(t('Please accept Terms of Service')))
                })
              },
            },
          ]}
        >
          <Checkbox>
            {t('I accept')}
            <Link
              to="/sign-up"
              className="font-semibold text-primary hover:text-secondary pl-2"
            >
              {t('Terms of Service')}
            </Link>
          </Checkbox>
        </Form.Item>

        {error && (
          <p className="text-secondary mt-[-20px] mb-6">
            {t('Email is existed. Please choose another email!')}
          </p>
        )}

        <Form.Item className="text-center" noStyle>
          <Button
            type="primary"
            shape="round"
            htmlType="submit"
            className="w-full h-11 mt-4"
            loading={isPending}
          >
            {t('Create account')}
          </Button>
        </Form.Item>

        <div className="text-grey-300 text-center my-4 px-16 flex items-center gap-4 justify-center">
          <div className="h-[1px] bg-grey-300 flex-1" />
          <span>{t('or continue with')}</span>
          <div className="h-[1px] bg-grey-300 flex-1" />
        </div>

        <div className="flex items-center justify-center gap-8 mb-6">
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
          {t('Have an account?')}
          <Link
            to={PUBLIC_ROUTES.signIn}
            className="font-semibold text-primary pl-2"
          >
            {t('Sign In')}
          </Link>
        </p>

        <p className="text-center text-textSubtle">
          {t('Are you a teacher?')}
          <Link
            to={PUBLIC_ROUTES.signUpTeacher}
            className="font-semibold text-primary pl-2"
          >
            {t('Teacher Sign Up')}
          </Link>
        </p>
      </Form>
    </div>
  )
}

export default SignUp
