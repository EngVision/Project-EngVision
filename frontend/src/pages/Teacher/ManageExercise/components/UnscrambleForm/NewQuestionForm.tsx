import { Button, Form, Modal, Tooltip } from 'antd'
import { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { PlusIcon, TrashIcon } from '../../../../../components/Icons'
import CustomInput from '../../../../../components/common/CustomInput'
import UnscrambleSettings from './UnscrambleSettings'
import CustomUpload from '../../../../../components/CustomUpload'
import { ExerciseCardType } from '../../../../../utils/constants'
import { useMeasure } from '@uidotdev/usehooks'
import { useTranslation } from 'react-i18next'

type NewQuestionFormProps = {
  index: number
}

const NewQuestionForm = ({ index }: NewQuestionFormProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'ManageExercise' })
  const [ref, { height }] = useMeasure()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const content = Form.useWatch('content')
  const items = content?.[index]?.items || []
  const exerciseType = content?.[index]?.exerciseType || ExerciseCardType.Text

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const onDragEnd = (result: any, move: (from: number, to: number) => void) => {
    if (!result.destination) return

    move(result.source.index, result.destination.index)
  }

  return (
    <>
      <div
        className="flex justify-between bg-white px-3 py-2 border border-bgNeutralHover border-solid rounded-lg mb-4 hover:cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="font-semibold text-primary hover:cursor-pointer">
          {items.length === 0
            ? t('Add card')
            : `${t('Edit')} ${items.length} ${t('card')}`}
        </div>
      </div>

      <Modal
        title={
          <h4 className="text-xl">
            {t('Question')} {index + 1}
          </h4>
        }
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        className="min-w-[800px]"
        footer={() => (
          <>
            <Button type="primary" onClick={handleOk}>
              {t('Confirm')}
            </Button>
          </>
        )}
      >
        <div className="flex gap-4 mt-6 min-h-[400px]">
          <Form.List name={[index, 'items']}>
            {(fields, { add, move, remove }) => (
              <div className="flex-1 flex flex-col gap-2">
                <h4 className="text-sm uppercase text-wolfGrey">
                  {t('Your card')}
                </h4>

                <>
                  <DragDropContext
                    onDragEnd={(result) => onDragEnd(result, move)}
                  >
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
                                  <div
                                    ref={isDragging ? ref : null}
                                    className="flex justify-between items-center gap-4 border border-primary border-solid p-3 rounded-lg"
                                  >
                                    {exerciseType === ExerciseCardType.Text ? (
                                      <Form.Item
                                        name={[field.name]}
                                        className="mb-0 w-full"
                                      >
                                        <CustomInput placeholder="New card" />
                                      </Form.Item>
                                    ) : (
                                      <Form.Item
                                        valuePropName="fileList"
                                        name={[field.name]}
                                        className="mb-0 w-full"
                                      >
                                        <CustomUpload type="picture-card" />
                                      </Form.Item>
                                    )}
                                    <Tooltip
                                      title="Delete card"
                                      placement="bottom"
                                    >
                                      <div>
                                        <TrashIcon
                                          width={20}
                                          height={20}
                                          onClick={() => remove(field.name)}
                                          className="cursor-pointer"
                                        />
                                      </div>
                                    </Tooltip>
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {isUsingPlaceholder && (
                            <div
                              className="w-full"
                              style={{ height: Number(height) }}
                            >
                              &nbsp;
                            </div>
                          )}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>

                  <Form.Item>
                    <Button
                      onClick={() => add('New card')}
                      type="primary"
                      className="w-full h-10 flex items-center justify-center"
                      icon={<PlusIcon width={16} height={16} />}
                    >
                      <div className="mt-0.5">{t('Add new card')}</div>
                    </Button>
                  </Form.Item>
                </>
              </div>
            )}
          </Form.List>

          <UnscrambleSettings index={index} />
        </div>
      </Modal>
    </>
  )
}

export default NewQuestionForm
