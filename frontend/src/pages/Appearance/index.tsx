import { Avatar, Button, Divider, Form, Image, Space, Upload } from 'antd'
import type { UploadProps } from 'antd/lib/upload'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import accountApi from '../../services/accountApi'
import type { ProfileParams } from '../../services/accountApi/types'
import authApi from '../../services/authApi'
import fileApi from '../../services/fileApi'
import { getFileUrl } from '../../utils/common'
import { PRIVATE_ROUTES } from '../../utils/constants'

export const Appearance = () => {
  const [account, setAccount] = useState<ProfileParams | null>(null)
  const [fileList, setFileList] = useState<any[]>([])

  const handleChange = async (info: any) => {
    console.log(info.file)
    const file = await fileApi.postFile(info.file)
  }

  const props: UploadProps = {
    name: 'file',
    onChange(info) {
      handleChange(info)
    },
  }

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

  const onFinish = async () => {
    try {
      if (fileList.length > 0) {
        const file = await fileApi.postFile(fileList[0])
        console.log(file)
        await accountApi.update(file.data.id)
      }
    } catch (error) {
      throw error
    }
    window.location.reload()
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div>
      <div className="m-6 ">
        <p className="font-bold text-lg">Appearance</p>
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

            {account && (
              <Space className="flex justify-center">
                <Form.Item name="avatar">
                  {account?.avatar && (
                    <Image
                      className="rounded-full"
                      width={300}
                      src={getFileUrl(account?.avatar)}
                    />
                  )}
                  {!account?.avatar && <Avatar size={300}></Avatar>}
                </Form.Item>

                <Upload {...props}>
                  <Button type="primary" className="h-10 mx-5 bg-[#2563EB]">
                    Change
                  </Button>
                </Upload>
              </Space>
            )}
          </div>
          <div className="m-6">
            <Divider className="mt-12 mb-6" />
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
