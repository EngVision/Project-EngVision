import {
  Avatar,
  Button,
  Form,
  Image,
  Input,
  Select,
  Space,
  Tabs,
  TabsProps,
  notification,
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
import { getFileUrl } from '../../utils/common'
import { PRIVATE_ROUTES } from '../../utils/constants'

type NotificationType = 'success' | 'info' | 'warning' | 'error'

export const Profile = () => {
  const { TextArea } = Input
  const [account, setAccount] = useState<ProfileParams>()
  const [avatar, setAvatar] = useState('' as any)
  const [keyCollapse, setKeyCollapse] = useState('' as any)
  const [api, contextHolder] = notification.useNotification()

  const gender = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' },
  ]

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

  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({
      message: 'Notification Title',
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    })
  }

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Profile',
      children: <p></p>,
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
                  placeholder="Enter retype new password"
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
    const password: ChangePassword = values
    if (avatar) values.avatar = avatar

    try {
      if (
        keyCollapse.includes('1') ||
        keyCollapse.includes('2') ||
        !keyCollapse
      ) {
        await accountApi.update(values)
        openNotificationWithIcon('success')
      }
      if (
        keyCollapse.includes('3') &&
        values.password === values.retypePassword
      ) {
        await accountApi.changePassword(password)
        openNotificationWithIcon('success')
      }
    } catch (error) {
      openNotificationWithIcon('error')
      throw error
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
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
  )
}
