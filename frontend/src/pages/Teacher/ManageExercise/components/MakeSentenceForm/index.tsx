import { Button, Divider, Form, Input, Select } from 'antd'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { FormSubmit } from '../..'
import { QuestionPayload } from '../../../../../services/exerciseApi/types'
import { addAnswersToQuestionTextOfMakeSentenceExercise } from '../../../../../utils/common'
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
      {t('Use')}{' '}
      <b>
        "[{t('option 1')}|{t('option 2')}|{t('option 3')}]"
      </b>{' '}
      {t('to represent a question. Use')} <b>"*"</b>{' '}
      {t('to mark the correct option.')}
      <br />
      {t('Example')}: <b>[Red|Blue|*Green]</b> is the <b>[*color|smell]</b> of
      the leaf.
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
      tags: getTagList(question.questionTags as any),
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

function setInitialContent(this: FormSubmit, exercise: any) {
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
      questionTags: transformToExerciseTagInputValue(q.tags),
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
