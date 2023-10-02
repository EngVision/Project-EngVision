import { Button, Form, Input, Space, Divider, Select } from 'antd'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import accountApi from '../../services/accountApi'
import type { ProfileParams } from '../../services/accountApi/types'
import authApi from '../../services/authApi'
import { ROUTES } from '../../utils/constants'

export const UpdateProfile = () => {
  const { TextArea } = Input
  const [account, setAccount] = useState<ProfileParams | null>(null)

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const { data } = await authApi.fetchAuthUser()
        setAccount(data)
      } catch (error) {
        console.error('Error fetching courses:', error)
      }
    }

    fetchAccount()
  }, [])

  const gender = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' },
  ]

  const role = [
    {
      value: 'Student',
      label: 'Student',
    },
    {
      value: 'Teacher',
      label: 'Teacher',
    },
    {
      value: 'Admin',
      label: 'Admin',
    },
  ]

  const onFinish = async (values: ProfileParams) => {
    console.log('Success:', values)
    try {
      await accountApi.update(values)
    } catch (error) {
      throw error
    }
    window.location.reload()
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className="m-12 max-w-2xl ">
      <div className="m-6">
        <p className="font-bold text-lg">Personal information</p>
        <Divider />
      </div>
      {account && (
        <Form
          name="validateOnly"
          layout="vertical"
          autoComplete="off"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <div className="m-6">
            <p className="font-medium text-xl my-6">Profile</p>

            <Space className="flex justify-between">
              <Form.Item<ProfileParams> name="firstName" label="First Name">
                <Input
                  defaultValue={account.firstName}
                  className="w-[18rem] border-slate-300 hover:border-slate-40 rounded-md"
                />
              </Form.Item>
              <Form.Item<ProfileParams> name="lastName" label="Last Name">
                <Input
                  defaultValue={account.lastName}
                  className="w-[18rem] border-slate-300 hover:border-slate-40 rounded-md"
                />
              </Form.Item>
            </Space>
            <Form.Item<ProfileParams> name="email" label="Email">
              <Input
                defaultValue={account.email}
                className="w-[18rem] border-slate-300 hover:border-slate-40 rounded-md"
              />
            </Form.Item>
            <Form.Item<ProfileParams> name="about" label="About">
              <TextArea
                defaultValue={account.about}
                style={{ height: 80, resize: 'none' }}
                className="border-slate-300 hover:border-slate-40 rounded-md"
              />
            </Form.Item>
          </div>

          <div className="m-6">
            <p className="font-medium text-xl mt-12 mb-6">
              Personal Information
            </p>
            <Space className="flex justify-between">
              <Form.Item<ProfileParams>
                name="gender"
                label="Gender"
                className="w-[18rem]"
              >
                <Select
                  defaultValue={account.gender}
                  options={gender}
                  size="large"
                />
              </Form.Item>
              <Form.Item name="role" label="Role" className="w-[18rem]">
                <Select
                  defaultValue={account.role}
                  options={role}
                  size="large"
                />
              </Form.Item>
            </Space>
            <Space className="flex justify-between">
              <Form.Item<ProfileParams> name="country" label="Country">
                <Input
                  defaultValue={account.country}
                  className="w-[18rem] border-slate-300 hover:border-slate-40 rounded-md"
                />
              </Form.Item>
              <Form.Item<ProfileParams> name="phone" label="Phone Number">
                <Input
                  defaultValue={account.phone}
                  className="w-[18rem] border-slate-300 hover:border-slate-40 rounded-md"
                />
              </Form.Item>
            </Space>
          </div>

          <div className="m-6">
            <Divider className="mt-12 mb-6" />
            <Space className="flex justify-end">
              <Link to={ROUTES.home}>
                <Button className="h-10 w-20">Cancel</Button>
              </Link>
              <Button
                type="primary"
                htmlType="submit"
                className="h-10 w-20 bg-[#2563EB]"
              >
                Save
              </Button>
            </Space>
          </div>
        </Form>
      )}
    </div>
  )
}
