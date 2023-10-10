import {
  Avatar,
  Button,
  Divider,
  Form,
  Image,
  Space,
  Upload,
  Switch,
  Select,
} from 'antd'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import type { ProfileParams } from '../../services/accountApi/types'
import authApi from '../../services/authApi'
import { getFileUrl } from '../../utils/common'
import { ROUTES } from '../../utils/constants'
import accountApi from '../../services/accountApi'
import { toggleDarkMode, toggleLocales } from '../../redux/app/slice'
import { useAppDispatch } from '../../hooks/redux'

export const Appearance = () => {
  const [account, setAccount] = useState<ProfileParams>()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const res = await authApi.fetchAuthUser()
        const data = res.data
        if (data) setAccount(data)
      } catch (error) {
        console.error('Error fetching account: ', error)
      }
    }

    fetchAccount()
  }, [])

  const onFinish = async (values: ProfileParams) => {
    if (values.avatar) console.log('Success:', values.avatar)
    try {
      const res = await accountApi.update(values)
      console.log('res: ', res)
      setAccount(res.data)
    } catch (error) {
      throw error
    }
    //window.location.reload()
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const handleChangeTheme = (checked: boolean) => {
    if (checked) {
      dispatch(toggleDarkMode())
    }
  }

  const handleChangeLocales = (value: any) => {
    if (value) {
      dispatch(toggleLocales(value.toString().toLowerCase()))
    }
  }

  return (
    <div>
      <div className="m-6 ">
        <p className="font-bold text-lg">Appearance</p>
        <div className="flex flex-row my-6">
          <p className="mr-5">Dark mode</p>
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            defaultChecked
            onChange={(checked) => handleChangeTheme(checked)}
          />
        </div>
        <div className="flex flex-row">
          <p className="mr-5">Languages</p>
          <Select
            defaultValue="en"
            style={{ width: 120 }}
            onChange={(value) => handleChangeLocales(value)}
            options={[
              { value: 'en', label: 'English' },
              { value: 'vi', label: 'VietNam' },
            ]}
          />
        </div>
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

            <Space className="flex justify-center">
              <Form.Item name="avatar">
                {account?.avatar && (
                  <Image width={300} src={getFileUrl(account?.avatar)} />
                )}
                {!account?.avatar && <Avatar size={300}></Avatar>}

                <Upload
                  action={`${import.meta.env.VITE_BASE_URL}files`}
                  withCredentials
                  maxCount={1}
                  accept="image/*"
                >
                  <Button type="primary" className="h-10 mx-5 bg-[#2563EB]">
                    Change
                  </Button>
                </Upload>
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
