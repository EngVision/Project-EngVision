import { Button, Collapse, Form, Space, Tooltip } from 'antd'
import {
  MenuIcon,
  PencilLineIcon,
  PlusIcon,
  TrashIcon,
} from '../../../../components/Icons'
import CustomInput from '../../../../components/common/CustomInput'

const { Panel } = Collapse

interface SectionProps {
  form: any
}

const Section = ({ form }: SectionProps) => {
  return (
    <Form.List name="sections">
      {(fields, { add, remove }) => (
        <>
          <Collapse
            bordered={false}
            expandIcon={({ isActive }) => (
              <MenuIcon className={isActive ? '' : 'opacity-40'} />
            )}
          >
            {fields.map((field) => (
              <Panel
                key={field.key}
                header={
                  <Form.Item
                    name={[field.name, 'title']}
                    className="mb-0 w-fit"
                  >
                    <CustomInput placeholder="New section" />
                  </Form.Item>
                }
                className="mb-4 !border-dashed border-2 !border-b-2 !border-gray-300 !rounded-lg"
              >
                <Form.Item>
                  <Form.List name={[field.name, 'lessons']}>
                    {(subFields, subOpt) => (
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          rowGap: 16,
                        }}
                      >
                        {subFields.map((subField) => (
                          <Space
                            key={subField.key}
                            className="ml-8 flex justify-between"
                          >
                            <div className="flex items-center gap-2">
                              <MenuIcon />
                              <Form.Item
                                noStyle
                                name={[subField.name, 'title']}
                              >
                                <CustomInput placeholder="New lesson" />
                              </Form.Item>
                            </div>

                            <div className="flex gap-4">
                              <Tooltip title="Edit lesson">
                                <div className="flex">
                                  <PencilLineIcon
                                    className="hover:cursor-pointer"
                                    width={20}
                                    height={20}
                                  />
                                </div>
                              </Tooltip>

                              <Tooltip title="Delete lesson">
                                <div className="flex">
                                  <TrashIcon
                                    onClick={() => {
                                      subOpt.remove(subField.name)
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
                              name={[subField.name, 'exercises']}
                            >
                              {JSON.stringify(
                                form.getFieldValue(
                                  'sections[field.name].lessons[subField.name].exercises',
                                ),
                              )}
                            </Form.Item>
                          </Space>
                        ))}
                        <div className="flex gap-4 absolute right-0 top-[-48px]">
                          <Tooltip title="Add lesson">
                            <div className="flex">
                              <PlusIcon
                                onClick={() =>
                                  subOpt.add({
                                    title: 'New lesson',
                                    exercises: [],
                                  })
                                }
                                className="hover:cursor-pointer"
                                width={20}
                                height={20}
                              />
                            </div>
                          </Tooltip>
                          <Tooltip title="Edit section">
                            <div className="flex">
                              <PencilLineIcon
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
            ))}
          </Collapse>
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
