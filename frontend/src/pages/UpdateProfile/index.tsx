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
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import CustomUpload from '../../components/CustomUpload'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import accountApi from '../../services/accountApi'
import type {
  ChangePassword,
  ProfileParams,
} from '../../services/accountApi/types'
import { PRIVATE_ROUTES, Role } from '../../utils/constants'
import { setUser } from '../../redux/app/slice'
import { useTranslation } from 'react-i18next'
import { useForm } from 'antd/es/form/Form'
import { validatePassword } from '../../utils/common'
type NotificationType = 'success' | 'info' | 'warning' | 'error'

export const UpdateProfile = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'Account' })
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.app.user)
  const [form] = useForm()

  const [keyCollapse, setKeyCollapse] = useState('' as any)
  const [api, contextHolder] = notification.useNotification()

  const gender = [
    { value: 'Male', label: t('Male') },
    { value: 'Female', label: t('Female') },
    { value: 'Other', label: t('Other') },
  ]

  useEffect(() => {
    form.setFieldsValue(user)
  }, [])

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
      if (
        !keyCollapse ||
        keyCollapse.includes('1') ||
        keyCollapse.includes('3')
      ) {
        const newInfoUser = await accountApi.update(values)
        openNotificationWithIcon('success', t('Update profile successfully.'))
        dispatch(setUser(newInfoUser.data))
      } else if (
        keyCollapse.includes('2') &&
        values.password === values.retypePassword
      ) {
        await accountApi.changePassword(password)
        openNotificationWithIcon('success', t('Change password successfully.'))
      }
    } catch (error) {
      openNotificationWithIcon('error', t('Update profile failed.'))
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
        <div>
          <Form.Item<ProfileParams>
            label={t('Avatar')}
            initialValue={user?.avatar}
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
              rules={[
                {
                  message: t('First name should not be empty!'),
                  required: true,
                },
              ]}
            >
              <Input
                size="large"
                className="w-[100%] shadow-sm text-sm hover:border-slate-40 rounded-md"
              />
            </Form.Item>
            <Form.Item<ProfileParams>
              name="lastName"
              label={t('Last Name')}
              className="flex-1"
              rules={[
                {
                  message: t('Last name should not be empty!'),
                  required: true,
                },
              ]}
            >
              <Input
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
                options={gender}
              />
            </Form.Item>
            <Form.Item<ProfileParams> label="Email" className="flex-1">
              <Input
                value={user?.email}
                disabled
                size="large"
                className="text-sm w-[100%] shadow-sm hover:border-slate-40 rounded-md"
              />
            </Form.Item>
          </div>
        </div>
      ),
    },
    {
      key: '2',
      label: t('Change password'),
      children: (
        <div>
          <Form.Item<ProfileParams>
            name="oldPassword"
            label={t('Old password')}
          >
            <Input.Password
              placeholder={t('Enter old password')}
              size="large"
              className="hover:border-slate-40 rounded-md shadow-sm"
            />
          </Form.Item>
          <Form.Item<ProfileParams>
            name="password"
            label={t('New password')}
            rules={[
              {
                required: keyCollapse === '2',
                message: t('Please input your password!'),
              },
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
              placeholder={t('Enter new password')}
              size="large"
              className="hover:border-slate-40 rounded-md shadow-sm"
            />
          </Form.Item>
          <Form.Item<ProfileParams>
            name="retypePassword"
            label={t('Retype password')}
            rules={[
              {
                required: keyCollapse === '2',
                message: t('Please confirm your password!'),
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
              placeholder={t('Enter retype new password')}
              size="large"
              className="hover:border-slate-40 rounded-md shadow-sm"
            />
          </Form.Item>
        </div>
      ),
    },
  ]

  if (user?.role === Role.Teacher) {
    items.push({
      key: '3',
      label: t('Bank information'),
      children: (
        <div>
          <p className="text-base text-gray-800 mb-5">
            {t(
              'Update bank information for receiving payments when students enroll in your courses!',
            )}
          </p>
          <Form.Item<ProfileParams> name="bankName" label={t('Bank name')}>
            <Input
              placeholder={t('Enter your bank name')}
              size="large"
              className="hover:border-slate-40 rounded-md shadow-sm"
            />
          </Form.Item>

          <Form.Item<ProfileParams> name="bankNumber" label={t('Bank number')}>
            <Input
              placeholder={t('Enter your bank number')}
              size="large"
              className="hover:border-slate-40 rounded-md shadow-sm"
            />
          </Form.Item>
        </div>
      ),
    })
  }

  return (
    <div className="h-full">
      {contextHolder}
      <Form
        name="validateOnly"
        layout="vertical"
        autoComplete="off"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={form}
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
