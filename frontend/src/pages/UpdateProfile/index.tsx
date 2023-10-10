import {
  Avatar,
  Button,
  Collapse,
  CollapseProps,
  Divider,
  Form,
  Image,
  Input,
  Select,
  Space,
  message,
} from 'antd'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import CustomUpload from '../../components/CustomUpload'
import accountApi from '../../services/accountApi'
import type {
  ChangePassword,
  ProfileParams,
} from '../../services/accountApi/types'
import authApi from '../../services/authApi'
import { PRIVATE_ROUTES } from '../../utils/constants'

export const UpdateProfile = () => {
  const { TextArea } = Input
  const [account, setAccount] = useState<ProfileParams>()
  const [avatar, setAvatar] = useState('' as any)
  const [keyCollapse, setKeyCollapse] = useState('' as any)

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const res = await authApi.fetchAuthUser()
        const data = res.data
        if (data) setAccount(data)
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

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'Profile',
      children: (
        <p>
          {account && (
            <div>
              <Form.Item<ProfileParams> name="avatar" valuePropName="fileList">
                {account.avatar && (
                  <Image
                    className="mr-5 rounded-full"
                    style={{ width: 200, height: 200 }}
                    src={getFileUrl(account?.avatar)}
                    alt="avatar"
                  />
                )}
                {!account?.avatar && (
                  <Avatar size={300} className="p-5 rounded-sm"></Avatar>
                )}

                <CustomUpload
                  onChange={(value) => {
                    setAvatar(value)
                  }}
                />
              </Form.Item>

              <Space className="flex justify-between">
                <Form.Item<ProfileParams> name="firstName" label="First Name">
                  <Input
                    defaultValue={account.firstName}
                    size="large"
                    className="w-[31rem] shadow-sm border-slate-300 hover:border-slate-40 rounded-md"
                  />
                </Form.Item>
                <Form.Item<ProfileParams> name="lastName" label="Last Name">
                  <Input
                    defaultValue={account.lastName}
                    size="large"
                    className="w-[31rem] shadow-sm border-slate-300 hover:border-slate-40 rounded-md"
                  />
                </Form.Item>
              </Space>
              <Form.Item<ProfileParams> name="email" label="Email">
                <Input
                  defaultValue={account.email}
                  size="large"
                  className="w-[31rem] shadow-sm border-slate-300 hover:border-slate-40 rounded-md"
                />
              </Form.Item>
              <Form.Item<ProfileParams> name="about" label="About">
                <TextArea
                  defaultValue={account.about}
                  style={{ height: 80, resize: 'none' }}
                  className="border-slate-300 shadow-sm hover:border-slate-40 rounded-md"
                />
              </Form.Item>
            </div>
          )}
        </p>
      ),
    },
    {
      key: '2',
      label: 'Personal Information',
      children: (
        <p>
          {account && (
            <div>
              <Space className="flex justify-between">
                <Form.Item<ProfileParams>
                  name="gender"
                  label="Gender"
                  className="w-[31rem]"
                >
                  <Select
                    className="shadow-sm"
                    size="large"
                    defaultValue={account.gender}
                    options={gender}
                  />
                </Form.Item>

                <Form.Item<ProfileParams> name="phone" label="Phone Number">
                  <Input
                    defaultValue={account.phone}
                    size="large"
                    className="w-[31rem] border-slate-300 hover:border-slate-40 rounded-md shadow-sm"
                  />
                </Form.Item>
              </Space>
            </div>
          )}
        </p>
      ),
    },
    {
      key: '3',
      label: 'Change Password',
      children: (
        <p>
          {
            <div>
              <Form.Item<ProfileParams> name="oldPassword" label="Old Password">
                <Input.Password
                  placeholder="Enter old password"
                  size="large"
                  className="border-slate-300 hover:border-slate-40 rounded-md shadow-sm"
                />
              </Form.Item>
              <Form.Item<ProfileParams> name="password" label="New Password">
                <Input.Password
                  placeholder="Enter new password"
                  size="large"
                  className="border-slate-300 hover:border-slate-40 rounded-md shadow-sm"
                />
              </Form.Item>
              <Form.Item<ProfileParams>
                name="retypePassword"
                label="Retype Password"
              >
                <Input.Password
                  placeholder="Enter retype old password"
                  size="large"
                  className="border-slate-300 hover:border-slate-40 rounded-md shadow-sm"
                />
              </Form.Item>
            </div>
          }
        </p>
      ),
    },
  ]

  const onFinish = async (values: ProfileParams) => {
    console.log('Success:', values)
    const password: ChangePassword = values
    if (avatar) values.avatar = avatar
    console.log(keyCollapse)

    try {
      if (
        keyCollapse.includes('1') ||
        keyCollapse.includes('2') ||
        !keyCollapse
      ) {
        await accountApi.update(values)
      }
      if (
        keyCollapse.includes('3') &&
        values.password === values.retypePassword
      ) {
        await accountApi.changePassword(password)
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      throw error
    }
    location.reload()
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div>
      {account && (
        <Form
          name="validateOnly"
          layout="vertical"
          autoComplete="off"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Collapse
            items={items}
            defaultActiveKey={['1']}
            onChange={(value) => {
              setKeyCollapse(value)
            }}
          />
          <div className="mt-6">
            <Space className="flex justify-end">
              <Link to={PRIVATE_ROUTES.home}>
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
