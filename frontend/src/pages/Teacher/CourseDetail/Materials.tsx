import { useForm } from 'antd/lib/form/Form'
import CustomUpload from '../../../components/CustomUpload'
import {
  AddMaterial,
  Material,
  Materials,
  UpdateMaterial,
} from '../../../services/coursesApi/types'
import {
  Button,
  Dropdown,
  MenuProps,
  Image,
  Modal,
  Form,
  Input,
  message,
} from 'antd'
import Table, { ColumnsType } from 'antd/es/table'
import { getFormattedDate } from '../../../utils/common'
import { MoreVerticalIcon } from '../../../components/Icons'
import { MaterialTypes, UPLOAD_FILE_URL } from '../../../utils/constants'
import { useState } from 'react'
import FileWrapper from '../../../components/FileWrapper'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import coursesApi from '../../../services/coursesApi'

interface MaterialsProps {
  materials?: Materials
  courseId: string
}

const Materials = ({ materials, courseId }: MaterialsProps) => {
  const [indexPreviewImages, setIndexPreviewImages] = useState(-1)
  const [type, setType] = useState<MaterialTypes>(MaterialTypes.None)
  const [materialIdEditing, setMaterialIdEditing] = useState('')
  const [form] = useForm()
  const queryClient = useQueryClient()

  const showModal = (type: MaterialTypes, materialEdited?: Material) => {
    setType(type)
    if (materialEdited) {
      form.setFieldValue('fileId', materialEdited.file?.id)
      form.setFieldValue('url', materialEdited.url)
      form.setFieldValue('note', materialEdited.note)
      setMaterialIdEditing(materialEdited.id)
    }
  }

  const handleOk = () => {
    form.submit()
  }

  const handleClose = () => {
    setType(MaterialTypes.None)
    setMaterialIdEditing('')
    form.resetFields()
  }

  const addMaterialMutation = useMutation({
    mutationFn: (material: AddMaterial) =>
      coursesApi.addMaterial(courseId, material),
  })

  const updateMaterialMutation = useMutation({
    mutationFn: (updateMaterial: UpdateMaterial) =>
      coursesApi.updateMaterial(courseId, updateMaterial),
  })

  const removeMaterialMutation = useMutation({
    mutationFn: ({
      materialId,
      type,
    }: {
      materialId: string
      type: MaterialTypes
    }) => coursesApi.removeMaterial(courseId, materialId, type),
  })

  const addMaterial = async (material: AddMaterial) => {
    addMaterialMutation.mutate(material, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['course'] })
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

  const updateMaterial = async (material: UpdateMaterial) => {
    updateMaterialMutation.mutate(material, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['course'] })
        message.open({
          key: 'submitMessage',
          content: 'Update material successfully',
          type: 'success',
        })
        handleClose()
      },
      onError: (error) => {
        console.error('Error updating material:', error)
        message.open({
          key: 'submitMessage',
          content: 'Failed to Update material',
          type: 'error',
        })
      },
    })
  }

  const removeMaterial = async (materialId: string, type: MaterialTypes) => {
    removeMaterialMutation.mutate(
      { materialId, type },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['course'] })
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
      },
    )
  }

  const getFileColumns = (type: MaterialTypes) => {
    const fileColumns: ColumnsType<Material> = [
      {
        title: type === MaterialTypes.Videos ? 'Link' : 'File',
        dataIndex: type === MaterialTypes.Videos ? 'url' : 'file',
        key: 'file',
        render: (file, material) => {
          switch (type) {
            case MaterialTypes.Videos:
              return (
                <a
                  className="underline"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={material.url}
                >
                  {material.url}
                </a>
              )
            case MaterialTypes.Images:
              return (
                <a href="#">
                  <FileWrapper
                    file={file}
                    type={type}
                    onClick={() =>
                      setIndexPreviewImages(
                        materials?.images?.findIndex(
                          (m) => m.id === material.id,
                        ) ?? -1,
                      )
                    }
                  />
                </a>
              )
            default:
              return (
                <a
                  href={`${UPLOAD_FILE_URL}${file?.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FileWrapper
                    file={file}
                    type={type}
                    onClick={() =>
                      setIndexPreviewImages(
                        materials?.images?.findIndex(
                          (m) => m.id === material.id,
                        ) ?? -1,
                      )
                    }
                  />
                </a>
              )
          }
        },
      },
      {
        title: 'Note',
        dataIndex: 'note',
        key: 'note',
      },
      {
        title: 'Create date',
        dataIndex: 'createdAt',
        key: 'createDate',
        render: (date) => {
          return date ? getFormattedDate(date) : ''
        },
      },
      {
        title: (
          <Button type="primary" onClick={() => showModal(type)}>
            Add new
          </Button>
        ),
        key: 'action',
        fixed: 'right',
        width: '100px',
        render: (record) => (
          <a className="flex justify-end">
            <Dropdown
              menu={{
                items: [
                  {
                    key: '1',
                    label: (
                      <p
                        role="presentation"
                        className="flex items-center"
                        onClick={() => {
                          removeMaterial(record.id, type)
                        }}
                      >
                        Delete
                      </p>
                    ),
                  },
                  {
                    key: '2',
                    label: (
                      <p
                        role="presentation"
                        className="flex items-center"
                        onClick={() => {
                          showModal(type, record)
                        }}
                      >
                        Edit
                      </p>
                    ),
                  },
                  {
                    key: '3',
                    label: (
                      <p role="presentation" className="flex items-center">
                        Download
                      </p>
                    ),
                  },
                ] as MenuProps['items'],
              }}
              className=" text-textColor hover:cursor-pointer hover:text-primary rounded-[12px]"
            >
              <span role="presentation">
                <MoreVerticalIcon
                  width={20}
                  height={20}
                  className="cursor-pointer"
                />
              </span>
            </Dropdown>
          </a>
        ),
      },
    ]

    return fileColumns
  }

  const getTypeAccept = () => {
    switch (type) {
      case MaterialTypes.Images:
        return 'image/*'
      case MaterialTypes.Audios:
        return 'audio/*'
      case MaterialTypes.PdfFiles:
        return '.pdf'
      default:
        break
    }
  }

  const onFinish = async (values: any) => {
    if (materialIdEditing) {
      updateMaterial({ ...values, type, id: materialIdEditing })
    } else {
      addMaterial({ ...values, type })
    }
  }

  return (
    <div>
      <h3 className="text-2xl text-primary mb-6">Images</h3>
      <Table
        columns={getFileColumns(MaterialTypes.Images)}
        dataSource={materials?.images.reverse()}
        pagination={{
          defaultPageSize: 5,
          showSizeChanger: true,
        }}
        rowKey="id"
      />
      <h3 className="text-2xl text-primary my-6">Pdf files</h3>
      <Table
        columns={getFileColumns(MaterialTypes.PdfFiles)}
        dataSource={materials?.pdfFiles.reverse()}
        pagination={{
          defaultPageSize: 5,
          showSizeChanger: true,
        }}
        rowKey="id"
      />
      <h3 className="text-2xl text-primary my-6">Audios</h3>
      <Table
        columns={getFileColumns(MaterialTypes.Audios)}
        dataSource={materials?.audios.reverse()}
        pagination={{
          defaultPageSize: 5,
          showSizeChanger: true,
        }}
        rowKey="id"
      />
      <h3 className="text-2xl text-primary my-6">Videos</h3>
      <Table
        columns={getFileColumns(MaterialTypes.Videos)}
        dataSource={materials?.videos.reverse()}
        pagination={{
          defaultPageSize: 5,
          showSizeChanger: true,
        }}
        rowKey="id"
      />
      <Image.PreviewGroup
        preview={{
          visible: indexPreviewImages !== -1,
          current: indexPreviewImages,
          onVisibleChange: () => {
            setIndexPreviewImages(-1)
          },
          onChange: (current) => {
            setIndexPreviewImages(current)
          },
        }}
      >
        {materials?.images.map((material, index) => (
          <Image
            key={index}
            width={0}
            src={`${UPLOAD_FILE_URL}${material?.file?.id}`}
          />
        ))}
      </Image.PreviewGroup>
      <Modal
        title={materialIdEditing ? 'Edit material' : 'Create new material'}
        open={type !== MaterialTypes.None}
        onOk={handleOk}
        onCancel={handleClose}
        okText="Save"
        width={600}
        confirmLoading={addMaterialMutation.isPending}
      >
        <Form
          form={form}
          onFinish={onFinish}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 20 }}
        >
          {type === MaterialTypes.Videos ? (
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
              label="File"
              rules={[
                {
                  required: materialIdEditing ? false : true,
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

          <Form.Item
            name="note"
            label="Note"
            rules={[
              {
                required: true,
                message: 'Please input note!',
              },
            ]}
          >
            <Input.TextArea
              placeholder="Note"
              size="middle"
              className="rounded-[8px] h-[40px]"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Materials
