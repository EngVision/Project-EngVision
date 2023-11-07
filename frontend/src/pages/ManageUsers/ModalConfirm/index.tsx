import React from 'react'
import { Form, Input, Modal } from 'antd'
import { ReasonBlock, UserAccount } from '../../../services/accountApi/types'
import { useForm } from 'antd/es/form/Form'

interface ModalConfirmProps {
  isModalOpen: boolean
  user?: UserAccount
  setIsModalOpen: (status: boolean) => void
  blockUserFunc: (userId: string, reason: ReasonBlock) => void
}

const ModalConfirm = ({
  isModalOpen,
  user,
  setIsModalOpen,
  blockUserFunc,
}: ModalConfirmProps) => {
  const [form] = useForm()

  const handleOk = () => {
    form.submit()
  }

  const handleCancel = () => {
    form.resetFields()
    setIsModalOpen(false)
  }

  const onFinish = (values: ReasonBlock) => {
    blockUserFunc(user ? user.id : '', values)
    setIsModalOpen(false)
  }

  return (
    <>
      <Modal
        title={`Why you block ${user?.name}?`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            name="reason"
            rules={[{ required: true, message: 'Please input your reason!' }]}
          >
            <Input.TextArea
              placeholder="Reason"
              autoSize={{ minRows: 2, maxRows: 10 }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default ModalConfirm
