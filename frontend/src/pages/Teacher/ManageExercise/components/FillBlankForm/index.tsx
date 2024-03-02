import { Button, Divider, Form, Input, Select } from 'antd'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { FormSubmit } from '../..'
import { QuestionPayload } from '../../../../../services/exerciseApi/types'
import { CEFRLevel, ExerciseTag } from '../../../../../utils/constants'
import enumToSelectOptions from '../../../../../utils/enumsToSelectOptions'
import ExerciseTagInput, {
  getTagList,
  transformToExerciseTagInputValue,
} from '../ExerciseTagInput'
import { useTranslation } from 'react-i18next'

interface QuestionFormProps {
  index: number
  remove: ((index: number) => void) | null
}

const QuestionForm = ({ index, remove }: QuestionFormProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'ManageExercise' })

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <p className="text-xl font-bold my-2">
          {t('Question')} {index + 1}
        </p>
        {remove && (
          <Button danger type="primary" onClick={() => remove(index)}>
            {t('Remove')}
          </Button>
        )}
      </div>
      <Form.Item
        label={t('Question')}
        name={[index, 'questionText']}
        rules={[{ required: true }]}
      >
        <ReactQuill className="bg-surface" placeholder={t('Question')} />
      </Form.Item>
      <Form.Item
        label={t('Answer')}
        name={[index, 'answer']}
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label={t('Explanation')} name={[index, 'explanation']}>
        <Input.TextArea
          autoSize={{ minRows: 2, maxRows: 4 }}
          placeholder={t('Explanation (optional)')}
        />
      </Form.Item>
      <div className="flex gap-4">
        <div className="flex-1 grid grid-cols-2 gap-4">
          <Form.Item
            label={t('Tags')}
            name={[index, 'questionTags']}
            rules={[{ required: true }]}
          >
            <ExerciseTagInput />
          </Form.Item>
          <Form.Item
            label={t('Level')}
            name={[index, 'questionLevel']}
            rules={[{ required: true }]}
          >
            <Select
              placeholder={t('Level')}
              options={enumToSelectOptions(CEFRLevel)}
            />
          </Form.Item>
        </div>
      </div>
    </>
  )
}

const Tutorial = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'ManageExercise' })

  return (
    <p className="mb-5">
      {t('You can use ')}"<b>[]</b>"
      {t(
        ' to help EngVision automatically create a blank placeholder for you. If it is not provided, it will be default blank after the question.',
      )}
      <br />
      {t('Example')}:
      <br />
      "Have you <b>[]</b> a girlfriend?". {t('Answer is')}: <b>had</b>
      <br />
      "BAN<b>[]</b>N<b>[]</b>". {t('Answer is')} <b>A,A</b>
    </p>
  )
}

interface QuestionFormSchema {
  questionText: string
  questionTags: ExerciseTag[]
  questionLevel: CEFRLevel
  explanation: string
  answer: string
  id?: string
}

interface FillBlankPayload extends QuestionPayload {
  question: {
    text: string
    image?: string | null
  }
  correctAnswer: {
    detail: string
    explanation: string
  }
}

interface FillBlankResponse extends Omit<FillBlankPayload, 'correctAnswer'> {
  correctAnswer: {
    detail: string[]
    explanation: string
  }
}

const transformSubmitData = (exercise: any) => {
  const { content } = exercise

  exercise.content = content.map((question: QuestionFormSchema) => {
    const transformQuestion: FillBlankPayload = {
      id: question.id,
      tags: getTagList(question.questionTags as any),
      level: question.questionLevel,
      question: {
        text: question.questionText,
      },
      correctAnswer: {
        detail: question.answer,
        explanation: question.explanation,
      },
    }

    return transformQuestion
  })
}

function setInitialContent(this: FormSubmit, exercise: any) {
  const { content } = exercise

  const transformedContent = content.map((q: FillBlankResponse) => {
    const questionForm: QuestionFormSchema = {
      id: q.id,
      questionText: q.question.text,
      questionTags: transformToExerciseTagInputValue(q.tags),
      questionLevel: q.level,
      explanation: q.correctAnswer?.explanation,
      answer: q.correctAnswer.detail.join(', '),
    }

    return questionForm
  })

  this.setFieldValue('content', transformedContent)
}

function FillBlankForm({ form }: { form: FormSubmit }) {
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

export default FillBlankForm
