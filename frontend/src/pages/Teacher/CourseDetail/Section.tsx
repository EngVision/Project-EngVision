/* eslint-disable prettier/prettier */
import { Button, Collapse, Form, Tooltip } from 'antd'
import { FormInstance } from 'antd/lib/form/Form'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { Link } from 'react-router-dom'
import {
  MenuIcon,
  PencilLineIcon,
  PlusIcon,
  TrashIcon,
} from '../../../components/Icons'
import CustomInput from '../../../components/common/CustomInput'
import { useMeasure } from '@uidotdev/usehooks'
import { useState } from 'react'

const { Panel } = Collapse

interface SectionProps {
  form: FormInstance
}

const Section = ({ form }: SectionProps) => {
  const [ref, { height }] = useMeasure()
  const [autoFocus, setAutoFocus] = useState(false)

  const onDragEnd = (result: any, move: (from: number, to: number) => void) => {
    if (!result.destination) return

    move(result.source.index, result.destination.index)
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
                            onChange={() => setAutoFocus(false)}
                          >
                            <Panel
                              key={field.key}
                              header={
                                <Form.Item
                                  name={[field.name, 'title']}
                                  className="mb-0 w-full"
                                >
                                  <CustomInput
                                    placeholder="New section"
                                    className="pr-16"
                                  />
                                </Form.Item>
                              }
                              className="!border-dashed border-2 !border-b-2 !border-wolfGrey !rounded-lg"
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
                                          <div
                                            key={subField.key}
                                            className="ml-8 flex"
                                          >
                                            <div className="flex-1 flex items-center gap-2">
                                              <MenuIcon />
                                              <Form.Item
                                                name={[subField.name, 'title']}
                                                className="mb-0 flex-1"
                                              >
                                                <CustomInput
                                                  placeholder="New lesson"
                                                  autoFocus={autoFocus}
                                                />
                                              </Form.Item>
                                            </div>

                                            <div className="flex gap-4 items-center">
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
                                            </div>

                                            <Form.Item
                                              noStyle
                                              name={[
                                                subField.name,
                                                'exercises',
                                              ]}
                                            ></Form.Item>
                                          </div>
                                        )
                                      })}
                                      <div className="flex gap-4 absolute right-0 top-[-48px]">
                                        <Tooltip title="Add lesson">
                                          <div className="flex">
                                            <PlusIcon
                                              onClick={() => {
                                                setAutoFocus(true)
                                                subOpt.add({
                                                  title: 'New lesson',
                                                  exercises: [],
                                                })
                                              }}
                                              className="hover:cursor-pointer"
                                              width={20}
                                              height={20}
                                            />
                                          </div>
                                        </Tooltip>
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
              className="w-full h-10"
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
