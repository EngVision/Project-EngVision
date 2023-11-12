import { Button, Checkbox, Form, Input, Select } from 'antd'
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useMutation } from '@tanstack/react-query'
import { FacebookIcon, GoogleIcon } from '../../components/Icons'
import { NotificationContext } from '../../contexts/notification'
import { useAppDispatch } from '../../hooks/redux'
import { setUser } from '../../redux/app/slice'
import authApi from '../../services/authApi'
import type { SignUpParams } from '../../services/authApi/types'
import {
  FACEBOOK_LOGIN,
  GOOGLE_LOGIN,
  Gender,
  PUBLIC_ROUTES,
  ROLES,
  STUDENT_ROUTES,
} from '../../utils/constants'
import enumToSelectOptions from '../../utils/enumsToSelectOptions'
import Logo from '../../components/Icons/Logo'

const SignUp: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const apiNotification = useContext(NotificationContext)
  const [form] = Form.useForm<SignUpParams>()

  const { mutate, isPending, error, reset } = useMutation({
    mutationFn: authApi.signUp,
    onSuccess: (data) => {
      dispatch(setUser(data.data))
      apiNotification.success({
        message: 'Sign up successfully!',
      })
      navigate(STUDENT_ROUTES.getStarted)
    },
  })

  const onFinish = async (values: SignUpParams) => {
    const newUser = {
      ...values,
      role: ROLES.student.value,
    }
    mutate(newUser)
  }

  const fetchAuthUser = async (timer: ReturnType<typeof setInterval>) => {
    try {
      const data = await authApi.fetchAuthUser()

      dispatch(setUser(data))
      navigate(PUBLIC_ROUTES.createProfile)
      clearInterval(timer)
    } catch (error) {
      console.log('error: ', error)
    }
  }

  const signUpWithGoogle = async () => {
    let timer: ReturnType<typeof setInterval>

    const newWindow = window.open(
      GOOGLE_LOGIN,
      '_blank',
      'width=500,height=600,left=400,top=200',
    )

    if (newWindow) {
      timer = setInterval(() => {
        if (newWindow.closed) {
          fetchAuthUser(timer)
        }
      }, 1000)
    }
  }
  const signUpWithFacebook = async () => {
    let timer: ReturnType<typeof setInterval>

    const newWindow = window.open(
      FACEBOOK_LOGIN,
      '_blank',
      'width=500,height=600,left=400,top=200',
    )

    if (newWindow) {
      timer = setInterval(() => {
        if (newWindow.closed) {
          fetchAuthUser(timer)
        }
      }, 1000)
    }
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

  const validateEmail = (email: string) => {
    if (!email) return true
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    return emailRegex.test(email)
  }

  const validatePassword = (password: string) => {
    if (!password) return true
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{8,}$/
    return password && password.length >= 8 && passwordRegex.test(password)
  }

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
    <div className="flex flex-col bg-bgNeutral p-8 rounded-[16px] gap-6 shadow-2xl">
      <div className="flex flex-col items-center gap-3">
        <Logo width={250} />
        <div>Create an account and start learning!</div>
      </div>

      <Form
        name="sign-up-form"
        initialValues={{ accepted: false }}
        onFinish={onFinish}
        autoComplete="off"
        className="w-[560px] flex flex-col"
        layout="vertical"
        form={form}
        onChange={reset}
      >
        <div className="flex gap-4">
          <Form.Item<SignUpParams>
            name="firstName"
            label="First name"
            rules={[
              { message: 'Please input your first name!', required: true },
            ]}
            className="flex-1"
          >
            <Input
              placeholder="First Name"
              size="middle"
              className="rounded-lg py-2 px-3"
            />
          </Form.Item>

          <Form.Item<SignUpParams>
            name="lastName"
            label="Last name"
            rules={[
              { message: 'Please input your last name!', required: true },
            ]}
            className="flex-1"
          >
            <Input
              placeholder="Last Name"
              size="middle"
              className="rounded-lg py-2 px-3"
            />
          </Form.Item>
        </div>

        <Form.Item<SignUpParams>
          name="email"
          label="Email"
          rules={[
            { message: 'Please input your email!', required: true },
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
            className="rounded-lg py-2 px-3"
          />
        </Form.Item>

        <Form.Item<SignUpParams>
          name="gender"
          label="Gender"
          rules={[{ message: 'Please input your gender!', required: true }]}
          className="[&>*]:!text-sm"
        >
          <Select
            options={enumToSelectOptions(Gender)}
            className="h-[40px] !text-[14px]"
            placeholder="Gender"
            size="large"
          />
        </Form.Item>

        <Form.Item<SignUpParams>
          name="password"
          label="Password"
          rules={[
            { message: 'Please input your password!', required: true },
            {
              async validator(_, value) {
                return new Promise((resolve, reject) => {
                  if (validatePassword(value)) {
                    resolve('')
                  } else
                    reject(
                      new Error(
                        'The password must be at least 8 characters long and contain at least 1 uppercase letter, 1 lowercase letter, and 1 number or special character',
                      ),
                    )
                })
              },
            },
          ]}
        >
          <Input.Password
            placeholder="Password"
            size="large"
            className="rounded-lg py-2 px-3"
          />
        </Form.Item>

        <Form.Item<SignUpParams>
          name="confirmPassword"
          label="Confirm password"
          rules={[
            { message: 'Please input your confirm password!', required: true },
            {
              async validator(_, value) {
                return new Promise((resolve, reject) => {
                  if (validateConfirmPassword(value)) {
                    resolve('')
                  } else
                    reject(
                      new Error(
                        'The confirm password must be same as password!',
                      ),
                    )
                })
              },
            },
          ]}
        >
          <Input.Password
            placeholder="Confirm password"
            size="large"
            className="rounded-lg py-2 px-3"
          />
        </Form.Item>

        <Form.Item<SignUpParams>
          name="phoneNumber"
          label="Phone number"
          rules={[
            {
              async validator(_, value) {
                return new Promise((resolve, reject) => {
                  if (validatePhone(value)) {
                    resolve('')
                  } else
                    reject(
                      new Error(
                        'Phone must be longer than or equal to 10 characters',
                      ),
                    )
                })
              },
            },
          ]}
        >
          <Input placeholder="Phone Number" className="rounded-lg py-2 px-3" />
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
                  } else reject(new Error('Please accept Terms of Service'))
                })
              },
            },
          ]}
        >
          <Checkbox>
            I accept
            <Link
              to="/sign-up"
              className="font-semibold text-primary hover:text-secondary pl-2"
            >
              Terms of Service
            </Link>
          </Checkbox>
        </Form.Item>

        {error && (
          <p className="text-secondary mt-[-20px] mb-6">
            Email is existed. Please choose another email!
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
            Create account
          </Button>
        </Form.Item>

        <div className="text-grey-300 text-center my-4 px-16 flex items-center gap-4 justify-center">
          <div className="h-[1px] bg-grey-300 flex-1" />
          <span>or continue with</span>
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
          Have an account?
          <Link
            to={PUBLIC_ROUTES.signIn}
            className="font-semibold text-primary pl-2"
          >
            Sign In
          </Link>
        </p>

        <p className="text-center text-textSubtle">
          Are you a teacher?
          <Link
            to={PUBLIC_ROUTES.signUpTeacher}
            className="font-semibold text-primary pl-2"
          >
            Teacher Sign Up
          </Link>
        </p>
      </Form>
    </div>
  )
}

export default SignUp
