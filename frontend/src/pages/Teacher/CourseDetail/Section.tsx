/* eslint-disable prettier/prettier */
import { ExportOutlined, ImportOutlined } from '@ant-design/icons'
import { useQueryClient } from '@tanstack/react-query'
import { useMeasure } from '@uidotdev/usehooks'
import {
  Button,
  Collapse,
  Dropdown,
  Form,
  FormListOperation,
  Space,
  Tooltip,
  Upload,
  message,
} from 'antd'
import { UploadChangeParam } from 'antd/es/upload'
import { MenuProps, UploadFile } from 'antd/lib'
import { FormInstance, useWatch } from 'antd/lib/form/Form'
import { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { Link, useParams } from 'react-router-dom'
import {
  MenuIcon,
  PencilLineIcon,
  PlusIcon,
  TrashIcon,
} from '../../../components/Icons'
import CustomInput from '../../../components/common/CustomInput'
import authApi from '../../../services/authApi'
import { lessonApi } from '../../../services/lessonApi'
import AddLessonModel from './AddLessonModel'

const { Panel } = Collapse

interface SectionProps {
  form: FormInstance
}

const Section = ({ form }: SectionProps) => {
  const { courseId = '' } = useParams()
  const isCurriculum = useWatch('isCurriculum', form)
  const [ref, { height }] = useMeasure()
  const [autoFocus, setAutoFocus] = useState(false)
  const [isModelOpen, setIsModelOpen] = useState(false)
  const [currentSectionId, setCurrentSectionId] = useState<string>('')
  const queryClient = useQueryClient()

  const getAddLessonMenu = (
    subOpt: FormListOperation,
    sectionId: string,
  ): MenuProps['items'] => {
    return [
      {
        key: 'add-new',
        label: (
          <div
            onClick={() => {
              setAutoFocus(true)
              subOpt.add({
                title: 'New lesson',
                exercises: [],
              })
            }}
          >
            Add new
          </div>
        ),
      },
      {
        key: 'add-existing',
        label: (
          <div
            onClick={() => {
              setIsModelOpen(true)
              setCurrentSectionId(sectionId)
            }}
          >
            Add existing
          </div>
        ),
      },
    ]
  }

  const onDragEnd = (result: any, move: (from: number, to: number) => void) => {
    if (isCurriculum) return
    if (!result.destination) return

    move(result.source.index, result.destination.index)
  }

  const importLesson = async (
    info: UploadChangeParam<UploadFile<any>>,
    sectionId: string,
  ) => {
    const reader = new FileReader()
    reader.readAsText(info.file.originFileObj!)
    reader.onload = async () => {
      const data = JSON.parse(reader.result as string)

      try {
        await lessonApi.importLesson(courseId, sectionId, data)
        message.success('Import lesson successfully')
      } catch (error) {
        message.error('Import lesson failed')
      }

      queryClient.invalidateQueries({ queryKey: ['course'] })
    }
  }

  const exportLesson = async (lessonId: string) => {
    await authApi.refreshToken()
    window.open(
      `${import.meta.env.VITE_BASE_URL}lessons/${lessonId}/export`,
      '_self',
    )
  }

  return (
    <Form.List name="sections">
      {(fields, { add, move, remove }) => (
        <>
          <DragDropContext onDragEnd={(result) => onDragEnd(result, move)}>
            <Droppable droppableId="droppable">
              {(dropProvided, { isUsingPlaceholder }) => (
                <div
                  ref={dropProvided.innerRef}
                  {...dropProvided.droppableProps}
                  className="flex flex-col gap-4 mb-4"
                >
                  {fields.map((field, index) => (
                    <Draggable
                      key={index}
                      draggableId={index.toString()}
                      index={index}
                    >
                      {(dragProvided, { isDragging }) => (
                        <div
                          ref={dragProvided.innerRef}
                          {...dragProvided.draggableProps}
                          {...dragProvided.dragHandleProps}
                        >
                          <Collapse
                            ref={isDragging ? ref : null}
                            bordered={false}
                            expandIcon={({ isActive }) => (
                              <MenuIcon
                                className={isActive ? '' : 'opacity-40'}
                              />
                            )}
                            defaultActiveKey={['0']}
                          >
                            <Panel
                              key={field.key}
                              header={
                                <Form.Item
                                  name={[field.name, 'title']}
                                  className="mb-0 w-fit"
                                >
                                  <CustomInput
                                    placeholder="New section"
                                    disabled={isCurriculum}
                                  />
                                </Form.Item>
                              }
                              className="mb-4 !border-dashed border-2 !border-b-2 !border-gray-300 !rounded-lg"
                            >
                              <Form.Item>
                                <Form.List name={[field.name, 'lessons']}>
                                  {(subFields, subOpt) => (
                                    <div className="flex flex-col gap-4">
                                      {subFields.map((subField) => {
                                        const lessonId =
                                          form.getFieldValue('sections')[
                                            field.name
                                          ].lessons[subField.name].id

                                        return (
                                          <Space
                                            key={subField.key}
                                            className="ml-8 flex justify-between"
                                          >
                                            <div className="flex-1 flex items-center gap-2">
                                              <MenuIcon />
                                              <Form.Item
                                                noStyle
                                                name={[subField.name, 'title']}
                                              >
                                                <CustomInput
                                                  placeholder="New lesson"
                                                  autoFocus={autoFocus}
                                                />
                                              </Form.Item>
                                            </div>

                                            <div className="flex gap-4">
                                              {lessonId ? (
                                                <Tooltip title="Edit lesson">
                                                  <Link
                                                    to={`lessons/${lessonId}`}
                                                  >
                                                    <PencilLineIcon
                                                      className="hover:cursor-pointer"
                                                      width={20}
                                                      height={20}
                                                    />
                                                  </Link>
                                                </Tooltip>
                                              ) : (
                                                <Tooltip title="Please save the course to edit this lesson">
                                                  <div className="flex">
                                                    <PencilLineIcon
                                                      className="opacity-40 hover:cursor-not-allowed"
                                                      width={20}
                                                      height={20}
                                                    />
                                                  </div>
                                                </Tooltip>
                                              )}
                                              <Tooltip title="Delete lesson">
                                                <div className="flex">
                                                  <TrashIcon
                                                    onClick={() => {
                                                      subOpt.remove(
                                                        subField.name,
                                                      )
                                                    }}
                                                    className="hover:cursor-pointer"
                                                    width={20}
                                                    height={20}
                                                  />
                                                </div>
                                              </Tooltip>

                                              <Tooltip title="Export lesson">
                                                <div
                                                  className="flex"
                                                  onClick={() =>
                                                    exportLesson(lessonId)
                                                  }
                                                >
                                                  <ExportOutlined
                                                    className={
                                                      lessonId
                                                        ? 'hover:cursor-pointer'
                                                        : 'opacity-40 hover:cursor-not-allowed'
                                                    }
                                                    width={20}
                                                    height={20}
                                                  />
                                                </div>
                                              </Tooltip>
                                            </div>

                                            <Form.Item
                                              noStyle
                                              name={[
                                                subField.name,
                                                'exercises',
                                              ]}
                                            ></Form.Item>
                                          </Space>
                                        )
                                      })}
                                      <div className="flex gap-4 absolute right-0 top-[-48px]">
                                        <Tooltip title="Add lesson">
                                          <Dropdown
                                            menu={{
                                              items: getAddLessonMenu(
                                                subOpt,
                                                form.getFieldValue('sections')[
                                                  field.name
                                                ].id,
                                              ),
                                            }}
                                            trigger={['click']}
                                          >
                                            <div className="flex">
                                              <PlusIcon
                                                className="hover:cursor-pointer"
                                                width={20}
                                                height={20}
                                              />
                                            </div>
                                          </Dropdown>
                                        </Tooltip>
                                        {isModelOpen && (
                                          <AddLessonModel
                                            isOpen={isModelOpen}
                                            setIsOpen={setIsModelOpen}
                                            sectionId={currentSectionId}
                                          />
                                        )}
                                        {!isCurriculum && (
                                          <Tooltip title="Delete section">
                                            <div className="flex">
                                              <TrashIcon
                                                onClick={() => {
                                                  remove(field.name)
                                                }}
                                                className="hover:cursor-pointer"
                                                width={20}
                                                height={20}
                                              />
                                            </div>
                                          </Tooltip>
                                        )}
                                        <Upload
                                          customRequest={({ onSuccess }) =>
                                            onSuccess?.('ok')
                                          }
                                          accept=".json"
                                          showUploadList={false}
                                          onChange={(info) => {
                                            if (info.file.status === 'done') {
                                              importLesson(
                                                info,
                                                form.getFieldValue('sections')[
                                                  field.name
                                                ].id,
                                              )
                                            }
                                          }}
                                        >
                                          <Tooltip title="Import lesson">
                                            <div className="flex">
                                              <ImportOutlined
                                                className={
                                                  'hover:cursor-pointer'
                                                }
                                                width={20}
                                                height={20}
                                              />
                                            </div>
                                          </Tooltip>
                                        </Upload>
                                      </div>
                                    </div>
                                  )}
                                </Form.List>
                              </Form.Item>
                            </Panel>
                          </Collapse>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {isUsingPlaceholder && (
                    <div className="w-full" style={{ height: height || 0 }}>
                      &nbsp;
                    </div>
                  )}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          <Form.Item>
            <Button
              onClick={() =>
                add({
                  title: 'New section',
                  lessons: [],
                })
              }
              type="primary"
              className="mt-4 w-full h-10"
              disabled={isCurriculum}
            >
              Add section
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  )
}

export default Section
