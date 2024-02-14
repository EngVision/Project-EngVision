import { Form } from 'antd'
import { useEffect } from 'react'
import {
  QuestionPayload,
  SubmitAnswerResponse,
} from '../../../../services/exerciseApi/types'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import PreviewInput from '../../../../components/common/PreviewInput'
import { ExerciseCardType, UPLOAD_FILE_URL } from '../../../../utils/constants'
import CustomImage from '../../../../components/common/CustomImage'

interface UnscrambleProps extends QuestionPayload {
  question: {
    items: string[]
    image?: string
    audio?: string
    isUnscrambleByText: boolean
  }
  exerciseId?: string
  result?: UnscrambleResponse
  setIsSubmittable: (value: boolean) => void
}

interface UnscrambleResponse extends SubmitAnswerResponse {
  answer: string[]
  correctAnswer: string[]
}

function Unscramble(props: UnscrambleProps) {
  const { question, result, setIsSubmittable } = props
  const exerciseType = question.isUnscrambleByText
    ? ExerciseCardType.Text
    : ExerciseCardType.Image

  const form = Form.useFormInstance()
  const answer = Form.useWatch('answer') || []

  const onDragEnd = (r: any, move: (from: number, to: number) => void) => {
    if (!r.destination) return
    move(r.source.index, r.destination.index)
  }

  useEffect(() => {
    if (result) {
      form.setFieldValue('answer', result.answer)
    } else {
      setTimeout(() => setIsSubmittable(true))
      form.setFieldValue('answer', question.items)
    }
  }, [question])

  return (
    <div>
      <h4 className="text-primary mb-5 text-lg">
        Drag and drop to rearrange these work to form a correct sentence
      </h4>
      <Form.List name="answer" initialValue={question.items}>
        {(fields, { move }) => (
          <DragDropContext onDragEnd={(result) => onDragEnd(result, move)}>
            <Droppable droppableId="droppable" direction="horizontal">
              {(dropProvided) => (
                <div
                  ref={dropProvided.innerRef}
                  {...dropProvided.droppableProps}
                  className="flex justify-center gap-4 mb-4 flex-wrap border border-primary border-dashed p-10 rounded-lg"
                  style={{ pointerEvents: result ? 'none' : 'unset' }}
                >
                  {fields.map((field, index) => {
                    const isSubmitAnswer = result && result.answer
                    const isCorrectAnswer =
                      result &&
                      result.answer[index] === result.correctAnswer[index]

                    return (
                      <Draggable
                        key={index}
                        draggableId={index.toString()}
                        index={index}
                      >
                        {(dragProvided) => (
                          <div
                            ref={dragProvided.innerRef}
                            {...dragProvided.draggableProps}
                            {...dragProvided.dragHandleProps}
                            className="flex flex-col gap-2 items-center"
                          >
                            <div
                              className={`border border-primary border-solid p-2 rounded-lg w-40 flex flex-col gap-2 justify-center items-center ${
                                isSubmitAnswer
                                  ? isCorrectAnswer
                                    ? 'bg-green-400 !border-green-400'
                                    : 'bg-red-400 !border-red-400'
                                  : 'border-primary'
                              }`}
                            >
                              <Form.Item name={[field.name]} noStyle>
                                {exerciseType === ExerciseCardType.Text ? (
                                  <PreviewInput className="w-full text-center" />
                                ) : (
                                  <CustomImage
                                    className="hidden lg:block object-cover w-20 h-20 rounded-md"
                                    src={`${UPLOAD_FILE_URL}${
                                      answer[field.name]
                                    }`}
                                  />
                                )}
                              </Form.Item>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    )
                  })}
                  {dropProvided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </Form.List>
    </div>
  )
}

export default Unscramble
