import { Button, Checkbox, Form, Input, Select } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useForm } from 'antd/es/form/Form'
import accountApi from '../../services/accountApi'
import authApi from '../../services/authApi'
import type { SignUpParams } from '../../services/authApi/types'
import { Gender, PRIVATE_ROUTES, Role } from '../../utils/constants'
import { setUser } from '../../redux/app/slice'
import { useAppDispatch } from '../../hooks/redux'
import { NotificationContext } from '../../contexts/notification'
import enumToSelectOptions from '../../utils/enumsToSelectOptions'
import { useMutation } from '@tanstack/react-query'

const CreateProfile = () => {
  const [form] = useForm<SignUpParams>()
  const dispatch = useAppDispatch()
  const apiNotification = useContext(NotificationContext)
  const navigate = useNavigate()

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

  const updateAccountMutation = useMutation({
    mutationFn: accountApi.updateWhenSignUp,
  })

  const onFinish = async (values: SignUpParams) => {
    if (!values.accepted) {
      setError('Please accept Terms of Service')
      return
    }

    updateAccountMutation.mutate(values, {
      onSuccess: (data) => {
        dispatch(setUser(data.data))
        apiNotification.success({
          message: 'Create account successfully!',
        })
        navigate(PRIVATE_ROUTES.home)
      },
    })
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
    <div className="w-[100vw] min-h-[100vh] flex items-center justify-center bg-slate-300 py-16">
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
          layout="vertical"
          className="w-[36rem]"
        >
          <div className="flex items-center gap-4">
            <Form.Item<SignUpParams>
              name="firstName"
              label="First name"
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
              label="Last name"
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
              size="middle"
              className="rounded-[8px] h-[40px]"
            />
          </Form.Item>

          <Form.Item<SignUpParams>
            name="confirmPassword"
            label="Confirm password"
            rules={[
              {
                message: 'Please input your confirm password!',
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
              size="middle"
              className="rounded-[8px] h-[40px]"
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
            <Input
              placeholder="Phone Number"
              className="rounded-[8px] h-[40px] text-[14px]"
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
            name="role"
            label="Role"
            rules={[{ required: true, message: 'Please choose role!' }]}
          >
            <Select
              placeholder="Select role"
              options={Object.values(Role).map((role) => ({
                value: role,
                label: role,
              }))}
              className="h-[40px] text-[14px]"
              size="large"
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
                className="font-semibold text-[#CECED6] hover:text-[#CECED6] pl-2"
              >
                Terms of Service
              </Link>
            </Checkbox>
          </Form.Item>

          {error && <p className="text-secondary mt-[-20px] mb-6">{error}</p>}

          <Form.Item className="text-center">
            <Button
              type="primary"
              shape="round"
              htmlType="submit"
              className="h-[40px] min-w-[200px] font-semibold"
              loading={updateAccountMutation.isPending}
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
