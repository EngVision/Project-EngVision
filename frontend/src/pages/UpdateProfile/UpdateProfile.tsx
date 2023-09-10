import { Button, Form, Input, Space, Divider } from 'antd'
import accountApi from '../../services/accountApi'
import { ProfileParams } from '../../services/accountApi/types'

export const UpdateProfile = () => {
  const { TextArea } = Input

  const onFinish = async (values: ProfileParams) => {
    console.log('Success:', values)
    try {
      const {
        data: { firstName, lastName, email, about, gender, phone, contry },
      } = await accountApi.update(values)
    } catch (error) {
      throw error
    }
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
              <Input className="w-[18rem] border-slate-300 hover:border-slate-40 rounded-md" />
            </Form.Item>
            <Form.Item<ProfileParams> name="lastName" label="Last Name">
              <Input className="w-[18rem] border-slate-300 hover:border-slate-40 rounded-md" />
            </Form.Item>
          </Space>
          <Form.Item<ProfileParams> name="email" label="Email">
            <Input className="w-[18rem] border-slate-300 hover:border-slate-40 rounded-md" />
          </Form.Item>
          <Form.Item<ProfileParams> name="about" label="About">
            <TextArea
              style={{ height: 80, resize: 'none' }}
              className="border-slate-300 hover:border-slate-40 rounded-md"
            />
          </Form.Item>
        </div>

        <div className="m-6">
          <p className="font-medium text-xl mt-12 mb-6">Personal Information</p>
          <Space className="flex justify-between">
            <Form.Item<ProfileParams> name="gender" label="Gender">
              <Input className="w-[18rem] border-slate-300 hover:border-slate-40 rounded-md" />
            </Form.Item>
            <Form.Item<ProfileParams> name="phone" label="Phone Number">
              <Input className="w-[18rem] border-slate-300 hover:border-slate-40 rounded-md" />
            </Form.Item>
          </Space>
          <Space className="flex justify-between">
            <Form.Item<ProfileParams> name="country" label="Country">
              <Input className="w-[18rem] border-slate-300 hover:border-slate-40 rounded-md" />
            </Form.Item>
            <Form.Item name="preferLanguage" label="Prefer Language">
              <Input className="w-[18rem] border-slate-300 hover:border-slate-40 rounded-md" />
            </Form.Item>
          </Space>
        </div>

        <div className="m-6">
          <Divider className="mt-12 mb-6" />
          <Space className="flex justify-end">
            <Button className="h-10 w-20">Cancel</Button>
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
    </div>
  )
}
