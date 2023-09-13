import { Button, Form, Input, Space, Divider } from 'antd'
import Axios from 'axios'

export const PersonalInfoForm = () => {
  const { TextArea } = Input

  const onFinish = (values: any) => {
    const apiURL = 'http://[::1]:5000/api/account/update-profile'

    let promise = Axios({
      url: apiURL,
      method: 'PATCH',
    })
    promise.then((res) => {
      alert(res.data.message)
    })
    promise.catch((err) => {
      alert(err.response.data)
    })
    console.log('Success:', values)
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
            <Form.Item name="firstName" label="First Name">
              <Input className="w-[18rem] border-slate-300 hover:border-slate-40 rounded-md" />
            </Form.Item>
            <Form.Item name="lastName" label="Last Name">
              <Input className="w-[18rem] border-slate-300 hover:border-slate-40 rounded-md" />
            </Form.Item>
          </Space>
          <Form.Item name="email" label="Email">
            <Input className="w-[18rem] border-slate-300 hover:border-slate-40 rounded-md" />
          </Form.Item>
          <Form.Item name="about" label="About">
            <TextArea
              style={{ height: 80, resize: 'none' }}
              className="border-slate-300 hover:border-slate-40 rounded-md"
            />
          </Form.Item>
        </div>

        <div className="m-6">
          <p className="font-medium text-xl mt-12 mb-6">Personal Information</p>
          <Space className="flex justify-between">
            <Form.Item name="gender" label="Gender">
              <Input className="w-[18rem] border-slate-300 hover:border-slate-40 rounded-md" />
            </Form.Item>
            <Form.Item name="phoneNumber" label="Phone Number">
              <Input className="w-[18rem] border-slate-300 hover:border-slate-40 rounded-md" />
            </Form.Item>
          </Space>
          <Space className="flex justify-between">
            <Form.Item name="country" label="Country">
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
