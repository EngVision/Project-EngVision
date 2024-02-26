import {
  Button,
  Form,
  Input,
  Select,
  Space,
  Tabs,
  TabsProps,
  notification,
} from 'antd'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import CustomUpload from '../../components/CustomUpload'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import accountApi from '../../services/accountApi'
import type {
  ChangePassword,
  ProfileParams,
} from '../../services/accountApi/types'
import { PRIVATE_ROUTES } from '../../utils/constants'
import { setUser } from '../../redux/app/slice'
import { useTranslation } from 'react-i18next'
type NotificationType = 'success' | 'info' | 'warning' | 'error'

export const UpdateProfile = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'Account' })
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.app.user)

  const [keyCollapse, setKeyCollapse] = useState('' as any)
  const [api, contextHolder] = notification.useNotification()

  const gender = [
    { value: 'Male', label: t('Male') },
    { value: 'Female', label: t('Female') },
    { value: 'Other', label: t('Other') },
  ]

  const openNotificationWithIcon = (
    type: NotificationType,
    description: string,
  ) => {
    api[type](
      type === 'success'
        ? {
            message: t('Successfully'),
            description: [description],
          }
        : {
            message: t('Failed'),
            description: [description],
          },
    )
  }

  const removeAvatar = async (v: any) => {
    const updatedProfile = await accountApi.update({ avatar: v })
    dispatch(setUser(updatedProfile.data))
  }

  const onFinish = async (values: ProfileParams) => {
    const password: ChangePassword = values

    try {
      if (keyCollapse.includes('1') || !keyCollapse) {
        const newInfoUser = await accountApi.update(values)
        openNotificationWithIcon('success', t('Update profile successfully.'))
        dispatch(setUser(newInfoUser.data))
      }
      if (
        keyCollapse.includes('2') &&
        values.password === values.retypePassword
      ) {
        await accountApi.changePassword(password)
        openNotificationWithIcon('success', t('Change password successfully.'))
      }
    } catch (error) {
      openNotificationWithIcon('error', t('Change password failed.'))
      throw error
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: t('Profile'),
      children: (
        <p>
          {user && (
            <div>
              <Form.Item<ProfileParams>
                label="Avatar"
                initialValue={user.avatar}
                name="avatar"
                valuePropName="fileList"
              >
                <CustomUpload type="picture-circle" onRemove={removeAvatar} />
              </Form.Item>
              <div className="flex max-xl:flex-col max-xl:gap-0 gap-8">
                <Form.Item<ProfileParams>
                  name="firstName"
                  label={t('First Name')}
                  className="flex-1"
                >
                  <Input
                    defaultValue={user.firstName}
                    size="large"
                    className="w-[100%] shadow-sm text-sm hover:border-slate-40 rounded-md"
                  />
                </Form.Item>
                <Form.Item<ProfileParams>
                  name="lastName"
                  label={t('Last Name')}
                  className="flex-1"
                >
                  <Input
                    defaultValue={user.lastName}
                    size="large"
                    className="w-[100%] text-sm shadow-sm hover:border-slate-40 rounded-md"
                  />
                </Form.Item>
              </div>

              <div className="flex max-xl:flex-col max-xl:gap-0 gap-8">
                <Form.Item<ProfileParams>
                  name="gender"
                  label={t('Gender')}
                  className="flex-1"
                >
                  <Select
                    className="text-sm shadow-sm"
                    size="large"
                    defaultValue={user.gender}
                    options={gender}
                  />
                </Form.Item>
                <Form.Item<ProfileParams> label="Email" className="flex-1">
                  <Input
                    defaultValue={user.email}
                    disabled
                    size="large"
                    className="text-sm w-[100%] shadow-sm hover:border-slate-40 rounded-md"
                  />
                </Form.Item>
                {/* {user.phone && (
                  <Form.Item<ProfileParams> name="phone" label="Phone Number">
                    <Input
                      defaultValue={user.phone}
                      size="large"
                      className="w-[31rem] border-slate-300 hover:border-slate-40 rounded-md shadow-sm"
                    />
                  </Form.Item>
                )} */}
              </div>

              {/* <Space className="flex max-xl:flex-col justify-between">
                <Form.Item<ProfileParams> name="email" label="Email">
                  <Input
                    defaultValue={user.email}
                    size="large"
                    className="w-[31rem] shadow-sm border-slate-300 hover:border-slate-40 rounded-md"
                  />
                </Form.Item>

                <Form.Item<ProfileParams> name="country" label="Country">
                  <Input
                    defaultValue={user.country}
                    size="large"
                    className="w-[31rem] border-slate-300 hover:border-slate-40 rounded-md shadow-sm"
                  />
                </Form.Item>
              </Space> */}
            </div>
          )}
        </p>
      ),
    },
    {
      key: '2',
      label: t('Change Password'),
      children: (
        <p>
          {
            <div>
              <Form.Item<ProfileParams>
                name="oldPassword"
                label={t('Old Password')}
              >
                <Input.Password
                  placeholder={t('Enter old password')}
                  size="large"
                  className="hover:border-slate-40 rounded-md shadow-sm"
                />
              </Form.Item>
              <Form.Item<ProfileParams>
                name="password"
                label={t('New Password')}
              >
                <Input.Password
                  placeholder={t('Enter new password')}
                  size="large"
                  className="hover:border-slate-40 rounded-md shadow-sm"
                />
              </Form.Item>
              <Form.Item<ProfileParams>
                name="retypePassword"
                label={t('Retype Password')}
              >
                <Input.Password
                  placeholder={t('Enter retype new password')}
                  size="large"
                  className="hover:border-slate-40 rounded-md shadow-sm"
                />
              </Form.Item>
            </div>
          }
        </p>
      ),
    },
  ]

  return (
    <div className="h-full">
      {contextHolder}
      <Form
        name="validateOnly"
        layout="vertical"
        autoComplete="off"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="h-full p-6 rounded-lg"
      >
        <Tabs
          defaultActiveKey="1"
          items={items}
          onChange={(e) => setKeyCollapse(e)}
        />
        <div className="py-6">
          <Space className="flex justify-end">
            <Link to={PRIVATE_ROUTES.home}>
              <Button className="h-10 w-20">{t('Cancel')}</Button>
            </Link>
            <Button type="primary" htmlType="submit" className="h-10 w-20 ">
              {t('Save')}
            </Button>
          </Space>
        </div>
      </Form>
    </div>
  )
}
