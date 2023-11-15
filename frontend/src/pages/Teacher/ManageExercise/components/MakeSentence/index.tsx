import { Button, Divider, Form, Input, Select } from 'antd'
import { FormSubmit } from '../..'
import { CEFRLevel, ExerciseTag } from '../../../../../utils/constants'
import enumToSelectOptions from '../../../../../utils/enumsToSelectOptions'
import {
  ExerciseSchema,
  QuestionPayload,
} from '../../../../../services/exerciseApi/types'
import { addAnswersToQuestionTextOfMakeSentenceExercise } from '../../../../../utils/common'

interface QuestionFormProps {
  index: number
  remove: ((index: number) => void) | null
}

const QuestionForm = ({ index, remove }: QuestionFormProps) => {
  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <p className="text-xl font-bold my-2">Question {index + 1}</p>
        {remove && (
          <Button danger type="primary" onClick={() => remove(index)}>
            Remove
          </Button>
        )}
      </div>
      <Form.Item
        label="Question"
        name={[index, 'questionText']}
        rules={[{ required: true }]}
      >
        <Input.TextArea
          className="h-full"
          autoSize={{ minRows: 2, maxRows: 4 }}
          placeholder="Question"
        />
      </Form.Item>
      <Form.Item label="Explanation" name={[index, 'explanation']}>
        <Input.TextArea
          autoSize={{ minRows: 2, maxRows: 4 }}
          placeholder="Explanation (optional)"
        />
      </Form.Item>
      <div className="flex gap-4">
        <div className="flex-1 grid grid-cols-2 gap-4">
          <Form.Item
            label="Tags"
            name={[index, 'questionTags']}
            rules={[{ required: true }]}
          >
            <Select
              mode="multiple"
              allowClear
              placeholder="Tags"
              maxTagCount="responsive"
              options={enumToSelectOptions(ExerciseTag)}
            />
          </Form.Item>
          <Form.Item
            label="Level"
            name={[index, 'questionLevel']}
            rules={[{ required: true }]}
          >
            <Select
              placeholder="Level"
              options={enumToSelectOptions(CEFRLevel)}
            />
          </Form.Item>
        </div>
      </div>
    </>
  )
}

const Tutorial = () => {
  return (
    <p className="mb-5">
      Use <b>"[option 1|option 2|option 3]"</b> to represent a question. Use{' '}
      <b>"*"</b> to mark the correct option.
      <br />
      Example: <b>[Red|Blue|*Green]</b> is the <b>[*color|smell]</b> of the
      leaf.
    </p>
  )
}

interface QuestionFormSchema {
  questionText: string
  questionTags: ExerciseTag[]
  questionLevel: CEFRLevel
  explanation: string
  id?: string
}

interface MakeSentencePayload extends QuestionPayload {
  question: {
    text: string
    image?: string | null
    answers?: string[][]
  }
  correctAnswer: {
    explanation: string
  }
}

interface MakeSentenceResponse
  extends Omit<MakeSentencePayload, 'correctAnswer'> {
  correctAnswer: {
    explanation: string
    detail?: string
  }
}

const transformSubmitData = (exercise: any) => {
  const { content } = exercise

  exercise.content = content.map((question: QuestionFormSchema) => {
    const transformQuestion: MakeSentencePayload = {
      id: question.id,
      tags: question.questionTags,
      level: question.questionLevel,
      question: {
        text: question.questionText,
      },
      correctAnswer: {
        explanation: question.explanation,
      },
    }

    return transformQuestion
  })
}

function setInitialContent(this: FormSubmit, exercise: ExerciseSchema) {
  const { content } = exercise

  const transformedContent = content.map((q: MakeSentenceResponse) => {
    const {
      question: { answers },
      correctAnswer: { detail },
    } = q

    const answersString =
      answers?.map((answer, index) => {
        const a = answer.map((ans: string) =>
          detail?.[index]?.includes(ans) ? '*' + ans : ans,
        )
        return a.join('|') || ''
      }) || []

    const questionForm: QuestionFormSchema = {
      id: q.id,
      questionText: addAnswersToQuestionTextOfMakeSentenceExercise(
        answersString,
        q.question.text,
      ),
      questionTags: q.tags,
      questionLevel: q.level,
      explanation: q.correctAnswer?.explanation,
    }

    return questionForm
  })

  this.setFieldValue('content', transformedContent)
}

function MakeSentenceForm({ form }: { form: FormSubmit }) {
  form.transform = transformSubmitData
  form.setInitialContent = setInitialContent

  return (
    <>
      <Tutorial />
      <Form.List name="content" initialValue={[{}]}>
        {(fields, { add, remove }) => {
          form.addQuestion = add

          return fields.map(({ key, name }) => (
            <div key={key}>
              <QuestionForm
                index={name}
                remove={fields.length > 1 ? remove : null}
              />
              <Divider />
            </div>
          ))
        }}
      </Form.List>
    </>
  )
}

export default MakeSentenceForm
