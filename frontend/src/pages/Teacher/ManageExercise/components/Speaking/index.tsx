import { Button, Checkbox, Divider, Form, Input, Select } from 'antd'
import { FormSubmit } from '../..'
import {
  CEFRLevel,
  ExerciseCardType,
  ExerciseTag,
  UPLOAD_FILE_URL,
} from '../../../../../utils/constants'
import enumToSelectOptions from '../../../../../utils/enumsToSelectOptions'
import {
  ExerciseSchema,
  QuestionPayload,
} from '../../../../../services/exerciseApi/types'
import NewQuestionForm from './NewQuestionForm'
import PreviewInput from '../../../../../components/common/PreviewInput'
import CustomImage from '../../../../../components/common/CustomImage'
import TextArea from 'antd/es/input/TextArea'
import ExerciseTagInput, {
  getTagList,
  transformToExerciseTagInputValue,
} from '../ExerciseTagInput'
import { useTranslation } from 'react-i18next'

interface QuestionFormProps {
  index: number
  needGrade: boolean
  remove: ((index: number) => void) | null
}

const QuestionForm = ({ index, needGrade, remove }: QuestionFormProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'ManageExercise' })

  const form = Form.useFormInstance()
  const content = Form.useWatch('content', form)
  const exerciseType = content?.[index]?.exerciseType || ExerciseCardType.Text
  const items = content?.[index]?.items || []

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

      <NewQuestionForm index={index} />
      <Form.Item name={[index, 'exerciseType']} noStyle></Form.Item>

      <Form.List name={[index, 'items']}>
        {(fields) =>
          fields.length > 0 && (
            <div className="flex gap-4 mb-4 flex-wrap border border-primary border-dashed p-3 rounded-lg select-none">
              {fields.map((field) => (
                <div className="border border-primary border-solid p-2 rounded-lg w-40 flex justify-center items-center">
                  <Form.Item name={[field.name]} noStyle>
                    {exerciseType === ExerciseCardType.Text ? (
                      <PreviewInput
                        placeholder={t('New card')}
                        className="w-full text-center"
                      />
                    ) : (
                      <CustomImage
                        className="hidden lg:block object-cover w-20 h-20 rounded-md"
                        src={`${UPLOAD_FILE_URL}${items[field.name]}`}
                      />
                    )}
                  </Form.Item>
                </div>
              ))}
            </div>
          )
        }
      </Form.List>
      <div className="flex items-center gap-8 w-full">
        <Form.Item
          label={t('Answer')}
          name={[index, 'answer']}
          className="flex-1"
          rules={[{ required: !needGrade }]}
        >
          <TextArea
            placeholder={t('Answer')}
            autoSize={{ minRows: 2, maxRows: 4 }}
            disabled={needGrade}
          />
        </Form.Item>
      </div>
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

interface QuestionFormSchema {
  text: string
  questionTags: ExerciseTag[]
  questionLevel: CEFRLevel
  explanation: string
  id?: string
  countdown: number
  answer: string
}

interface SpeakingPayload extends QuestionPayload {
  question: {
    text: string
    countdown: number
    audio?: string
    image?: string
  }
}

const transformSubmitData = (exercise: any) => {
  const { content, needGrade } = exercise

  exercise.content = content.map((question: QuestionFormSchema) => {
    const transformQuestion: SpeakingPayload = {
      id: question.id,
      tags: getTagList(question.questionTags as any),
      level: question.questionLevel,
      question: {
        text: question.text,
        countdown: question.countdown,
      },
      correctAnswer: {
        detail: needGrade ? null : question.answer,
        explanation: question.explanation,
      },
    }

    return transformQuestion
  })
}

function setInitialContent(this: FormSubmit, exercise: ExerciseSchema) {
  const { content } = exercise

  const transformedContent = content.map((q: SpeakingPayload) => {
    const {
      question: { text, countdown },
    } = q

    const questionForm: QuestionFormSchema = {
      id: q.id,
      questionTags: transformToExerciseTagInputValue(q.tags),
      questionLevel: q.level,
      explanation: q.correctAnswer?.explanation,
      text: text,
      countdown: countdown,
      answer: q.correctAnswer?.detail || null,
    }

    return questionForm
  })

  this.setFieldValue('content', transformedContent)
}

function SpeakingForm({ form }: { form: FormSubmit }) {
  const { t } = useTranslation('translation', { keyPrefix: 'ManageExercise' })
  const needGrade = Form.useWatch('needGrade', form)

  form.transform = transformSubmitData
  form.setInitialContent = setInitialContent

  return (
    <>
      <Form.Item name="needGrade" valuePropName="checked">
        <Checkbox>{t('Need grade')}</Checkbox>
      </Form.Item>
      <Form.List name="content" initialValue={[{}]}>
        {(fields, { add, remove }) => {
          form.addQuestion = add

          return fields.map(({ key, name }) => (
            <div key={key}>
              <QuestionForm
                index={name}
                needGrade={needGrade}
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

export default SpeakingForm
