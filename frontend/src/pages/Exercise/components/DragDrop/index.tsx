import React, { useEffect, useState, useMemo } from 'react'
import {
  MatchPairSchema,
  QuestionPayload,
  SubmitAnswerResponse,
} from '../../../../services/exerciseApi/types'
import CustomImage from '../../../../components/common/CustomImage'
import { getFileUrl } from '../../../../utils/common'
import { Form } from 'antd'

interface MatchProps extends QuestionPayload {
  question: {
    text: string
    image?: string
    pairs: MatchPairSchema[][]
    audio?: string
    answers: {
      text: string
      image?: string
    }[][]
  }
  exerciseId?: string
  result?: MatchResponse
  setIsSubmittable: (value: boolean) => void
}

export interface MatchResponse extends SubmitAnswerResponse {
  answer: string[]
  correctAnswer: MatchPairSchema[][]
}

const DragDrop = (props: MatchProps) => {
  const questionTitle = props.question.text
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
      const newList1 = props.question.answers.map((item) => item[0]?.text || '')
      setList1(newList1)
      setList2(
        props.question.answers.map((item) => ({
          question: item[0].image || '',
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
    console.log(
      'list2',
      list2,
      list2.map((item) => ({
        image: item?.question,
        text: item?.answer,
      })),
    )
    console.log('Form Value:', form.getFieldsValue())
    form.setFieldValue(
      'answer',
      list2.map((item) => ({
        image: item?.question,
        text: item?.answer,
      })),
    )
  }, [list2, setIsSubmittable])

  const onDragStart = (event, sourceList, sourceIndex) => {
    event.dataTransfer.setData(
      'text/plain',
      JSON.stringify({ sourceList, sourceIndex }),
    )
  }

  const onDragOver = (event) => {
    event.preventDefault()
  }

  const onDrop = (event, targetList, targetIndex) => {
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
      <h1>{questionTitle}</h1>
      <Form.Item name="answer" noStyle>
        <div
          className="flex h-fit mx-auto rounded-xl justify-center items-center content-center mb-3"
          onDragOver={(event) => onDragOver(event)}
          onDrop={(event) => onDrop(event, 'list1', null)}
        >
          {shuffledList1.map((item, index) => (
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
            className="w-fit h-fit flex rounded-xl items-center content-center justify-center"
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
                  className="w-32 h-32"
                />
                <div>
                  <div
                    className="bg-white text-black h-8 w-36 mt-4 p-2 flex justify-center items-center rounded-lg border-solid border-2 border-sky-500"
                    draggable
                  >
                    {item.answer}
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
