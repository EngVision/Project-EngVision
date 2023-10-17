import { Form, Input } from 'antd'
import {
  QuestionPayload,
  SubmitAnswerResponse,
} from '../../../../services/exerciseApi/types'

interface SubmitAnswer {
  answer: string
}

interface FillBlankProps extends QuestionPayload {
  question: { text: string; image?: string }
  exerciseId: string
  result?: FillBlankResponse
  submitAnswer: (data: SubmitAnswer, questionId: string) => Promise<void>
}

interface FillBlankResponse extends SubmitAnswerResponse {
  answer: string
  correctAnswer: string
}

interface FormProps {
  answerArr: [{ answer: string }]
}

function FillBlank({ question, result }: FillBlankProps) {
  const [form] = Form.useForm<FormProps>()
  const answer = Form.useWatch('answerArr', form)

  console.log(question)

  const questionArr = question.text.split('[]')

  const onFinish = (values: FormProps) => {
    console.log(values.answerArr.map((ans) => ans.answer).join(','))
  }

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.List
        name="answerArr"
        initialValue={Array(questionArr.length - 1).fill({})}
      >
        {(fields) => (
          <>
            {fields.map(({ key }) => {
              return (
                <>
                  <span>{questionArr[key]}</span>
                  <Form.Item noStyle name={[key, 'answer']}>
                    <Input
                      style={{
                        textAlign: 'center',
                        width: 15 + (answer?.[key]?.answer?.length || 0) * 8,
                        padding: '2px 5px',
                        margin: 2,
                      }}
                    />
                  </Form.Item>
                </>
              )
            })}
          </>
        )}
      </Form.List>
    </Form>
  )
}

export default FillBlank
