import { Form } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import CustomImage from '../../../../components/common/CustomImage'
import { QuestionPayload } from '../../../../services/exerciseApi/types'
import { getFileUrl } from '../../../../utils/common'

interface DragDropProps extends QuestionPayload {
  question: {
    text: string
    image?: string
    audio?: string
    answers: {
      text: string
      image?: string
    }[]
  }
  result: any
  exerciseId?: string
  result?: any
  setIsSubmittable: (value: boolean) => void
}

const DragDrop = (props: DragDropProps) => {
  const questionTitle = props.question.text
  const result = props.result

  console.log(result)

  const [list1, setList1] = useState<string[]>([])
  const [list2, setList2] = useState([
    {
      question: '',
      answer: '',
    },
  ])

  const { setIsSubmittable } = props
  const form = Form.useFormInstance()

  useEffect(() => {
    if (props.question && props.question.answers) {
      const newList1 = props.question.answers.map((item) => item?.text || '')
      setList1(newList1)
      setList2(
        props.question.answers.map((item) => ({
          question: item.image || '',
          answer: '',
        })),
      )
    }
  }, [props.question.answers])

  useEffect(() => {
    const hasEnoughAnswers = list2.every((item) => item.answer !== '')

    if (hasEnoughAnswers) {
      setIsSubmittable(hasEnoughAnswers)
    }

    form.setFieldValue(
      'answer',
      list2.map((item) => ({
        image: item?.question,
        text: item?.answer,
      })),
    )
  }, [list2, setIsSubmittable])

  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    sourceList: string,
    sourceIndex: number,
  ) => {
    event.dataTransfer.setData(
      'text/plain',
      JSON.stringify({ sourceList, sourceIndex }),
    )
  }

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const onDrop = (
    event: React.DragEvent<HTMLDivElement>,
    targetList: string,
    targetIndex: number | null,
  ) => {
    if (targetIndex === null) {
      return
    }
    const data = JSON.parse(event.dataTransfer.getData('text/plain'))
    const { sourceList, sourceIndex } = data

    if (sourceList === 'list1') {
      const [draggedItem] = list1.splice(sourceIndex, 1)
      const newTargetItems = [...list2]

      if (!newTargetItems[targetIndex].answer) {
        newTargetItems[targetIndex].answer = draggedItem
      } else {
        list1.push(newTargetItems[targetIndex].answer)
        newTargetItems[targetIndex].answer = draggedItem
      }

      setList1([...list1])
      setList2(newTargetItems)
    } else if (sourceList === 'list2' && targetList === 'list2') {
      const temp = list2[sourceIndex].answer
      list2[sourceIndex].answer = list2[targetIndex].answer
      list2[targetIndex].answer = temp
      setList2([...list2])
    } else if (sourceList === 'list2' && targetList === 'list1') {
      const newTargetItems = [...list2]
      const newSourceItems = [...list1]

      if (newTargetItems[sourceIndex].answer) {
        newSourceItems.push(newTargetItems[sourceIndex].answer)
        newTargetItems[sourceIndex].answer = ''
        setList1(newSourceItems)
        setList2([...newTargetItems])
      }
    }
  }

  const shuffleArray = (array: any) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  const shuffledList1 = useMemo(() => shuffleArray(list1), [list1])

  return (
    <div className="rounded-xl p-4">
      <h2>{questionTitle}</h2>
      <Form.Item name="answer" noStyle>
        <div
          className="flex h-fit mx-auto rounded-xl justify-center items-center content-center mb-3 flex-wrap"
          onDragOver={(event) => onDragOver(event)}
          onDrop={(event) => onDrop(event, 'list1', null)}
        >
          {result
            ? ''
            : shuffledList1.map((item: any, index: any) => (
                <div
                  key={index}
                  className="bg-white text-black w-fit m-4 p-2 justify-center items-center rounded-lg border-solid border-2 border-sky-400"
                  draggable
                  onDragStart={(event) => onDragStart(event, 'list1', index)}
                >
                  {item}
                </div>
              ))}
        </div>

        <div className="flex flex-col items-center">
          <div
            className="w-fit h-fit flex rounded-xl items-center content-center justify-center flex-wrap"
            onDragOver={onDragOver}
          >
            {list2.map((item, index) => (
              <div
                key={index}
                className="m-2 p-2 w-fit h-fit justify-center items-center  flex flex-col rounded-xl"
                onDragOver={(event) => onDragOver(event)}
                onDrop={(event) => onDrop(event, 'list2', index)}
                onDragStart={(event) => onDragStart(event, 'list2', index)}
              >
                <CustomImage
                  src={getFileUrl(item.question)}
                  className="w-52 h-52"
                />
                <div>
                  <div
                    className={`bg-white text-black h-8 w-36 mt-4 p-2 flex justify-center items-center rounded-lg border-solid border-2 ${
                      result &&
                      result.correctAnswer.some(
                        (correct: { image: any }) =>
                          correct.image === result.answer[index].image,
                      )
                        ? result.answer[index].text !==
                          result.correctAnswer.find(
                            (correct: { image: any }) =>
                              correct.image === result.answer[index].image,
                          )?.text
                          ? 'border-red-500' // Apply red border for incorrect answers
                          : 'border-green-500' // Apply default border for correct answers or during the initial state
                        : ''
                    }`}
                    draggable
                  >
                    {result ? result.answer[index].text : item.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Form.Item>
    </div>
  )
}

export default DragDrop
