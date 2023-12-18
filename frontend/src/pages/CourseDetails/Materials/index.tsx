import { Material, Materials } from '../../../services/coursesApi/types'
import { Dropdown, MenuProps, Image } from 'antd'
import Table, { ColumnsType } from 'antd/es/table'
import { getFormattedDate } from '../../../utils/common'
import { MoreVerticalIcon } from '../../../components/Icons'
import { MaterialTypes, UPLOAD_FILE_URL } from '../../../utils/constants'
import { useState } from 'react'
import FileWrapper from '../../../components/FileWrapper'

interface MaterialsProps {
  materials?: Materials
}

const Materials = ({ materials }: MaterialsProps) => {
  const [indexPreviewImages, setIndexPreviewImages] = useState(-1)

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
        title: 'Action',
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
                          console.log(record)
                        }}
                      >
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
    </div>
  )
}

export default Materials
