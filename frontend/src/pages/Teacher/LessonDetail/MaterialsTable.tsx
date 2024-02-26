import {
  Button,
  Form,
  Input,
  Modal,
  Popover,
  Select,
  Table,
  message,
  Image,
} from 'antd'
import { useState } from 'react'
import { BarsIcon } from '../../../components/Icons'
import { useParams } from 'react-router-dom'
import coursesApi from '../../../services/coursesApi'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { File } from '../../../services/coursesApi/types'
import FileWrapper from '../../../components/FileWrapper'
import { MaterialTypes, UPLOAD_FILE_URL } from '../../../utils/constants'
import { ColumnsType } from 'antd/es/table'
import { useForm } from 'antd/es/form/Form'
import CustomUpload from '../../../components/CustomUpload'
import fileApi from '../../../services/fileApi'

interface MaterialsTableProps {
  materials: File[]
}

const MaterialsTable = ({ materials }: MaterialsTableProps) => {
  const { lessonId = '' } = useParams()
  const queryClient = useQueryClient()
  const [type, setType] = useState<MaterialTypes>(MaterialTypes.None)
  const [form] = useForm()
  const [imagePreview, setImagePreview] = useState('')

  const createMaterialMutation = useMutation({
    mutationFn: (fileId: string) => coursesApi.createMaterial(lessonId, fileId),
  })

  const deleteMaterialMutation = useMutation({
    mutationFn: (fileId: string) => coursesApi.deleteMaterial(lessonId, fileId),
  })

  const createMaterial = async (fileId: string) => {
    createMaterialMutation.mutate(fileId, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['lesson'] })
        message.open({
          key: 'submitMessage',
          content: 'Add material successfully',
          type: 'success',
        })
        handleClose()
      },
      onError: (error) => {
        console.error('Error adding material:', error)
        message.open({
          key: 'submitMessage',
          content: 'Failed to add material',
          type: 'error',
        })
      },
    })
  }

  const deleteMaterial = async (fileId: string) => {
    deleteMaterialMutation.mutate(fileId, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['lesson'] })
        message.open({
          key: 'submitMessage',
          content: 'Remove material successfully',
          type: 'success',
        })
        handleClose()
      },
      onError: (error) => {
        console.error('Error removing material:', error)
        message.open({
          key: 'submitMessage',
          content: 'Failed to remove material',
          type: 'error',
        })
      },
    })
  }

  const columns: ColumnsType<File> = [
    {
      title: 'Material',
      key: 'material',
      className: '!px-6 !py-6',
      render: (_, file) => {
        if (file.url) {
          return (
            <a
              className="underline text-base"
              target="_blank"
              rel="noopener noreferrer"
              href={file.url}
            >
              {file.url}
            </a>
          )
        } else if (file.mimetype.startsWith('image/')) {
          return (
            <a href="#" className="block max-w-[300px]">
              <FileWrapper
                file={file}
                onClick={() => setImagePreview(UPLOAD_FILE_URL + file.id)}
              />
            </a>
          )
        } else {
          return (
            <a
              href={`${UPLOAD_FILE_URL}${file?.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block max-w-[300px]"
            >
              <FileWrapper file={file} />
            </a>
          )
        }
      },
    },

    {
      title: (
        <Button
          type="primary"
          className="float-right"
          onClick={() => setType(MaterialTypes.Image)}
        >
          Add new
        </Button>
      ),
      width: '140px',
      className: '!px-6 !py-6',
      render: (_, file) => (
        <Popover
          content={
            <div className="flex flex-col gap-1 py-2 min-w-[100px]">
              <Button
                type="text"
                className="w-full text-left"
                onClick={async () => deleteMaterial(file.id)}
                loading={deleteMaterialMutation.isPending}
              >
                Delete
              </Button>
            </div>
          }
          trigger="click"
          placement="bottomRight"
        >
          <BarsIcon
            className="float-right hover:cursor-pointer"
            width={20}
            height={20}
          />
        </Popover>
      ),
    },
  ]

  const handleOk = () => {
    form.submit()
  }

  const handleClose = () => {
    form.resetFields()
    setType(MaterialTypes.None)
  }

  const getTypeAccept = () => {
    switch (type) {
      case MaterialTypes.Image:
        return 'image/*'
      case MaterialTypes.Audio:
        return 'audio/*'
      case MaterialTypes.Pdf:
        return '.pdf'
      default:
        break
    }
  }

  const handleSelectChange = (value: MaterialTypes) => {
    setType(value)
  }

  const onFinish = async (values: any) => {
    if (values.url) {
      const res = await fileApi.createWithUrl(values.url)
      createMaterial(res.data.fileId)
    } else createMaterial(values.fileId)
  }

  return (
    <div>
      <h4 className="mb-4 mt-5 text-2xl">Materials</h4>
      <Table
        rowKey="id"
        dataSource={materials}
        columns={columns}
        pagination={false}
        className="rounded-lg overflow-hidden"
      />
      <Modal
        title={'Create new material'}
        open={type !== MaterialTypes.None}
        onOk={handleOk}
        onCancel={handleClose}
        okText="Save"
        width={600}
        confirmLoading={createMaterialMutation.isPending}
      >
        <Form
          form={form}
          onFinish={onFinish}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 20 }}
        >
          <Form.Item label="Type">
            <Select
              value={type}
              style={{ width: 105 }}
              onChange={handleSelectChange}
              options={[
                { value: MaterialTypes.Image, label: MaterialTypes.Image },
                { value: MaterialTypes.Pdf, label: MaterialTypes.Pdf },
                { value: MaterialTypes.Audio, label: MaterialTypes.Audio },
                { value: MaterialTypes.Link, label: MaterialTypes.Link },
              ]}
            />
          </Form.Item>

          {type === MaterialTypes.Link ? (
            <Form.Item
              name="url"
              label="Link youtube"
              rules={[
                {
                  required: true,
                  message: 'Please input link!',
                },
              ]}
            >
              <Input.TextArea
                placeholder="Link"
                size="middle"
                className="rounded-[8px] h-[40px]"
              />
            </Form.Item>
          ) : (
            <Form.Item
              name="fileId"
              label={'File ' + type.toLowerCase()}
              rules={[
                {
                  required: true,
                  message: 'Please select file!',
                },
              ]}
            >
              <CustomUpload
                type="picture"
                accept={getTypeAccept()}
                onRemove={() => form.setFieldValue('fileId', '')}
              />
            </Form.Item>
          )}
        </Form>
      </Modal>
      <Image
        style={{ display: 'none' }}
        preview={{
          visible: !!imagePreview,
          src: imagePreview,
          onVisibleChange: () => {
            setImagePreview('')
          },
        }}
      />
    </div>
  )
}

export default MaterialsTable
