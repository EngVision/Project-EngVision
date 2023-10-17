import { Button, Modal, Upload, UploadFile, UploadProps, message } from 'antd'
import { useEffect, useState } from 'react'
import fileApi from '../../services/fileApi'
import { getFileUrl } from '../../utils/common'
import { UploadOutlined } from '@ant-design/icons'

const MAX_COUNT = 20

interface CustomUploadProps {
  fileList?: string[] | string
  onChange?: (value: any) => void
  multiple?: boolean
  type?: UploadProps['listType']
  accept?: 'image' | 'audio' | 'video'
  className?: string
}

function CustomUpload({
  className,
  fileList: value,
  onChange,
  type = 'text',
  multiple = false,
  accept = 'image',
}: CustomUploadProps) {
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [currFileId, setCurrFileId] = useState<string | null>(null)

  useEffect(() => {
    if (value) {
      const initialValue: UploadFile[] = []
      if (Array.isArray(value)) {
        initialValue.push(
          ...value.map((v) => ({
            uid: v,
            name: v,
            url: getFileUrl(v),
          })),
        )
      } else {
        initialValue.push({
          uid: value,
          name: value,
          url: getFileUrl(value),
        })
        setCurrFileId(value)
      }

      setFileList(initialValue)
    }
  }, [value])

  const handleCancel = () => setPreviewOpen(false)

  const handlePreview = async (file: UploadFile) => {
    if (!file.url) {
      file.url = getFileUrl(file.uid)
    }

    setPreviewImage(file.url)
    setPreviewOpen(true)
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1),
    )
  }

  const handleChange: UploadProps['onChange'] = ({
    fileList: newFileList,
    file,
  }) => {
    try {
      const { status } = file

      if (status === 'done') {
        const { fileId } = file.response.data
        file.uid = fileId
        file.url = getFileUrl(file.uid)
        setCurrFileId(fileId)

        onChange?.(
          multiple
            ? newFileList.map((file) => file.uid)
            : file.status === 'done'
            ? file.uid
            : null,
        )

        message.success(`${file.name} uploaded.`)
      } else if (status === 'error') {
        if (!multiple && currFileId) {
          newFileList.push({
            uid: currFileId,
            name: currFileId,
            url: getFileUrl(currFileId),
          })
        }
        message.error(`${file.name} upload failed. (${file.error.message})`)
      }

      const resList = newFileList.filter((file) => file.status !== 'error')

      setFileList(resList)
    } catch (error) {
      message.error(String(error))
    }
  }

  const handleRemove: UploadProps['onRemove'] = async (file) => {
    try {
      await fileApi.delete(file.uid)

      setCurrFileId(null)
      message.success(`${file.name} removed.`)
    } catch (error) {
      message.error(`${file.name} remove failed. (${String(error)})`)
    }
  }

  const uploadFile: UploadProps['customRequest'] = async (options) => {
    const { onSuccess, onError, file, onProgress } = options

    try {
      let res
      if (multiple || !currFileId || (!multiple && value)) {
        res = await fileApi.create(file, onProgress)
      } else {
        res = await fileApi.update(currFileId, file, onProgress)
      }

      onSuccess?.(res)
    } catch (err) {
      onError?.({
        status: err.status,
        url: err.request.responseURL,
        method: err.config.method,
        name: err.statusText,
        message: err.data.message,
      })
    }
  }

  const uploadButton = () => {
    switch (type) {
      case 'text':
      case 'picture':
        return <Button icon={<UploadOutlined />}>Upload</Button>
      default:
        return (
          <div className="flex flex-col items-center gap-1">
            <UploadOutlined />
            <div>Upload</div>
          </div>
        )
    }
  }

  return (
    <>
      <Upload
        className={className}
        name="file"
        listType={type}
        accept={`${accept}/*`}
        maxCount={multiple ? MAX_COUNT : 1}
        multiple={multiple}
        fileList={fileList}
        onChange={handleChange}
        customRequest={uploadFile}
        onPreview={handlePreview}
        onRemove={handleRemove}
      >
        {uploadButton()}
      </Upload>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
        destroyOnClose
      >
        <img
          alt="upload-preview"
          className="w-full"
          src={`${previewImage}?${Math.random()}`}
        />
      </Modal>
    </>
  )
}

export default CustomUpload
